/**
 * @typedef {import('../types/system').AppPlatform} AppPlatform
 * @typedef {import('../types/system').AppService} AppService
 * @typedef {import('../types/system').FileSystem} FileSystem
 * @typedef {import('../types/system').BaseDir} BaseDir
 * @typedef {import('../types/settings').SystemSettings} SystemSettings
 * @typedef {import('../types/book').Book} Book
 * @typedef {import('../types/book').BookConfig} BookConfig
 * @typedef {import('../types/book').BookContent} BookContent
 * @typedef {import('../types/book').BookFormat} BookFormat
 * @typedef {import('../utils/transfer').ProgressHandler} ProgressHandler
 */

import {
  getDir,
  getLocalBookFilename,
  getRemoteBookFilename,
  getBaseFilename,
  getCoverFilename,
  getConfigFilename,
  getLibraryFilename,
  INIT_BOOK_CONFIG,
  formatTitle,
  formatAuthors,
  getFilename,
} from '../utils/book.js';
import { partialMD5 } from '../utils/md5.js';
import { DocumentLoader } from '../libs/document.js';
import {
  DEFAULT_BOOK_LAYOUT,
  DEFAULT_BOOK_STYLE,
  DEFAULT_BOOK_FONT,
  DEFAULT_VIEW_CONFIG,
  DEFAULT_READSETTINGS,
  SYSTEM_SETTINGS_VERSION,
  DEFAULT_BOOK_SEARCH_CONFIG,
  DEFAULT_TTS_CONFIG,
  CLOUD_BOOKS_SUBDIR,
  DEFAULT_MOBILE_VIEW_SETTINGS,
  DEFAULT_SYSTEM_SETTINGS,
  DEFAULT_CJK_VIEW_SETTINGS,
} from './constants.js';
import { getOSPlatform, isCJKEnv, isContentURI, isValidURL } from '../utils/misc.js';
import { deserializeConfig, serializeConfig } from '../utils/serializer.js';
import { downloadFile, uploadFile, deleteFile, createProgressHandler } from '../libs/storage.js';
import { TxtToEpubConverter } from '../utils/txt.js';
import { BOOK_FILE_NOT_FOUND_ERROR } from './errors.js';

/**
 * @abstract
 * @implements {AppService}
 */
export class BaseAppService {
  constructor() {
    this.osPlatform = getOSPlatform();
    this.localBooksDir = '';
  }

  /**
   * @abstract
   * @returns {Promise<SystemSettings>}
   */
  async loadSettings() {
    let settings;
    const { fp, base } = this.resolvePath('settings.json', 'Settings');

    try {
      await this.fs.exists(fp, base);
      const txt = await this.fs.readFile(fp, base, 'text');
      settings = JSON.parse(txt);
      const version = settings.version ?? 0;
      if (this.isAppDataSandbox || version < SYSTEM_SETTINGS_VERSION) {
        settings.localBooksDir = await this.getInitBooksDir();
        settings.version = SYSTEM_SETTINGS_VERSION;
      }
      settings = { ...DEFAULT_SYSTEM_SETTINGS, ...settings };
      settings.globalReadSettings = { ...DEFAULT_READSETTINGS, ...settings.globalReadSettings };
      settings.globalViewSettings = {
        ...DEFAULT_BOOK_LAYOUT,
        ...DEFAULT_BOOK_STYLE,
        ...DEFAULT_BOOK_FONT,
        ...(this.isMobile ? DEFAULT_MOBILE_VIEW_SETTINGS : {}),
        ...(isCJKEnv() ? DEFAULT_CJK_VIEW_SETTINGS : {}),
        ...DEFAULT_VIEW_CONFIG,
        ...DEFAULT_TTS_CONFIG,
        ...settings.globalViewSettings,
      };
    } catch {
      settings = {
        ...DEFAULT_SYSTEM_SETTINGS,
        version: SYSTEM_SETTINGS_VERSION,
        localBooksDir: await this.getInitBooksDir(),
        globalReadSettings: DEFAULT_READSETTINGS,
        globalViewSettings: {
          ...DEFAULT_BOOK_LAYOUT,
          ...DEFAULT_BOOK_STYLE,
          ...DEFAULT_BOOK_FONT,
          ...(this.isMobile ? DEFAULT_MOBILE_VIEW_SETTINGS : {}),
          ...(isCJKEnv() ? DEFAULT_CJK_VIEW_SETTINGS : {}),
          ...DEFAULT_VIEW_CONFIG,
          ...DEFAULT_TTS_CONFIG,
        },
      };

      await this.fs.createDir('', 'Books', true);
      await this.fs.createDir('', base, true);
      await this.fs.writeFile(fp, base, JSON.stringify(settings));
    }

    this.localBooksDir = settings.localBooksDir;
    const cacheDir = await this.getCacheDir();
    this.fs.getPrefix = (baseDir) => {
      if (baseDir === 'Books') {
        return this.localBooksDir;
      } else if (baseDir === 'Cache') {
        return cacheDir;
      }
      return null;
    };
    return settings;
  }

  /**
   * @param {SystemSettings} settings
   * @returns {Promise<void>}
   */
  async saveSettings(settings) {
    const { fp, base } = this.resolvePath('settings.json', 'Settings');
    await this.fs.createDir('', base, true);
    await this.fs.writeFile(fp, base, JSON.stringify(settings));
  }

  /**
   * @param {string | File} file
   * @param {Book[]} books
   * @param {boolean} [saveBook=true]
   * @param {boolean} [saveCover=true]
   * @param {boolean} [overwrite=false]
   * @param {boolean} [transient=false]
   * @returns {Promise<Book | null>}
   */
  async importBook(
    file,
    books,
    saveBook = true,
    saveCover = true,
    overwrite = false,
    transient = false,
  ) {
    try {
      let loadedBook;
      let format;
      let filename;
      let fileobj;

      if (transient && typeof file !== 'string') {
        throw new Error('Transient import is only supported for file paths');
      }

      try {
        if (typeof file === 'string') {
          filename = getFilename(file);
          fileobj = await this.fs.openFile(file, 'None');
        } else {
          filename = file.name;
          fileobj = file;
        }
        if (filename.endsWith('.txt')) {
          const txt2epub = new TxtToEpubConverter();
          ({ file: fileobj } = await txt2epub.convert({ file: fileobj }));
        }
        ({ book: loadedBook, format } = await new DocumentLoader(fileobj).open());
        if (!loadedBook.metadata.title) {
          loadedBook.metadata.title = getBaseFilename(filename);
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to open the book: ${error.message || error}`);
      }

      const hash = await partialMD5(fileobj);
      const existingBook = books.filter((b) => b.hash === hash)[0];
      if (existingBook) {
        if (!transient) {
          existingBook.deletedAt = null;
        }
        existingBook.updatedAt = Date.now();
      }

      const book = {
        hash,
        format,
        title: formatTitle(loadedBook.metadata.title),
        author: formatAuthors(loadedBook.metadata.author, loadedBook.metadata.language),
        createdAt: existingBook ? existingBook.createdAt : Date.now(),
        uploadedAt: existingBook ? existingBook.uploadedAt : null,
        deletedAt: transient ? Date.now() : null,
        downloadedAt: Date.now(),
        updatedAt: Date.now(),
      };
      // update book metadata when reimporting the same book
      if (existingBook) {
        existingBook.title = book.title;
        existingBook.author = book.author;
      }

      if (!(await this.fs.exists(getDir(book), 'Books'))) {
        await this.fs.createDir(getDir(book), 'Books');
      }
      if (
        saveBook &&
        !transient &&
        (!(await this.fs.exists(getLocalBookFilename(book), 'Books')) || overwrite)
      ) {
        if (typeof file === 'string' && isContentURI(file)) {
          await this.fs.copyFile(file, getLocalBookFilename(book), 'Books');
        } else if (filename.endsWith('.txt')) {
          await this.fs.writeFile(getLocalBookFilename(book), 'Books', fileobj);
        } else if (typeof file === 'string' && !isValidURL(file)) {
          await this.fs.copyFile(file, getLocalBookFilename(book), 'Books');
        } else {
          await this.fs.writeFile(getLocalBookFilename(book), 'Books', fileobj);
        }
      }
      if (saveCover && (!(await this.fs.exists(getCoverFilename(book), 'Books')) || overwrite)) {
        const cover = await loadedBook.getCover();
        if (cover) {
          await this.fs.writeFile(getCoverFilename(book), 'Books', await cover.arrayBuffer());
        }
      }
      // Never overwrite the config file only when it's not existed
      if (!existingBook) {
        await this.saveBookConfig(book, INIT_BOOK_CONFIG);
        books.splice(0, 0, book);
      }

      // update file links with url or path or content uri
      if (typeof file === 'string') {
        if (isValidURL(file)) {
          book.url = file;
          if (existingBook) existingBook.url = file;
        }
        if (transient) {
          book.filePath = file;
          if (existingBook) existingBook.filePath = file;
        }
      }
      book.coverImageUrl = await this.generateCoverImageUrl(book);
      const f = file;
      if (f && f.close) {
        await f.close();
      }

      return book;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {Book} book
   * @param {boolean} [includingUploaded=false]
   * @returns {Promise<void>}
   */
  async deleteBook(book, includingUploaded = false) {
    const fps = [getRemoteBookFilename(book), getCoverFilename(book)];
    const localDeleteFps = [getLocalBookFilename(book), getCoverFilename(book)];
    for (const fp of localDeleteFps) {
      if (await this.fs.exists(fp, 'Books')) {
        await this.fs.removeFile(fp, 'Books');
      }
    }
    for (const fp of fps) {
      if (includingUploaded) {
        console.log('Deleting uploaded file:', fp);
        const cfp = `${CLOUD_BOOKS_SUBDIR}/${fp}`;
        try {
          deleteFile(cfp);
        } catch (error) {
          console.log('Failed to delete uploaded file:', error);
        }
      }
    }
    book.deletedAt = Date.now();
    book.downloadedAt = null;
    if (includingUploaded) {
      book.uploadedAt = null;
    }
  }

  /**
   * @param {string} lfp
   * @param {string} cfp
   * @param {ProgressHandler} handleProgress
   * @param {string} hash
   * @returns {Promise<void>}
   */
  async uploadFileToCloud(lfp, cfp, handleProgress, hash) {
    console.log('Uploading file:', lfp, 'to', cfp);
    const file = await this.fs.openFile(lfp, 'Books', cfp);
    const localFullpath = `${this.localBooksDir}/${lfp}`;
    await uploadFile(file, localFullpath, handleProgress, hash);
    const f = file;
    if (f && f.close) {
      await f.close();
    }
  }

  /**
   * @param {Book} book
   * @param {ProgressHandler} [onProgress]
   * @returns {Promise<void>}
   */
  async uploadBook(book, onProgress) {
    let uploaded = false;
    const completedFiles = { count: 0 };
    let toUploadFpCount = 0;
    const coverExist = await this.fs.exists(getCoverFilename(book), 'Books');
    let bookFileExist = await this.fs.exists(getLocalBookFilename(book), 'Books');
    if (coverExist) {
      toUploadFpCount++;
    }
    if (bookFileExist) {
      toUploadFpCount++;
    }
    if (!bookFileExist && book.url) {
      // download the book from the URL
      const fileobj = await this.fs.openFile(book.url, 'None');
      await this.fs.writeFile(getLocalBookFilename(book), 'Books', await fileobj.arrayBuffer());
      bookFileExist = true;
    }

    const handleProgress = createProgressHandler(toUploadFpCount, completedFiles, onProgress);

    if (coverExist) {
      const lfp = getCoverFilename(book);
      const cfp = `${CLOUD_BOOKS_SUBDIR}/${getCoverFilename(book)}`;
      await this.uploadFileToCloud(lfp, cfp, handleProgress, book.hash);
      uploaded = true;
      completedFiles.count++;
    }

    if (bookFileExist) {
      const lfp = getLocalBookFilename(book);
      const cfp = `${CLOUD_BOOKS_SUBDIR}/${getRemoteBookFilename(book)}`;
      await this.uploadFileToCloud(lfp, cfp, handleProgress, book.hash);
      uploaded = true;
      completedFiles.count++;
    }

    if (uploaded) {
      book.deletedAt = null;
      book.updatedAt = Date.now();
      book.uploadedAt = Date.now();
      book.downloadedAt = Date.now();
    } else {
      throw new Error('Book file not uploaded');
    }
  }

  /**
   * @param {string} lfp
   * @param {string} cfp
   * @param {ProgressHandler} handleProgress
   * @returns {Promise<void>}
   */
  async downloadCloudFile(lfp, cfp, handleProgress) {
    console.log('Downloading file:', cfp, 'to', lfp);
    const localFullpath = `${this.localBooksDir}/${lfp}`;
    const result = await downloadFile(cfp, localFullpath, handleProgress);
    try {
      if (this.appPlatform === 'web') {
        const fileobj = result;
        await this.fs.writeFile(lfp, 'Books', await fileobj.arrayBuffer());
      }
    } catch {
      console.log('Failed to download file:', cfp);
      throw new Error('Failed to download file');
    }
  }

  /**
   * @param {Book} book
   * @param {boolean} [onlyCover=false]
   * @param {ProgressHandler} [onProgress]
   * @returns {Promise<void>}
   */
  async downloadBook(book, onlyCover = false, onProgress) {
    let bookDownloaded = false;
    const completedFiles = { count: 0 };
    let toDownloadFpCount = 0;
    const needDownCover = !(await this.fs.exists(getCoverFilename(book), 'Books'));
    const needDownBook = !onlyCover && !(await this.fs.exists(getLocalBookFilename(book), 'Books'));
    if (needDownCover) {
      toDownloadFpCount++;
    }
    if (needDownBook) {
      toDownloadFpCount++;
    }

    const handleProgress = createProgressHandler(toDownloadFpCount, completedFiles, onProgress);

    if (!(await this.fs.exists(getDir(book), 'Books'))) {
      await this.fs.createDir(getDir(book), 'Books');
    }

    if (needDownCover) {
      const lfp = getCoverFilename(book);
      const cfp = `${CLOUD_BOOKS_SUBDIR}/${lfp}`;
      await this.downloadCloudFile(lfp, cfp, handleProgress);
      completedFiles.count++;
    }

    if (needDownBook) {
      const lfp = getLocalBookFilename(book);
      const cfp = `${CLOUD_BOOKS_SUBDIR}/${getRemoteBookFilename(book)}`;
      await this.downloadCloudFile(lfp, cfp, handleProgress);
      const localFullpath = `${this.localBooksDir}/${lfp}`;
      bookDownloaded = await this.fs.exists(localFullpath, 'Books');
      completedFiles.count++;
    }
    // some books may not have cover image, so we need to check if the book is downloaded
    if (bookDownloaded || (!onlyCover && !needDownBook)) {
      book.downloadedAt = Date.now();
    }
  }

  /**
   * @param {Book} book
   * @param {SystemSettings} settings
   * @returns {Promise<BookContent>}
   */
  async loadBookContent(book, settings) {
    let file;
    const fp = getLocalBookFilename(book);
    if (await this.fs.exists(fp, 'Books')) {
      file = await this.fs.openFile(fp, 'Books');
    } else if (book.filePath) {
      file = await this.fs.openFile(book.filePath, 'None');
    } else if (book.url) {
      file = await this.fs.openFile(book.url, 'None');
    } else {
      throw new Error(BOOK_FILE_NOT_FOUND_ERROR);
    }
    return { book, file, config: await this.loadBookConfig(book, settings) };
  }

  /**
   * @param {Book} book
   * @param {SystemSettings} settings
   * @returns {Promise<BookConfig>}
   */
  async loadBookConfig(book, settings) {
    const { globalViewSettings } = settings;
    try {
      let str = '{}';
      if (await this.fs.exists(getConfigFilename(book), 'Books')) {
        str = await this.fs.readFile(getConfigFilename(book), 'Books', 'text');
      }
      return deserializeConfig(str, globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
    } catch {
      return deserializeConfig('{}', globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
    }
  }

  /**
   * @param {Book} book
   * @param {SystemSettings} settings
   * @returns {Promise<any>}
   */
  async fetchBookDetails(book, settings) {
    const fp = getLocalBookFilename(book);
    if (!(await this.fs.exists(fp, 'Books')) && book.uploadedAt) {
      await this.downloadBook(book);
    }
    const { file } = await this.loadBookContent(book, settings);
    const bookDoc = (await new DocumentLoader(file).open()).book;
    const f = file;
    if (f && f.close) {
      await f.close();
    }
    return bookDoc.metadata;
  }

  /**
   * @param {Book} book
   * @param {BookConfig} config
   * @param {SystemSettings} [settings]
   * @returns {Promise<void>}
   */
  async saveBookConfig(book, config, settings) {
    try {
      console.log(`📝 Saving book config for ${book.hash}`, { 
        hasBooknotes: config.booknotes?.length || 0,
        progressPosition: config.progress?.[0] || 0,
        location: config.location?.substring(0, 30) || 'none'
      });
      
      let serializedConfig;
      if (settings) {
        const { globalViewSettings } = settings;
        serializedConfig = serializeConfig(config, globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
      } else {
        serializedConfig = JSON.stringify(config);
      }
      
      const filename = getConfigFilename(book);
      console.log(`💾 Writing to ${filename} in Books directory`);
      
      await this.fs.writeFile(filename, 'Books', serializedConfig);
      console.log(`✅ Config successfully saved for ${book.hash}`);
      
      // Verify the file was written
      const exists = await this.fs.exists(filename, 'Books');
      console.log(`📊 Verification - File exists check: ${exists ? '✅' : '❌'}`);
    } catch (error) {
      console.error(`❌ Error saving book config:`, error);
      // We don't rethrow here, as we want the operation to continue
      // even if there's an error saving the config
    }
  }

  /**
   * @param {Book} book
   * @returns {Promise<string>}
   */
  async generateCoverImageUrl(book) {
    return this.appPlatform === 'web'
      ? await this.getCoverImageBlobUrl(book)
      : this.getCoverImageUrl(book);
  }

  /**
   * @returns {Promise<Book[]>}
   */
  async loadLibraryBooks() {
    console.log('Loading library books...');
    let books = [];
    const libraryFilename = getLibraryFilename();

    try {
      const txt = await this.fs.readFile(libraryFilename, 'Books', 'text');
      books = JSON.parse(txt);
    } catch {
      await this.fs.createDir('', 'Books', true);
      await this.fs.writeFile(libraryFilename, 'Books', '[]');
    }

    await Promise.all(
      books.map(async (book) => {
        book.coverImageUrl = await this.generateCoverImageUrl(book);
        book.updatedAt ??= book.lastUpdated || Date.now();
        return book;
      }),
    );

    return books;
  }

  /**
   * @param {Book[]} books
   * @returns {Promise<void>}
   */
  async saveLibraryBooks(books) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const libraryBooks = books.map(({ coverImageUrl, ...rest }) => rest);
    await this.fs.writeFile(getLibraryFilename(), 'Books', JSON.stringify(libraryBooks));
  }
} 