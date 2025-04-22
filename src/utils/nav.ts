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

import { isPWA, isWebAppPlatform } from '@/services/environment';
import { BOOK_IDS_SEPARATOR } from '@/services/constants';

export const navigateToReader = (
  router: RouterType,
  bookIds: string[],
  queryParams?: string,
  navOptions?: { scroll?: boolean },
) => {
  const ids = bookIds.join(BOOK_IDS_SEPARATOR);
  if (isWebAppPlatform() && !isPWA()) {
    router.push(`/reader/${ids}${queryParams ? `?${queryParams}` : ''}`, navOptions);
  } else {
    const params = new URLSearchParams(queryParams || '');
    params.set('ids', ids);
    router.push(`/reader?${params.toString()}`, navOptions);
  }
};

// Used for direct reader redirect
export const redirectToDirectReader = () => {
  // Force a full page reload to ensure clean component state
  window.location.href = '/reader';
  window.location.reload();
};
