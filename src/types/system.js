// Export constants
export const AppPlatform = {
  WEB: 'web'
};

export const BaseDir = {
  BOOKS: 'Books',
  SETTINGS: 'Settings',
  DATA: 'Data',
  LOG: 'Log',
  CACHE: 'Cache',
  NONE: 'None'
};

// Export interfaces as JSDoc comments for documentation
/**
 * @typedef {Object} FileSystem
 * @property {function(string): string} getURL
 * @property {function(string, BaseDir): Promise<string>} getBlobURL
 * @property {function(string, BaseDir, string?): Promise<File>} openFile
 * @property {function(string, string, BaseDir): Promise<void>} copyFile
 * @property {function(string, BaseDir, 'text'|'binary'): Promise<string|ArrayBuffer>} readFile
 * @property {function(string, BaseDir, string|ArrayBuffer|File): Promise<void>} writeFile
 * @property {function(string, BaseDir): Promise<void>} removeFile
 * @property {function(string, BaseDir): Promise<Array<{path: string, isDir: boolean}>>} readDir
 * @property {function(string, BaseDir, boolean?): Promise<void>} createDir
 * @property {function(string, BaseDir, boolean?): Promise<void>} removeDir
 * @property {function(string, BaseDir): Promise<boolean>} exists
 * @property {function(BaseDir): string|null} getPrefix
 */

/**
 * @typedef {Object} AppService
 * @property {FileSystem} fs
 * @property {string} osPlatform
 * @property {string} appPlatform
 * @property {boolean} hasTrafficLight
 * @property {boolean} hasWindow
 * @property {boolean} hasWindowBar
 * @property {boolean} hasContextMenu
 * @property {boolean} hasRoundedWindow
 * @property {boolean} hasSafeAreaInset
 * @property {boolean} hasHaptics
 * @property {boolean} hasSysFontsList
 * @property {boolean} isMobile
 * @property {boolean} isAppDataSandbox
 * @property {boolean} isAndroidApp
 * @property {boolean} isIOSApp
 * @property {function(): Promise<string>} selectDirectory
 * @property {function(string, string[]): Promise<string[]>} selectFiles
 * @property {function(): Promise<SystemSettings>} loadSettings
 * @property {function(SystemSettings): Promise<void>} saveSettings
 * @property {function(string|File, Book[], boolean?, boolean?, boolean?, boolean?): Promise<Book|null>} importBook
 * @property {function(Book, boolean?): Promise<void>} deleteBook
 * @property {function(Book, ProgressHandler?): Promise<void>} uploadBook
 * @property {function(Book, boolean?, ProgressHandler?): Promise<void>} downloadBook
 * @property {function(Book, SystemSettings): Promise<BookConfig>} loadBookConfig
 * @property {function(Book, SystemSettings): Promise<BookDoc['metadata']>} fetchBookDetails
 * @property {function(Book, BookConfig, SystemSettings?): Promise<void>} saveBookConfig
 * @property {function(Book, SystemSettings): Promise<BookContent>} loadBookContent
 * @property {function(): Promise<Book[]>} loadLibraryBooks
 * @property {function(Book[]): Promise<void>} saveLibraryBooks
 * @property {function(Book): string} getCoverImageUrl
 * @property {function(Book): Promise<string>} getCoverImageBlobUrl
 * @property {function(Book): Promise<string>} generateCoverImageUrl
 */ 