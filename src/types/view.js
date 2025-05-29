// Export constants
export const TTSGranularity = {
  SENTENCE: 'sentence',
  WORD: 'word'
};

// Export interfaces as JSDoc comments for documentation
/**
 * @typedef {Object} FoliateView
 * @property {function(BookDoc): Promise<void>} open
 * @property {function(): void} close
 * @property {function({lastLocation: string}): void} init
 * @property {function(string): void} goTo
 * @property {function(number): void} goToFraction
 * @property {function(number): void} prev
 * @property {function(number): void} next
 * @property {function(): void} goLeft
 * @property {function(): void} goRight
 * @property {function(number, Range): string} getCFI
 * @property {function(BookNote, boolean?): {index: number, label: string}} addAnnotation
 * @property {function(BookSearchConfig): AsyncGenerator<BookSearchResult|string, void, void>} search
 * @property {function(): void} clearSearch
 * @property {function(string|number|{fraction: number}): void} select
 * @property {function(): void} deselect
 * @property {function(TTSGranularity?): Promise<void>} initTTS
 * @property {BookDoc} book
 * @property {any|null} tts
 * @property {{locale?: string, isCJK?: boolean}} language
 * @property {{canGoBack: boolean, canGoForward: boolean, back: function(): void, forward: function(): void, clear: function(): void}} history
 * @property {{scrolled?: boolean, size: number, viewSize: number, start: number, end: number, setAttribute: function(string, string|number): void, removeAttribute: function(string): void, next: function(): Promise<void>, prev: function(): Promise<void>, goTo?: function({index: number, anchor: number}): void, setStyles?: function(string): void, getContents: function(): Array<{doc: Document, index?: number}>, addEventListener: function(string, EventListener): void, removeEventListener: function(string, EventListener): void}} renderer
 */

/**
 * Wraps a FoliateView instance to transform BookNote to foliate annotation
 * @param {FoliateView} originalView - The original FoliateView instance
 * @returns {FoliateView} The wrapped FoliateView instance
 */
export const wrappedFoliateView = (originalView) => {
  const originalAddAnnotation = originalView.addAnnotation.bind(originalView);
  originalView.addAnnotation = (note, remove = false) => {
    // transform BookNote to foliate annotation
    const annotation = {
      value: note.cfi,
      ...note,
    };
    return originalAddAnnotation(annotation, remove);
  };
  return originalView;
}; 