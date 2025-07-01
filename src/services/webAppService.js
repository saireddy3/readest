/**
 * @typedef {import('@/types/book').Book} Book
 * @typedef {import('@/types/system').FileSystem} FileSystem
 * @typedef {import('@/types/system').BaseDir} BaseDir
 * @typedef {import('@/types/system').AppPlatform} AppPlatform
 */

import { getCoverFilename } from '@/utils/book.js';
import { getOSPlatform, isValidURL } from '@/utils/misc.js';
import { RemoteFile } from '@/utils/file.js';

import { isPWA } from './environment.js';
import { BaseAppService } from './appService.js';
import { LOCAL_BOOKS_SUBDIR } from './constants.js';
import { openFileDialog } from '@/utils/webFileSystem.js';

/**
 * @param {string} fp
 * @param {BaseDir} base
 * @returns {{ baseDir: number; base: BaseDir; fp: string }}
 */
const resolvePath = (fp, base) => {
  switch (base) {
    case 'Books':
      return { baseDir: 0, fp: `${LOCAL_BOOKS_SUBDIR}/${fp}`, base };
    case 'None':
      return { baseDir: 0, fp, base };
    default:
      return { baseDir: 0, fp: `${base}/${fp}`, base };
  }
};

const dbName = 'AppFileSystem';
const dbVersion = 1;

/**
 * @returns {Promise<IDBDatabase>}
 */
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

    request.onupgradeneeded = () => {
      try {
        const db = request.result;
        console.log("Creating or upgrading IndexedDB stores");
        
        // Create our main files store if it doesn't exist
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'path' });
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

/**
 * @type {FileSystem}
 */
const indexedDBFileSystem = {
  /**
   * @param {string} path
   * @returns {string}
   */
  getURL(path) {
    if (isValidURL(path)) {
      return path;
    } else {
      return URL.createObjectURL(new Blob([path]));
    }
  },
  /**
   * @param {string} path
   * @param {BaseDir} base
   * @returns {Promise<string>}
   */
  async getBlobURL(path, base) {
    try {
      const content = await this.readFile(path, base, 'binary');
      return URL.createObjectURL(new Blob([content]));
    } catch {
      return path;
    }
  },
  /**
   * @param {string} path
   * @param {BaseDir} base
   * @param {string} [filename]
   * @returns {Promise<File>}
   */
  async openFile(path, base, filename) {
    try {
      if (isValidURL(path)) {
        // For URLs, create and initialize a RemoteFile
        const remoteFile = new RemoteFile(path, filename);
        
        // Call open() which returns void but initializes the RemoteFile
        await remoteFile.open();
        
        // Return the initialized RemoteFile which extends File
        return remoteFile;
      } else {
        // For local files stored in IndexedDB
        const content = await this.readFile(path, base, 'binary');
        return new File([content], filename || path.split('/').pop() || 'file');
      }
    } catch (error) {
      console.error(`Error opening file ${path}:`, error);
      // Return an empty file as a fallback
      return new File([], filename || path.split('/').pop() || 'empty-file');
    }
  },
  /**
   * @param {string} srcPath
   * @param {string} dstPath
   * @param {BaseDir} base
   * @returns {Promise<void>}
   */
  async copyFile(srcPath, dstPath, base) {
    const { fp } = resolvePath(dstPath, base);
    const db = await openIndexedDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readwrite');
      const store = transaction.objectStore('files');
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
  /**
   * @param {string} path
   * @param {BaseDir} base
   * @param {'text' | 'binary'} mode
   * @returns {Promise<string | ArrayBuffer>}
   */
  async readFile(path, base, mode) {
    const { fp } = resolvePath(path, base);
    const isCoverImage = fp.includes('cover.png');
    
    // Only log for non-cover images to reduce console noise
    if (!isCoverImage) {
      console.log(`📖 Reading file from IndexedDB: ${fp}`);
    }
    
    const db = await openIndexedDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readonly');
      const store = transaction.objectStore('files');
      const request = store.get(fp);

      request.onsuccess = async () => {
        if (request.result) {
          if (!isCoverImage) {
            console.log(`✅ Found file in IndexedDB: ${fp}`);
          }
          const content = request.result.content;
          if (mode === 'text') resolve(content);
          else {
            if (content instanceof Blob) {
              const arrayBuffer = await content.arrayBuffer();
              resolve(arrayBuffer);
            } else if (content instanceof ArrayBuffer) {
              resolve(content);
            } else if (typeof content === 'string') {
              resolve(new TextEncoder().encode(content).buffer);
            } else {
              console.error(`❌ Unsupported content type in IndexedDB for ${fp}:`, typeof content);
              reject(new Error('Unsupported content type in IndexedDB'));
            }
          }
        } else {
          if (isCoverImage) {
            // For cover images, silently reject without logging error
            reject(new Error(`File not found: ${fp}`));
          } else {
            console.error(`❌ File not found in IndexedDB: ${fp}`);
            reject(new Error(`File not found: ${fp}`));
          }
        }
      };

      request.onerror = () => {
        if (!isCoverImage) {
          console.error(`❌ Error reading file from IndexedDB: ${fp}`, request.error);
        }
        reject(request.error);
      };
    });
  },
  /**
   * @param {string} path
   * @param {BaseDir} base
   * @param {string | ArrayBuffer} content
   * @returns {Promise<void>}
   */
  async writeFile(path, base, content) {
    const { fp } = resolvePath(path, base);
    console.log(`📝 Writing file to IndexedDB: ${fp}`);
    const db = await openIndexedDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readwrite');
      const store = transaction.objectStore('files');

      const putRequest = store.put({ path: fp, content });

      putRequest.onsuccess = () => {
        console.log(`✅ Successfully wrote file to IndexedDB: ${fp}`);
        resolve();
      };

      putRequest.onerror = () => {
        console.error(`❌ Error writing file to IndexedDB: ${fp}`, putRequest.error);
        reject(putRequest.error);
      };

      transaction.oncomplete = () => {
        console.log(`✅ Transaction completed for writing file: ${fp}`);
        resolve();
      };
      
      transaction.onerror = () => {
        console.error(`❌ Transaction error for writing file: ${fp}`, transaction.error);
        reject(transaction.error);
      };
    });
  },
  /**
   * @param {string} path
   * @param {BaseDir} base
   * @returns {Promise<void>}
   */
  async removeFile(path, base) {
    const { fp } = resolvePath(path, base);
    const db = await openIndexedDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readwrite');
      const store = transaction.objectStore('files');

      store.delete(fp);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  },
  /**
   * @returns {Promise<void>}
   */
  async createDir() {
    // Directories are virtual in IndexedDB; no-op
  },
  /**
   * @returns {Promise<void>}
   */
  async removeDir() {
    // Directories are virtual in IndexedDB; no-op
  },
  /**
   * @param {string} path
   * @returns {Promise<{ path: string; isDir: boolean }[]>}
   */
  async readDir(path) {
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readonly');
      const store = transaction.objectStore('files');
      const request = store.getAll();

      request.onsuccess = () => {
        const files = request.result;
        resolve(
          files
            .filter((file) => file.path.startsWith(path))
            .map((file) => ({ path: file.path, isDir: false })),
        );
      };

      request.onerror = () => reject(request.error);
    });
  },
  /**
   * @param {string} path
   * @param {BaseDir} base
   * @returns {Promise<boolean>}
   */
  async exists(path, base) {
    const { fp } = resolvePath(path, base);
    console.log(`🔍 Checking if file exists in IndexedDB: ${fp}`);
    const db = await openIndexedDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readonly');
      const store = transaction.objectStore('files');
      const request = store.get(fp);

      request.onsuccess = () => {
        const exists = !!request.result;
        console.log(`${exists ? '✅' : '❌'} File existence check in IndexedDB: ${fp} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
        resolve(exists);
      };
      
      request.onerror = () => {
        console.error(`❌ Error checking file existence in IndexedDB: ${fp}`, request.error);
        reject(request.error);
      };
    });
  },
  /**
   * @returns {null}
   */
  getPrefix() {
    return null;
  },
};

export class WebAppService extends BaseAppService {
  constructor() {
    super();
    this.fs = indexedDBFileSystem;
    this.appPlatform = 'web';
    this.isAppDataSandbox = false;
    this.isMobile = ['android', 'ios'].includes(getOSPlatform());
    this.isAndroidApp = false;
    this.isIOSApp = false;
    this.hasTrafficLight = false;
    this.hasWindow = true;
    this.hasWindowBar = false;
    this.hasContextMenu = false;
    this.hasRoundedWindow = false;
    this.hasSafeAreaInset = isPWA();
    this.hasHaptics = false;
    this.hasSysFontsList = false;
  }

  /**
   * @param {string} fp
   * @param {BaseDir} base
   * @returns {{ baseDir: number; base: BaseDir; fp: string }}
   */
  resolvePath(fp, base) {
    return resolvePath(fp, base);
  }

  /**
   * @returns {Promise<string>}
   */
  async getInitBooksDir() {
    return LOCAL_BOOKS_SUBDIR;
  }

  /**
   * @returns {Promise<string>}
   */
  async getCacheDir() {
    return 'Cache';
  }

  /**
   * @returns {Promise<string>}
   */
  async selectDirectory() {
    try {
      const result = await openFileDialog({ directory: true });
      if (result && result.length > 0 && result[0]) {
        return result[0];
      }
      throw new Error('No directory selected');
    } catch (error) {
      console.error('Error selecting directory:', error);
      throw new Error('Directory selection is not fully supported in browser');
    }
  }

  /**
   * @param {string} name
   * @param {string[]} extensions
   * @returns {Promise<string[]>}
   */
  async selectFiles(name, extensions) {
    try {
      const result = await openFileDialog({
        multiple: true,
        filters: [{ name, extensions }]
      });
      
      if (result && result.length > 0) {
        return result.map(file => typeof file === 'string' ? file : URL.createObjectURL(file));
      }
      return [];
    } catch (error) {
      console.error('Error selecting files:', error);
      throw new Error('File selection failed');
    }
  }

  /**
   * @param {Book} book
   * @returns {string}
   */
  getCoverImageUrl = (book) => {
    const coverPath = `${LOCAL_BOOKS_SUBDIR}/${getCoverFilename(book)}`;
    try {
      return this.fs.getURL(coverPath);
    } catch {
      console.log(`Unable to load cover for book, using default cover`);
      return '/assets/default-cover.png';
    }
  };

  /**
   * @param {Book} book
   * @returns {Promise<string>}
   */
  getCoverImageBlobUrl = async (book) => {
    const coverPath = `${LOCAL_BOOKS_SUBDIR}/${getCoverFilename(book)}`;
    
    try {
      // First check if the cover file exists
      const exists = await this.fs.exists(coverPath, 'None');
      if (!exists) {
        console.log(`Cover image does not exist: ${coverPath}, using default`);
        return '/assets/default-cover.png';
      }
      
      return await this.fs.getBlobURL(coverPath, 'None');
    } catch {
      console.log(`Unable to load blob cover for book, using default cover`);
      return '/assets/default-cover.png';
    }
  };
} 