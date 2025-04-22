'use client';

import React, { createContext, useContext } from 'react';
import { createMockRouter, RouterType } from '@/utils/nav';

// Create context for the Next.js App Router
const AppRouterContext = createContext<RouterType | null>(null);
const PathnameContext = createContext<string>('/');
const SearchParamsContext = createContext<URLSearchParams>(new URLSearchParams());

// Export the contexts to match Next.js structure
export { AppRouterContext, PathnameContext, SearchParamsContext };

// Wrapper component to provide all router context needed
export function MockNextNavigation({ children }: { children: React.ReactNode }) {
  const mockRouter = createMockRouter();
  
  return (
    <AppRouterContext.Provider value={mockRouter}>
      <PathnameContext.Provider value="/">
        <SearchParamsContext.Provider value={new URLSearchParams()}>
          {children}
        </SearchParamsContext.Provider>
      </PathnameContext.Provider>
    </AppRouterContext.Provider>
  );
}

// Create hooks that mimic Next.js hooks
export function useRouter() {
  const router = useContext(AppRouterContext);
  if (router === null) {
    throw new Error('useRouter must be used within MockNextNavigation');
  }
  return router;
}

export function usePathname() {
  const pathname = useContext(PathnameContext);
  if (pathname === null) {
    throw new Error('usePathname must be used within MockNextNavigation');
  }
  return pathname;
}

export function useSearchParams() {
  const searchParams = useContext(SearchParamsContext);
  if (searchParams === null) {
    throw new Error('useSearchParams must be used within MockNextNavigation');
  }
  return searchParams;
} 