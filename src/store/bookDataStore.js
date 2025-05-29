import { create } from 'zustand';

/**
 * @typedef {Object} BookData
 * @property {string} id - Persistent data shared with different views of the same book
 * @property {Book|null} book
 * @property {File|null} file
 * @property {BookConfig|null} config
 * @property {BookDoc|null} bookDoc
 */

/**
 * @typedef {Object} BookDataState
 * @property {{[id: string]: BookData}} booksData
 * @property {function(string|null): BookConfig|null} getConfig
 * @property {function(string, Partial<BookConfig>): void} setConfig
 * @property {function(EnvConfigType, string, BookConfig, SystemSettings): void} saveConfig
 * @property {function(string, BookNote[]): BookConfig|undefined} updateBooknotes
 * @property {function(string): BookData|null} getBookData
 */

export const useBookDataStore = create((set, get) => ({
  booksData: {},
  getBookData: (keyOrId) => {
    const id = keyOrId.split('-')[0];
    return get().booksData[id] || null;
  },
  getConfig: (key) => {
    if (!key) return null;
    const id = key.split('-')[0];
    return get().booksData[id]?.config || null;
  },
  setConfig: (key, partialConfig) => {
    set((state) => {
      const id = key.split('-')[0];
      const config = (state.booksData[id]?.config || {});
      Object.assign(config, partialConfig);
      return {
        booksData: {
          ...state.booksData,
          [id]: {
            ...state.booksData[id],
            config,
          },
        },
      };
    });
  },
  saveConfig: async (envConfig, bookKey, config, settings) => {
    console.log(`💾 Saving book config for ${bookKey}`, config);
    const appService = await envConfig.getAppService();
    const id = bookKey.split('-')[0];
    if (!id) {
      console.error(`❌ Invalid book key: ${bookKey}`);
      return;
    }
    
    const bookData = get().booksData[id];
    if (!bookData || !bookData.book) {
      console.error(`❌ Book data not found for ${id}`);
      return;
    }
    
    const book = bookData.book;
    book.progress = config.progress;
    book.updatedAt = Date.now();
    
    config.updatedAt = Date.now();
    
    try {
      // Save config file to storage
      await appService.saveBookConfig(book, config, settings);
      console.log(`✅ Book config saved to storage for ${bookKey}`);
      
      // Save the single book to maintain book data
      const books = await appService.loadLibraryBooks();
      const bookIndex = books.findIndex(b => b.hash === id);
      if (bookIndex >= 0) {
        books[bookIndex] = book;
      } else {
        books.push(book);
      }
      await appService.saveLibraryBooks(books);
      console.log(`✅ Book library updated for ${bookKey}`);
    } catch (error) {
      console.error(`❌ Error saving book config for ${bookKey}:`, error);
    }
  },
  updateBooknotes: (key, booknotes) => {
    let updatedConfig;
    console.log(`📝 Updating booknotes for ${key}`, booknotes.length, 'items');
    
    set((state) => {
      const id = key.split('-')[0];
      const book = state.booksData[id];
      if (!book) {
        console.error(`❌ Book data not found for ${id}`);
        return state;
      }
      
      const dedupedBooknotes = Array.from(
        new Map(booknotes.map((item) => [`${item.id}-${item.type}-${item.cfi}`, item])).values(),
      );
      
      console.log(`📊 Deduped booknotes: ${dedupedBooknotes.length} items`);
      
      updatedConfig = {
        ...book.config,
        updatedAt: Date.now(),
        booknotes: dedupedBooknotes,
      };
      
      console.log(`📦 Storing updated config in memory store`);
      
      return {
        booksData: {
          ...state.booksData,
          [id]: {
            ...book,
            config: {
              ...book.config,
              updatedAt: Date.now(),
              booknotes: dedupedBooknotes,
            },
          },
        },
      };
    });
    
    return updatedConfig;
  },
})); 