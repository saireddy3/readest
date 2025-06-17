/**
 * @typedef {Object} RouterType
 * @property {function(): void} back - Go back in history
 * @property {function(): void} forward - Go forward in history
 * @property {function(): void} refresh - Refresh the current page
 * @property {function(string, Object=): void} push - Navigate to a new URL
 * @property {function(string, Object=): void} replace - Replace current URL
 * @property {function(string): void} prefetch - Prefetch a URL
 */

/**
 * Create a mock router that can be used outside of Next.js
 * @returns {RouterType} Mock router object
 */
export const createMockRouter = () => {
  return {
    back: () => console.log('Mock router: back called'),
    forward: () => console.log('Mock router: forward called'),
    refresh: () => console.log('Mock router: refresh called'),
    push: (url) => console.log(`Mock router: push called with url ${url}`),
    replace: (url) => console.log(`Mock router: replace called with url ${url}`),
    prefetch: (url) => console.log(`Mock router: prefetch called with url ${url}`),
  };
};

// Simple navigation utilities for non-routed applications

/**
 * No operation function that just logs what would have happened
 * @param {*} _ - Unused parameter
 * @param {string[]} bookIds - Array of book IDs
 * @param {string} [queryParams] - Optional query parameters
 */
export const navigateToReader = (_, bookIds, queryParams) => {
  console.log(`Navigation to reader with ids: ${bookIds.join(',')} and params: ${queryParams || 'none'}`);
};

/**
 * Simple page reload function
 */
export const redirectToDirectReader = () => {
  // Force a full page reload to ensure clean component state
  window.location.reload();
}; 