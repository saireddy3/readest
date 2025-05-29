import { create } from 'zustand';

/**
 * @typedef {Object} NotebookState
 * @property {string} notebookWidth
 * @property {boolean} isNotebookVisible
 * @property {boolean} isNotebookPinned
 * @property {TextSelection|null} notebookNewAnnotation
 * @property {BookNote|null} notebookEditAnnotation
 * @property {{[key: string]: string}} notebookAnnotationDrafts
 * @property {function(): void} toggleNotebook
 * @property {function(): void} toggleNotebookPin
 * @property {function(string): void} setNotebookWidth
 * @property {function(boolean): void} setNotebookVisible
 * @property {function(boolean): void} setNotebookPin
 * @property {function(TextSelection|null): void} setNotebookNewAnnotation
 * @property {function(BookNote|null): void} setNotebookEditAnnotation
 * @property {function(string, string): void} saveNotebookAnnotationDraft
 * @property {function(string): string|undefined} getNotebookAnnotationDraft
 */

export const useNotebookStore = create((set, get) => ({
  notebookWidth: '',
  isNotebookVisible: false,
  isNotebookPinned: false,
  notebookNewAnnotation: null,
  notebookEditAnnotation: null,
  notebookAnnotationDrafts: {},
  setNotebookWidth: (width) => set({ notebookWidth: width }),
  toggleNotebook: () => set((state) => ({ isNotebookVisible: !state.isNotebookVisible })),
  toggleNotebookPin: () => set((state) => ({ isNotebookPinned: !state.isNotebookPinned })),
  setNotebookVisible: (visible) => set({ isNotebookVisible: visible }),
  setNotebookPin: (pinned) => set({ isNotebookPinned: pinned }),
  setNotebookNewAnnotation: (selection) => set({ notebookNewAnnotation: selection }),
  setNotebookEditAnnotation: (note) => set({ notebookEditAnnotation: note }),
  saveNotebookAnnotationDraft: (key, note) =>
    set((state) => ({
      notebookAnnotationDrafts: { ...state.notebookAnnotationDrafts, [key]: note },
    })),
  getNotebookAnnotationDraft: (key) => get().notebookAnnotationDrafts[key],
})); 