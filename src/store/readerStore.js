import { create } from 'zustand';
import { updateTocCFI, updateTocID } from '@/utils/toc';
import { useSettingsStore } from './settingsStore';
import { useBookDataStore } from './bookDataStore';
import { DocumentLoader } from '@/libs/document';

/**
 * @typedef {Object} ViewState
 * @property {string} key - Unique key for each book view
 * @property {FoliateView|null} view
 * @property {boolean} isPrimary
 * @property {boolean} loading
 * @property {string|null} error
 * @property {BookProgress|null} progress
 * @property {boolean} ribbonVisible
 * @property {ViewSettings|null} viewSettings - View settings for the view
 */

/**
 * @typedef {Object} ReaderStore
 * @property {{[key: string]: ViewState}} viewStates
 * @property {string[]} bookKeys
 * @property {string|null} hoveredBookKey
 * @property {function(string[]): void} setBookKeys
 * @property {function(string|null): void} setHoveredBookKey
 * @property {function(string, boolean): void} setBookmarkRibbonVisibility
 * @property {function(string, string, TOCItem, PageInfo, PageInfo, Range): void} setProgress
 * @property {function(string): BookProgress|null} getProgress
 * @property {function(string, FoliateView): void} setView
 * @property {function(string|null): FoliateView|null} getView
 * @property {function(): FoliateView[]} getViews
 * @property {function(string): FoliateView[]} getViewsById
 * @property {function(string, ViewSettings): void} setViewSettings
 * @property {function(string): ViewSettings|null} getViewSettings
 * @property {function(EnvConfigType, string, string, boolean?): Promise<void>} initViewState
 * @property {function(string): void} clearViewState
 * @property {function(string): ViewState|null} getViewState
 */

export const useReaderStore = create((set, get) => ({
  viewStates: {},
  bookKeys: [],
  hoveredBookKey: null,
  setBookKeys: (keys) => set({ bookKeys: keys }),
  setHoveredBookKey: (key) => set({ hoveredBookKey: key }),
  setBookmarkRibbonVisibility: (key, visible) =>
    set((state) => ({
      viewStates: {
        ...state.viewStates,
        [key]: {
          ...state.viewStates[key],
          ribbonVisible: visible,
        },
      },
    })),

  getView: (key) => (key && get().viewStates[key]?.view) || null,
  setView: (key, view) =>
    set((state) => ({
      viewStates: {
        ...state.viewStates,
        [key]: { ...state.viewStates[key], view },
      },
    })),
  getViews: () => Object.values(get().viewStates).map((state) => state.view),
  getViewsById: (id) => {
    const { viewStates } = get();
    return Object.values(viewStates)
      .filter((state) => state.key.startsWith(id))
      .map((state) => state.view);
  },

  clearViewState: (key) => {
    set((state) => {
      const viewStates = { ...state.viewStates };
      delete viewStates[key];
      return { viewStates };
    });
  },
  getViewState: (key) => get().viewStates[key] || null,
  initViewState: async (envConfig, id, key, isPrimary = true) => {
    const booksData = useBookDataStore.getState().booksData;
    const bookData = booksData[id];
    set((state) => ({
      viewStates: {
        ...state.viewStates,
        [key]: {
          key: '',
          view: null,
          isPrimary: false,
          loading: true,
          error: null,
          progress: null,
          ribbonVisible: false,
          viewSettings: null,
        },
      },
    }));
    try {
      if (!bookData) {
        const appService = await envConfig.getAppService();
        const { settings } = useSettingsStore.getState();
        // Find the book from saved books
        const books = await appService.loadLibraryBooks();
        const book = books.find((b) => b.hash === id);
        if (!book) {
          throw new Error('Book not found');
        }
        const content = await appService.loadBookContent(book, settings);
        const { file, config } = content;
        console.log('Loading book', key);
        const { book: loadedBookDoc } = await new DocumentLoader(file).open();
        const bookDoc = loadedBookDoc;
        if (bookDoc.toc?.length && bookDoc.sections?.length) {
          updateTocID(bookDoc.toc);
          const sections = bookDoc.sections.reduce((map, section) => {
            map[section.id] = section;
            return map;
          }, {});
          updateTocCFI(bookDoc, bookDoc.toc, sections);
        }
        useBookDataStore.setState((state) => ({
          booksData: {
            ...state.booksData,
            [id]: { id, book, file, config, bookDoc },
          },
        }));
      }
      const booksData = useBookDataStore.getState().booksData;
      const config = booksData[id]?.config;
      const configViewSettings = config.viewSettings;
      set((state) => ({
        viewStates: {
          ...state.viewStates,
          [key]: {
            ...state.viewStates[key],
            key,
            view: null,
            isPrimary,
            loading: false,
            error: null,
            progress: null,
            ribbonVisible: false,
            viewSettings: JSON.parse(JSON.stringify(configViewSettings)),
          },
        },
      }));
    } catch (error) {
      console.error(error);
      set((state) => ({
        viewStates: {
          ...state.viewStates,
          [key]: {
            ...state.viewStates[key],
            key: '',
            view: null,
            isPrimary: false,
            loading: false,
            error: 'Failed to load book.',
            progress: null,
            ribbonVisible: false,
            viewSettings: null,
          },
        },
      }));
    }
  },
  getViewSettings: (key) => get().viewStates[key]?.viewSettings || null,
  setViewSettings: (key, viewSettings) => {
    const id = key.split('-')[0];
    const bookData = useBookDataStore.getState().booksData[id];
    const viewState = get().viewStates[key];
    if (!viewState || !bookData) return;
    if (viewState.isPrimary) {
      useBookDataStore.setState((state) => ({
        booksData: {
          ...state.booksData,
          [id]: {
            ...bookData,
            config: {
              ...bookData.config,
              updatedAt: Date.now(),
              viewSettings,
            },
          },
        },
      }));
    }
    set((state) => ({
      viewStates: {
        ...state.viewStates,
        [key]: {
          ...state.viewStates[key],
          viewSettings,
        },
      },
    }));
  },
  getProgress: (key) => get().viewStates[key]?.progress || null,
  setProgress: (key, location, tocItem, section, pageinfo, range) =>
    set((state) => {
      const id = key.split('-')[0];
      const bookData = useBookDataStore.getState().booksData[id];
      const viewState = state.viewStates[key];
      if (!viewState || !bookData) return state;

      const progress = [(pageinfo?.next ?? pageinfo?.current ?? 0) + 1, pageinfo?.total ?? 1];

      // Update book progress without library store dependency
      const book = bookData.book;
      if (book) {
        book.progress = progress;
        book.updatedAt = Date.now();
      }

      const oldConfig = bookData.config;
      const newConfig = {
        ...bookData.config,
        updatedAt: Date.now(),
        progress,
        location,
      };

      useBookDataStore.setState((state) => ({
        booksData: {
          ...state.booksData,
          [id]: {
            ...bookData,
            config: viewState.isPrimary ? newConfig : oldConfig,
          },
        },
      }));

      return {
        viewStates: {
          ...state.viewStates,
          [key]: {
            ...state.viewStates[key],
            progress: {
              location,
              sectionId: tocItem?.id ?? '',
              sectionHref: tocItem?.href ?? '',
              sectionLabel: tocItem?.label ?? '',
              section,
              pageinfo,
              range,
            },
          },
        },
      };
    }),
})); 