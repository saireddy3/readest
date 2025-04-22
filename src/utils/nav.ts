// Mock Next.js navigation
export type RouterType = {
  back: () => void;
  forward: () => void;
  refresh: () => void;
  push: (url: string, options?: { scroll?: boolean }) => void;
  replace: (url: string, options?: { scroll?: boolean }) => void;
  prefetch: (url: string) => void;
};

// Create a mock router that can be used outside of Next.js
export const createMockRouter = (): RouterType => {
  return {
    back: () => console.log('Mock router: back called'),
    forward: () => console.log('Mock router: forward called'),
    refresh: () => console.log('Mock router: refresh called'),
    push: (url: string) => console.log(`Mock router: push called with url ${url}`),
    replace: (url: string) => console.log(`Mock router: replace called with url ${url}`),
    prefetch: (url: string) => console.log(`Mock router: prefetch called with url ${url}`),
  };
};

// Simple navigation utilities for non-routed applications

// No operation function that just logs what would have happened
export const navigateToReader = (
  _: unknown,
  bookIds: string[],
  queryParams?: string,
) => {
  console.log(`Navigation to reader with ids: ${bookIds.join(',')} and params: ${queryParams || 'none'}`);
};

// Simple page reload function
export const redirectToDirectReader = () => {
  // Force a full page reload to ensure clean component state
  window.location.reload();
};
