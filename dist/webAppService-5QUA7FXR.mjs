import {
  CLOUD_BOOKS_SUBDIR,
  DEFAULT_BOOK_FONT,
  DEFAULT_BOOK_LAYOUT,
  DEFAULT_BOOK_SEARCH_CONFIG,
  DEFAULT_BOOK_STYLE,
  DEFAULT_CJK_VIEW_SETTINGS,
  DEFAULT_MOBILE_VIEW_SETTINGS,
  DEFAULT_READSETTINGS,
  DEFAULT_SYSTEM_SETTINGS,
  DEFAULT_TTS_CONFIG,
  DEFAULT_VIEW_CONFIG,
  DocumentLoader,
  INIT_BOOK_CONFIG,
  LOCAL_BOOKS_SUBDIR,
  SYSTEM_SETTINGS_VERSION,
  deserializeConfig,
  formatAuthors,
  formatTitle,
  getBaseFilename,
  getConfigFilename,
  getCoverFilename,
  getDir,
  getFilename,
  getLibraryFilename,
  getLocalBookFilename,
  getOSPlatform,
  getRemoteBookFilename,
  isCJKEnv,
  isContentURI,
  isPWA,
  isValidURL,
  partialMD5,
  serializeConfig
} from "./chunk-ZVRKOA2O.mjs";

// src/utils/file.ts
var DeferredBlob = class _DeferredBlob extends Blob {
  promise;
  constructor(promise, options) {
    super([], options);
    this.promise = promise;
  }
  async arrayBuffer() {
    return this.promise;
  }
  slice(start, end, contentType) {
    const slicePromise = this.promise.then((buffer) => {
      const slicedBuffer = buffer.slice(start || 0, end || buffer.byteLength);
      return slicedBuffer;
    });
    return new _DeferredBlob(slicePromise, { type: contentType || this.type });
  }
};
var NativeFile = class {
  path;
  offset = 0;
  cachedData = /* @__PURE__ */ new Map();
  static MAX_CACHE_SIZE = 10;
  static CHUNK_SIZE = 1024 * 1024;
  // 1MB
  constructor(path) {
    this.path = path;
  }
  async open() {
    console.warn("NativeFile.open is not fully supported in web environment");
    return Promise.resolve();
  }
  async close() {
    console.warn("NativeFile.close is not fully supported in web environment");
    this.cachedData.clear();
    return Promise.resolve();
  }
  async seek(offset) {
    this.offset = offset;
    return Promise.resolve();
  }
  /**
   * Read data from the file
   * In web environment, this is a stub implementation
   * Real files would need to be loaded via file input or drag-and-drop
   */
  async read(len) {
    console.warn("NativeFile.read is not supported in web environment");
    return new ArrayBuffer(0);
  }
  /**
   * Returns a blob that can be used to read a segment of the file
   * In web environment, this returns an empty blob
   */
  slice(offset, len) {
    console.warn("NativeFile.slice is not fully supported in web environment");
    const promise = Promise.resolve(new ArrayBuffer(0));
    return new DeferredBlob(promise);
  }
  /**
   * Returns a blob for the entire file
   * In web environment, this returns an empty blob
   */
  toBlob() {
    console.warn("NativeFile.toBlob is not fully supported in web environment");
    const promise = Promise.resolve(new ArrayBuffer(0));
    return new DeferredBlob(promise);
  }
};
var RemoteFile = class _RemoteFile extends File {
  url;
  #name;
  #lastModified;
  #size = -1;
  #type = "";
  #cache = /* @__PURE__ */ new Map();
  // LRU cache
  #order = [];
  static MAX_CACHE_CHUNK_SIZE = 1024 * 128;
  static MAX_CACHE_ITEMS_SIZE = 10;
  constructor(url, name, type = "", lastModified = Date.now()) {
    const basename = url.split("/").pop() || "remote-file";
    super([], name || basename, { type, lastModified });
    this.url = url;
    this.#name = name || basename;
    this.#type = type;
    this.#lastModified = lastModified;
  }
  get name() {
    return this.#name;
  }
  get type() {
    return this.#type;
  }
  get size() {
    return this.#size;
  }
  get lastModified() {
    return this.#lastModified;
  }
  async _open_with_head() {
    const response = await fetch(this.url, { method: "HEAD" });
    if (!response.ok) {
      throw new Error(`Failed to fetch file size: ${response.status}`);
    }
    this.#size = Number(response.headers.get("content-length"));
    this.#type = response.headers.get("content-type") || "";
  }
  async _open_with_range() {
    const response = await fetch(this.url, { headers: { Range: `bytes=${0}-${1023}` } });
    if (!response.ok) {
      throw new Error(`Failed to fetch file size: ${response.status}`);
    }
    this.#size = Number(response.headers.get("content-range")?.split("/")[1]);
    this.#type = response.headers.get("content-type") || "";
  }
  async open() {
    if (getOSPlatform() === "android") {
      await this._open_with_range();
    } else {
      await this._open_with_head();
    }
    return Promise.resolve();
  }
  async close() {
    this.#cache.clear();
    this.#order = [];
  }
  async fetchRangePart(start, end) {
    start = Math.max(0, start);
    end = Math.min(this.size - 1, end);
    const response = await fetch(this.url, { headers: { Range: `bytes=${start}-${end}` } });
    if (!response.ok) {
      throw new Error(`Failed to fetch range: ${response.status}`);
    }
    return response.arrayBuffer();
  }
  // inclusive reading of the end: [start, end]
  async fetchRange(start, end) {
    const rangeSize = end - start + 1;
    const MAX_RANGE_LEN = 1024 * 1e3;
    if (rangeSize > MAX_RANGE_LEN) {
      const buffers = [];
      for (let currentStart = start; currentStart <= end; currentStart += MAX_RANGE_LEN) {
        const currentEnd = Math.min(currentStart + MAX_RANGE_LEN - 1, end);
        buffers.push(await this.fetchRangePart(currentStart, currentEnd));
      }
      const totalSize = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
      const combinedBuffer = new Uint8Array(totalSize);
      let offset = 0;
      for (const buffer of buffers) {
        combinedBuffer.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
      }
      return combinedBuffer.buffer;
    } else if (rangeSize > _RemoteFile.MAX_CACHE_CHUNK_SIZE) {
      return this.fetchRangePart(start, end);
    } else {
      let cachedChunkStart = Array.from(this.#cache.keys()).find((chunkStart) => {
        const buffer2 = this.#cache.get(chunkStart);
        const bufferSize = buffer2.byteLength;
        return start >= chunkStart && end <= chunkStart + bufferSize;
      });
      if (cachedChunkStart !== void 0) {
        this.#updateAccessOrder(cachedChunkStart);
        const buffer2 = this.#cache.get(cachedChunkStart);
        const offset2 = start - cachedChunkStart;
        return buffer2.slice(offset2, offset2 + rangeSize);
      }
      cachedChunkStart = await this.#fetchAndCacheChunk(start, end);
      const buffer = this.#cache.get(cachedChunkStart);
      const offset = start - cachedChunkStart;
      return buffer.slice(offset, offset + rangeSize);
    }
  }
  async #fetchAndCacheChunk(start, end) {
    const chunkStart = Math.max(0, start - 1024);
    const chunkEnd = Math.max(end, start + _RemoteFile.MAX_CACHE_CHUNK_SIZE - 1024 - 1);
    this.#cache.set(chunkStart, await this.fetchRangePart(chunkStart, chunkEnd));
    this.#updateAccessOrder(chunkStart);
    this.#ensureCacheSize();
    return chunkStart;
  }
  #updateAccessOrder(chunkStart) {
    const index = this.#order.indexOf(chunkStart);
    if (index > -1) {
      this.#order.splice(index, 1);
    }
    this.#order.unshift(chunkStart);
  }
  #ensureCacheSize() {
    while (this.#cache.size > _RemoteFile.MAX_CACHE_ITEMS_SIZE) {
      const oldestKey = this.#order.pop();
      if (oldestKey !== void 0) {
        this.#cache.delete(oldestKey);
      }
    }
  }
  slice(start = 0, end = this.size, contentType = this.type) {
    const dataPromise = this.fetchRange(start, end - 1);
    return new DeferredBlob(dataPromise, { type: contentType });
  }
  async text() {
    const blob = this.slice(0, this.size);
    return blob.text();
  }
  async arrayBuffer() {
    const blob = this.slice(0, this.size);
    return blob.arrayBuffer();
  }
};

// src/libs/storage.ts
var createProgressHandler = (totalFiles, completedFilesRef, onProgress) => {
  return (progress) => {
    const fileProgress = progress.progress / progress.total;
    const overallProgress = (completedFilesRef.count + fileProgress) / totalFiles * 100;
    if (onProgress) {
      onProgress({
        progress: overallProgress,
        total: 100,
        transferSpeed: progress.transferSpeed
      });
    }
  };
};
var uploadFile = async (file, fileFullPath, onProgress, bookHash) => {
  console.log("File upload skipped in web mode:", file.name);
  if (onProgress) {
    onProgress({ progress: 100, total: 100, transferSpeed: 0 });
  }
  return;
};
var downloadFile = async (filePath, fileFullPath, onProgress) => {
  console.log("File download skipped in web mode:", filePath);
  if (onProgress) {
    onProgress({ progress: 100, total: 100, transferSpeed: 0 });
  }
  throw new Error("File download skipped in web mode");
};
var deleteFile = async (filePath) => {
  console.log("File deletion skipped in web mode:", filePath);
  return;
};

// src/utils/txt.ts
var zipWriteOptions = {
  lastAccessDate: /* @__PURE__ */ new Date(0),
  lastModDate: /* @__PURE__ */ new Date(0)
};
var TxtToEpubConverter = class {
  async convert(options) {
    const { file: txtFile, author: providedAuthor, language: providedLanguage } = options;
    const fileContent = await txtFile.arrayBuffer();
    const detectedEncoding = this.detectEncoding(fileContent) || "utf-8";
    const decoder = new TextDecoder(detectedEncoding);
    const txtContent = decoder.decode(fileContent).trim();
    const bookTitle = this.extractBookTitle(getBaseFilename(txtFile.name));
    const fileName = `${bookTitle}.epub`;
    const fileHeader = txtContent.slice(0, 1024);
    const authorMatch = fileHeader.match(/[【\[]?作者[】\]]?[:：\s]\s*(.+)\r?\n/) || fileHeader.match(/[【\[]?\s*(.+)\s+著\s*[】\]]?\r?\n/);
    const author = authorMatch ? authorMatch[1].trim() : providedAuthor || "";
    const language = providedLanguage || this.detectLanguage(fileHeader);
    const identifier = await partialMD5(txtFile);
    const metadata = { bookTitle, author, language, identifier };
    let chapters = [];
    for (let i = 4; i >= 3; i--) {
      chapters = this.extractChapters(txtContent, metadata, {
        linesBetweenSegments: i
      });
      if (chapters.length === 0) {
        throw new Error("No chapters detected.");
      } else if (chapters.length > 1) {
        break;
      }
    }
    const blob = await this.createEpub(chapters, metadata);
    return {
      file: new File([blob], fileName),
      bookTitle,
      chapterCount: chapters.length,
      language
    };
  }
  extractChapters(txtContent, metadata, option) {
    const { language } = metadata;
    const { linesBetweenSegments } = option;
    const segmentRegex = new RegExp(`(?:\\r?\\n){${linesBetweenSegments},}|-{4,}\r?
`);
    let chapterRegex;
    if (language === "zh") {
      chapterRegex = /(?:^|\n|\s|《[^》]+》)(第?[一二三四五六七八九十百千万0-9]+[章卷节回讲篇](?:[：:、 　\(\)0-9]+[^\n-]*)?(?!\S)|(?:^|\n|\s|《[^》]+》)[一二三四五六七八九十百千万]+(?:[：:、 　][^\n-]+)(?!\S)|(?:楔子|前言|引言|序言|序章|总论|概论)(?:[：: 　][^\n-]*)?(?!\S))/g;
    } else {
      chapterRegex = /(?:^|\n|\s)(Chapter [0-9]+(?:[: ][^\n]*)?(?!\S)|Part [0-9]+(?:[: ][^\n]*)?(?!\S)|Prologue(?:[: ][^\n]*)?(?!\S)|Introduction(?:[: ][^\n]*)?(?!\S))/g;
    }
    const formatSegment = (segment) => {
      return segment.replace(/-{4,}|_{4,}/g, "\n").split(/\n+/).map((line) => line.trim()).filter((line) => line).join("</p><p>");
    };
    const chapters = [];
    const segments = txtContent.split(segmentRegex);
    for (const segment of segments) {
      const trimmedSegment = segment.replace(/<!--.*?-->/g, "").trim();
      if (!trimmedSegment) continue;
      const segmentChapters = [];
      const matches = trimmedSegment.split(chapterRegex);
      for (let j = 1; j < matches.length; j += 2) {
        const title = matches[j]?.trim() || "";
        const content = matches[j + 1]?.trim() || "";
        let isVolume = false;
        if (language === "zh") {
          isVolume = /第[一二三四五六七八九十百千万0-9]+卷/.test(title);
        } else {
          isVolume = /\b(Part|Volume|Book)\b/i.test(title);
        }
        const headTitle = isVolume ? `<h1>${title}</h1>` : `<h2>${title}</h2>`;
        const formattedSegment = formatSegment(content);
        segmentChapters.push({
          title,
          content: `${headTitle}<p>${formattedSegment}</p>`
        });
      }
      if (matches[0] && matches[0].trim()) {
        const initialContent = matches[0].trim();
        const firstLine = initialContent.split("\n")[0].trim();
        const segmentTitle = (firstLine.length > 16 ? initialContent.split(/[\n\s\p{P}]/u)[0].trim() : firstLine) || initialContent.slice(0, 16);
        const formattedSegment = formatSegment(initialContent);
        segmentChapters.unshift({
          title: segmentTitle,
          content: `<h3></h3><p>${formattedSegment}</p>`
        });
      }
      chapters.push(...segmentChapters);
    }
    return chapters;
  }
  async createEpub(chapters, metadata) {
    const { BlobWriter, TextReader, ZipWriter } = await import("@zip.js/zip.js");
    const { bookTitle, author, language, identifier } = metadata;
    const zipWriter = new ZipWriter(new BlobWriter("application/epub+zip"), {
      extendedTimestamp: false
    });
    await zipWriter.add("mimetype", new TextReader("application/epub+zip"), zipWriteOptions);
    const containerXml = `<?xml version="1.0" encoding="UTF-8"?>
    <container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
      <rootfiles>
        <rootfile full-path="content.opf" media-type="application/oebps-package+xml"/>
      </rootfiles>
    </container>`.trim();
    await zipWriter.add("META-INF/container.xml", new TextReader(containerXml), zipWriteOptions);
    const navPoints = chapters.map((chapter, index) => {
      const id = `chapter${index + 1}`;
      const playOrder = index + 1;
      return `
        <navPoint id="navPoint-${id}" playOrder="${playOrder}">
          <navLabel>
            <text>${chapter.title}</text>
          </navLabel>
          <content src="./OEBPS/${id}.xhtml" />
        </navPoint>
      `.trim();
    }).join("\n");
    const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
    <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
      <head>
        <meta name="dtb:uid" content="book-id" />
        <meta name="dtb:depth" content="1" />
        <meta name="dtb:totalPageCount" content="0" />
        <meta name="dtb:maxPageNumber" content="0" />
      </head>
      <docTitle>
        <text>${bookTitle}</text>
      </docTitle>
      <docAuthor>
        <text>${author}</text>
      </docAuthor>
      <navMap>
        ${navPoints}
      </navMap>
    </ncx>`.trim();
    await zipWriter.add("toc.ncx", new TextReader(tocNcx), zipWriteOptions);
    const manifest = chapters.map(
      (_, index) => `
      <item id="chap${index + 1}" href="OEBPS/chapter${index + 1}.xhtml" media-type="application/xhtml+xml"/>
    `
    ).join("\n").trim();
    const spine = chapters.map(
      (_, index) => `
      <itemref idref="chap${index + 1}"/>`
    ).join("\n").trim();
    const css = `
      body { line-height: 1.6; font-size: 1em; font-family: 'Arial', sans-serif; text-align: justify; }
      p { text-indent: 2em; margin: 0; }
    `;
    await zipWriter.add("style.css", new TextReader(css), zipWriteOptions);
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const chapterContent = `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="zh">
          <head>
            <title>${chapter.title}</title>
            <link rel="stylesheet" type="text/css" href="../style.css"/>
          </head>
          <body>${chapter.content}</body>
        </html>`.trim();
      await zipWriter.add(
        `OEBPS/chapter${i + 1}.xhtml`,
        new TextReader(chapterContent),
        zipWriteOptions
      );
    }
    const tocManifest = `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>`;
    const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
      <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="book-id" version="2.0">
        <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
          <dc:title>${bookTitle}</dc:title>
          <dc:language>${language}</dc:language>
          <dc:creator>${author}</dc:creator>
          <dc:identifier id="book-id">${identifier}</dc:identifier>
        </metadata>
        <manifest>
          ${manifest}
          ${tocManifest}
        </manifest>
        <spine toc="ncx">
          ${spine}
        </spine>
      </package>`.trim();
    await zipWriter.add("content.opf", new TextReader(contentOpf), zipWriteOptions);
    return await zipWriter.close();
  }
  detectEncoding(buffer) {
    try {
      new TextDecoder("utf-8", { fatal: true }).decode(buffer);
      return "utf-8";
    } catch {
    }
    const headerBytes = new Uint8Array(buffer.slice(0, 4));
    if (headerBytes[0] === 255 && headerBytes[1] === 254) {
      return "utf-16le";
    }
    if (headerBytes[0] === 254 && headerBytes[1] === 255) {
      return "utf-16be";
    }
    if (headerBytes[0] === 239 && headerBytes[1] === 187 && headerBytes[2] === 191) {
      return "utf-8";
    }
    const sample = new Uint8Array(buffer.slice(0, Math.min(1024, buffer.byteLength)));
    let highByteCount = 0;
    for (let i = 0; i < sample.length; i++) {
      if (sample[i] >= 128) {
        highByteCount++;
      }
    }
    const highByteRatio = highByteCount / sample.length;
    if (highByteRatio > 0.3) {
      return "gbk";
    }
    if (highByteRatio > 0.1) {
      let sjisPattern = false;
      for (let i = 0; i < sample.length - 1; i++) {
        const b1 = sample[i];
        const b2 = sample[i + 1];
        if ((b1 >= 129 && b1 <= 159 || b1 >= 224 && b1 <= 252) && (b2 >= 64 && b2 <= 126 || b2 >= 128 && b2 <= 252)) {
          sjisPattern = true;
          break;
        }
      }
      if (sjisPattern) {
        return "shift-jis";
      }
      return "gb18030";
    }
    return "utf-8";
  }
  detectLanguage(fileHeader) {
    const sample = fileHeader;
    let chineseCount = 0;
    for (let i = 0; i < sample.length; i++) {
      const code = sample.charCodeAt(i);
      if (code >= 19968 && code <= 40959 || code >= 13312 && code <= 19903 || code >= 131072 && code <= 173791) {
        chineseCount++;
      }
    }
    if (chineseCount / sample.length > 0.05) {
      return "zh";
    }
    return "en";
  }
  extractBookTitle(filename) {
    const match = filename.match(/《([^》]+)》/);
    return match ? match[1] : filename.split(".")[0];
  }
};

// src/services/errors.ts
var BOOK_FILE_NOT_FOUND_ERROR = "Book file not found";

// src/services/appService.ts
var BaseAppService = class {
  osPlatform = getOSPlatform();
  localBooksDir = "";
  async loadSettings() {
    let settings;
    const { fp, base } = this.resolvePath("settings.json", "Settings");
    try {
      await this.fs.exists(fp, base);
      const txt = await this.fs.readFile(fp, base, "text");
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
        ...this.isMobile ? DEFAULT_MOBILE_VIEW_SETTINGS : {},
        ...isCJKEnv() ? DEFAULT_CJK_VIEW_SETTINGS : {},
        ...DEFAULT_VIEW_CONFIG,
        ...DEFAULT_TTS_CONFIG,
        ...settings.globalViewSettings
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
          ...this.isMobile ? DEFAULT_MOBILE_VIEW_SETTINGS : {},
          ...isCJKEnv() ? DEFAULT_CJK_VIEW_SETTINGS : {},
          ...DEFAULT_VIEW_CONFIG,
          ...DEFAULT_TTS_CONFIG
        }
      };
      await this.fs.createDir("", "Books", true);
      await this.fs.createDir("", base, true);
      await this.fs.writeFile(fp, base, JSON.stringify(settings));
    }
    this.localBooksDir = settings.localBooksDir;
    const cacheDir = await this.getCacheDir();
    this.fs.getPrefix = (baseDir) => {
      if (baseDir === "Books") {
        return this.localBooksDir;
      } else if (baseDir === "Cache") {
        return cacheDir;
      }
      return null;
    };
    return settings;
  }
  async saveSettings(settings) {
    const { fp, base } = this.resolvePath("settings.json", "Settings");
    await this.fs.createDir("", base, true);
    await this.fs.writeFile(fp, base, JSON.stringify(settings));
  }
  async importBook(file, books, saveBook = true, saveCover = true, overwrite = false, transient = false) {
    try {
      let loadedBook;
      let format;
      let filename;
      let fileobj;
      if (transient && typeof file !== "string") {
        throw new Error("Transient import is only supported for file paths");
      }
      try {
        if (typeof file === "string") {
          filename = getFilename(file);
          fileobj = await this.fs.openFile(file, "None");
        } else {
          filename = file.name;
          fileobj = file;
        }
        if (filename.endsWith(".txt")) {
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
        updatedAt: Date.now()
      };
      if (existingBook) {
        existingBook.title = book.title;
        existingBook.author = book.author;
      }
      if (!await this.fs.exists(getDir(book), "Books")) {
        await this.fs.createDir(getDir(book), "Books");
      }
      if (saveBook && !transient && (!await this.fs.exists(getLocalBookFilename(book), "Books") || overwrite)) {
        if (typeof file === "string" && isContentURI(file)) {
          await this.fs.copyFile(file, getLocalBookFilename(book), "Books");
        } else if (filename.endsWith(".txt")) {
          await this.fs.writeFile(getLocalBookFilename(book), "Books", fileobj);
        } else if (typeof file === "string" && !isValidURL(file)) {
          await this.fs.copyFile(file, getLocalBookFilename(book), "Books");
        } else {
          await this.fs.writeFile(getLocalBookFilename(book), "Books", fileobj);
        }
      }
      if (saveCover && (!await this.fs.exists(getCoverFilename(book), "Books") || overwrite)) {
        const cover = await loadedBook.getCover();
        if (cover) {
          await this.fs.writeFile(getCoverFilename(book), "Books", await cover.arrayBuffer());
        }
      }
      if (!existingBook) {
        await this.saveBookConfig(book, INIT_BOOK_CONFIG);
        books.splice(0, 0, book);
      }
      if (typeof file === "string") {
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
  async deleteBook(book, includingUploaded = false) {
    const fps = [getRemoteBookFilename(book), getCoverFilename(book)];
    const localDeleteFps = [getLocalBookFilename(book), getCoverFilename(book)];
    for (const fp of localDeleteFps) {
      if (await this.fs.exists(fp, "Books")) {
        await this.fs.removeFile(fp, "Books");
      }
    }
    for (const fp of fps) {
      if (includingUploaded) {
        console.log("Deleting uploaded file:", fp);
        const cfp = `${CLOUD_BOOKS_SUBDIR}/${fp}`;
        try {
          deleteFile(cfp);
        } catch (error) {
          console.log("Failed to delete uploaded file:", error);
        }
      }
    }
    book.deletedAt = Date.now();
    book.downloadedAt = null;
    if (includingUploaded) {
      book.uploadedAt = null;
    }
  }
  async uploadFileToCloud(lfp, cfp, handleProgress, hash) {
    console.log("Uploading file:", lfp, "to", cfp);
    const file = await this.fs.openFile(lfp, "Books", cfp);
    const localFullpath = `${this.localBooksDir}/${lfp}`;
    await uploadFile(file, localFullpath, handleProgress, hash);
    const f = file;
    if (f && f.close) {
      await f.close();
    }
  }
  async uploadBook(book, onProgress) {
    let uploaded = false;
    const completedFiles = { count: 0 };
    let toUploadFpCount = 0;
    const coverExist = await this.fs.exists(getCoverFilename(book), "Books");
    let bookFileExist = await this.fs.exists(getLocalBookFilename(book), "Books");
    if (coverExist) {
      toUploadFpCount++;
    }
    if (bookFileExist) {
      toUploadFpCount++;
    }
    if (!bookFileExist && book.url) {
      const fileobj = await this.fs.openFile(book.url, "None");
      await this.fs.writeFile(getLocalBookFilename(book), "Books", await fileobj.arrayBuffer());
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
      throw new Error("Book file not uploaded");
    }
  }
  async downloadCloudFile(lfp, cfp, handleProgress) {
    console.log("Downloading file:", cfp, "to", lfp);
    const localFullpath = `${this.localBooksDir}/${lfp}`;
    const result = await downloadFile(cfp, localFullpath, handleProgress);
    try {
      if (this.appPlatform === "web") {
        const fileobj = result;
        await this.fs.writeFile(lfp, "Books", await fileobj.arrayBuffer());
      }
    } catch {
      console.log("Failed to download file:", cfp);
      throw new Error("Failed to download file");
    }
  }
  async downloadBook(book, onlyCover = false, onProgress) {
    let bookDownloaded = false;
    const completedFiles = { count: 0 };
    let toDownloadFpCount = 0;
    const needDownCover = !await this.fs.exists(getCoverFilename(book), "Books");
    const needDownBook = !onlyCover && !await this.fs.exists(getLocalBookFilename(book), "Books");
    if (needDownCover) {
      toDownloadFpCount++;
    }
    if (needDownBook) {
      toDownloadFpCount++;
    }
    const handleProgress = createProgressHandler(toDownloadFpCount, completedFiles, onProgress);
    if (!await this.fs.exists(getDir(book), "Books")) {
      await this.fs.createDir(getDir(book), "Books");
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
      bookDownloaded = await this.fs.exists(localFullpath, "Books");
      completedFiles.count++;
    }
    if (bookDownloaded || !onlyCover && !needDownBook) {
      book.downloadedAt = Date.now();
    }
  }
  async loadBookContent(book, settings) {
    let file;
    const fp = getLocalBookFilename(book);
    if (await this.fs.exists(fp, "Books")) {
      file = await this.fs.openFile(fp, "Books");
    } else if (book.filePath) {
      file = await this.fs.openFile(book.filePath, "None");
    } else if (book.url) {
      file = await this.fs.openFile(book.url, "None");
    } else {
      throw new Error(BOOK_FILE_NOT_FOUND_ERROR);
    }
    return { book, file, config: await this.loadBookConfig(book, settings) };
  }
  async loadBookConfig(book, settings) {
    const { globalViewSettings } = settings;
    try {
      let str = "{}";
      if (await this.fs.exists(getConfigFilename(book), "Books")) {
        str = await this.fs.readFile(getConfigFilename(book), "Books", "text");
      }
      return deserializeConfig(str, globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
    } catch {
      return deserializeConfig("{}", globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
    }
  }
  async fetchBookDetails(book, settings) {
    const fp = getLocalBookFilename(book);
    if (!await this.fs.exists(fp, "Books") && book.uploadedAt) {
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
  async saveBookConfig(book, config, settings) {
    try {
      console.log(`\u{1F4DD} Saving book config for ${book.hash}`, {
        hasBooknotes: config.booknotes?.length || 0,
        progressPosition: config.progress?.[0] || 0,
        location: config.location?.substring(0, 30) || "none"
      });
      let serializedConfig;
      if (settings) {
        const { globalViewSettings } = settings;
        serializedConfig = serializeConfig(config, globalViewSettings, DEFAULT_BOOK_SEARCH_CONFIG);
      } else {
        serializedConfig = JSON.stringify(config);
      }
      const filename = getConfigFilename(book);
      console.log(`\u{1F4BE} Writing to ${filename} in Books directory`);
      await this.fs.writeFile(filename, "Books", serializedConfig);
      console.log(`\u2705 Config successfully saved for ${book.hash}`);
      const exists = await this.fs.exists(filename, "Books");
      console.log(`\u{1F4CA} Verification - File exists check: ${exists ? "\u2705" : "\u274C"}`);
    } catch (error) {
      console.error(`\u274C Error saving book config:`, error);
    }
  }
  async generateCoverImageUrl(book) {
    return this.appPlatform === "web" ? await this.getCoverImageBlobUrl(book) : this.getCoverImageUrl(book);
  }
  async loadLibraryBooks() {
    console.log("Loading library books...");
    let books = [];
    const libraryFilename = getLibraryFilename();
    try {
      const txt = await this.fs.readFile(libraryFilename, "Books", "text");
      books = JSON.parse(txt);
    } catch {
      await this.fs.createDir("", "Books", true);
      await this.fs.writeFile(libraryFilename, "Books", "[]");
    }
    await Promise.all(
      books.map(async (book) => {
        book.coverImageUrl = await this.generateCoverImageUrl(book);
        book.updatedAt ??= book.lastUpdated || Date.now();
        return book;
      })
    );
    return books;
  }
  async saveLibraryBooks(books) {
    const libraryBooks = books.map(({ coverImageUrl, ...rest }) => rest);
    await this.fs.writeFile(getLibraryFilename(), "Books", JSON.stringify(libraryBooks));
  }
};

// src/utils/webFileSystem.ts
var openFileDialog = async (options) => {
  try {
    if ("showOpenFilePicker" in window) {
      const pickerOpts = {
        multiple: options.multiple || false
      };
      if (options.filters && options.filters.length > 0) {
        pickerOpts.types = options.filters.map((filter) => ({
          description: filter.name,
          accept: {
            "application/octet-stream": filter.extensions.map((ext) => `.${ext}`)
          }
        }));
      }
      if (options.directory) {
        const dirHandle = await window.showDirectoryPicker();
        return [dirHandle.name];
      } else {
        const fileHandles = await window.showOpenFilePicker(pickerOpts);
        const files = await Promise.all(fileHandles.map(async (handle) => {
          const file = await handle.getFile();
          return URL.createObjectURL(file);
        }));
        return files;
      }
    } else {
      console.warn("File System Access API not available");
      const input = document.createElement("input");
      input.type = "file";
      if (options.multiple) {
        input.multiple = true;
      }
      if (options.filters && options.filters.length > 0) {
        input.accept = options.filters.flatMap((filter) => filter.extensions.map((ext) => `.${ext}`)).join(",");
      }
      return new Promise((resolve) => {
        input.onchange = () => {
          if (!input.files || input.files.length === 0) {
            resolve(null);
            return;
          }
          const files = Array.from(input.files).map((file) => URL.createObjectURL(file));
          resolve(files);
        };
        input.click();
      });
    }
  } catch (error) {
    console.error("Error opening file dialog:", error);
    return null;
  }
};

// src/services/webAppService.ts
var resolvePath = (fp, base) => {
  switch (base) {
    case "Books":
      return { baseDir: 0, fp: `${LOCAL_BOOKS_SUBDIR}/${fp}`, base };
    case "None":
      return { baseDir: 0, fp, base };
    default:
      return { baseDir: 0, fp: `${base}/${fp}`, base };
  }
};
var dbName = "AppFileSystem";
var dbVersion = 1;
async function openIndexedDB() {
  return new Promise((resolve, reject) => {
    let request;
    try {
      request = indexedDB.open(dbName, dbVersion);
    } catch (error) {
      console.error("Failed to open IndexedDB:", error);
      reject(new Error("Browser storage is unavailable. Your data won't be saved between sessions."));
      return;
    }
    request.onupgradeneeded = (event) => {
      try {
        const db = request.result;
        console.log("Creating or upgrading IndexedDB stores");
        if (!db.objectStoreNames.contains("files")) {
          db.createObjectStore("files", { keyPath: "path" });
          console.log("Created 'files' object store");
        }
      } catch (error) {
        console.error("Error during IndexedDB upgrade:", error);
        reject(error);
      }
    };
    request.onsuccess = () => {
      console.log("IndexedDB opened successfully");
      resolve(request.result);
    };
    request.onerror = () => {
      console.error("Error opening IndexedDB:", request.error);
      reject(request.error || new Error("Failed to open IndexedDB"));
    };
  });
}
var indexedDBFileSystem = {
  getURL(path) {
    if (isValidURL(path)) {
      return path;
    } else {
      return URL.createObjectURL(new Blob([path]));
    }
  },
  async getBlobURL(path, base) {
    try {
      const content = await this.readFile(path, base, "binary");
      return URL.createObjectURL(new Blob([content]));
    } catch {
      return path;
    }
  },
  async openFile(path, base, filename) {
    try {
      if (isValidURL(path)) {
        const remoteFile = new RemoteFile(path, filename);
        await remoteFile.open();
        return remoteFile;
      } else {
        const content = await this.readFile(path, base, "binary");
        return new File([content], filename || path.split("/").pop() || "file");
      }
    } catch (error) {
      console.error(`Error opening file ${path}:`, error);
      return new File([], filename || path.split("/").pop() || "empty-file");
    }
  },
  async copyFile(srcPath, dstPath, base) {
    const { fp } = resolvePath(dstPath, base);
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("files", "readwrite");
      const store = transaction.objectStore("files");
      const getRequest = store.get(srcPath);
      getRequest.onsuccess = () => {
        const data = getRequest.result;
        if (data) {
          store.put({ path: fp, content: data.content });
          resolve();
        } else {
          reject(new Error(`File not found: ${srcPath}`));
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  },
  async readFile(path, base, mode) {
    const { fp } = resolvePath(path, base);
    console.log(`\u{1F4D6} Reading file from IndexedDB: ${fp}`);
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("files", "readonly");
      const store = transaction.objectStore("files");
      const request = store.get(fp);
      request.onsuccess = async () => {
        if (request.result) {
          console.log(`\u2705 Found file in IndexedDB: ${fp}`);
          const content = request.result.content;
          if (mode === "text") resolve(content);
          else {
            if (content instanceof Blob) {
              const arrayBuffer = await content.arrayBuffer();
              resolve(arrayBuffer);
            } else if (content instanceof ArrayBuffer) {
              resolve(content);
            } else if (typeof content === "string") {
              resolve(new TextEncoder().encode(content).buffer);
            } else {
              console.error(`\u274C Unsupported content type in IndexedDB for ${fp}:`, typeof content);
              reject(new Error("Unsupported content type in IndexedDB"));
            }
          }
        } else {
          console.error(`\u274C File not found in IndexedDB: ${fp}`);
          reject(new Error(`File not found: ${fp}`));
        }
      };
      request.onerror = () => {
        console.error(`\u274C Error reading file from IndexedDB: ${fp}`, request.error);
        reject(request.error);
      };
    });
  },
  async writeFile(path, base, content) {
    const { fp } = resolvePath(path, base);
    console.log(`\u{1F4DD} Writing file to IndexedDB: ${fp}`);
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("files", "readwrite");
      const store = transaction.objectStore("files");
      const putRequest = store.put({ path: fp, content });
      putRequest.onsuccess = () => {
        console.log(`\u2705 Successfully wrote file to IndexedDB: ${fp}`);
        resolve();
      };
      putRequest.onerror = () => {
        console.error(`\u274C Error writing file to IndexedDB: ${fp}`, putRequest.error);
        reject(putRequest.error);
      };
      transaction.oncomplete = () => {
        console.log(`\u2705 Transaction completed for writing file: ${fp}`);
        resolve();
      };
      transaction.onerror = () => {
        console.error(`\u274C Transaction error for writing file: ${fp}`, transaction.error);
        reject(transaction.error);
      };
    });
  },
  async removeFile(path, base) {
    const { fp } = resolvePath(path, base);
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("files", "readwrite");
      const store = transaction.objectStore("files");
      store.delete(fp);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  },
  async createDir() {
  },
  async removeDir() {
  },
  async readDir(path) {
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("files", "readonly");
      const store = transaction.objectStore("files");
      const request = store.getAll();
      request.onsuccess = () => {
        const files = request.result;
        resolve(
          files.filter((file) => file.path.startsWith(path)).map((file) => ({ path: file.path, isDir: false }))
        );
      };
      request.onerror = () => reject(request.error);
    });
  },
  async exists(path, base) {
    const { fp } = resolvePath(path, base);
    console.log(`\u{1F50D} Checking if file exists in IndexedDB: ${fp}`);
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("files", "readonly");
      const store = transaction.objectStore("files");
      const request = store.get(fp);
      request.onsuccess = () => {
        const exists = !!request.result;
        console.log(`${exists ? "\u2705" : "\u274C"} File existence check in IndexedDB: ${fp} - ${exists ? "EXISTS" : "NOT FOUND"}`);
        resolve(exists);
      };
      request.onerror = () => {
        console.error(`\u274C Error checking file existence in IndexedDB: ${fp}`, request.error);
        reject(request.error);
      };
    });
  },
  getPrefix() {
    return null;
  }
};
var WebAppService = class extends BaseAppService {
  fs = indexedDBFileSystem;
  appPlatform = "web";
  isAppDataSandbox = false;
  isMobile = ["android", "ios"].includes(getOSPlatform());
  isAndroidApp = false;
  isIOSApp = false;
  hasTrafficLight = false;
  hasWindow = true;
  hasWindowBar = false;
  hasContextMenu = false;
  hasRoundedWindow = false;
  hasSafeAreaInset = isPWA();
  hasHaptics = false;
  hasSysFontsList = false;
  resolvePath(fp, base) {
    return resolvePath(fp, base);
  }
  async getInitBooksDir() {
    return LOCAL_BOOKS_SUBDIR;
  }
  async getCacheDir() {
    return "Cache";
  }
  async selectDirectory() {
    try {
      const result = await openFileDialog({ directory: true });
      if (result && result.length > 0 && result[0]) {
        return result[0];
      }
      throw new Error("No directory selected");
    } catch (error) {
      console.error("Error selecting directory:", error);
      throw new Error("Directory selection is not fully supported in browser");
    }
  }
  async selectFiles(name, extensions) {
    try {
      const result = await openFileDialog({
        multiple: true,
        filters: [{ name, extensions }]
      });
      if (result && result.length > 0) {
        return result.map((file) => typeof file === "string" ? file : URL.createObjectURL(file));
      }
      return [];
    } catch (error) {
      console.error("Error selecting files:", error);
      throw new Error("File selection failed");
    }
  }
  getCoverImageUrl = (book) => {
    return this.fs.getURL(`${LOCAL_BOOKS_SUBDIR}/${getCoverFilename(book)}`);
  };
  getCoverImageBlobUrl = async (book) => {
    return this.fs.getBlobURL(`${LOCAL_BOOKS_SUBDIR}/${getCoverFilename(book)}`, "None");
  };
};
export {
  WebAppService
};
//# sourceMappingURL=webAppService-5QUA7FXR.mjs.map