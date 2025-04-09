// Web-compatible implementation of CLI functions

declare global {
  interface Window {
    OPEN_WITH_FILES?: string[];
  }
}

/**
 * Parse files that were opened with the application
 * Returns null in web environment since this feature requires native integration
 */
export const parseOpenWithFiles = async (): Promise<string[] | null> => {
  return window.OPEN_WITH_FILES || null;
};

/**
 * Get matches for command-line arguments
 * Web environments don't have command-line arguments, so return null
 */
export const getMatches = async (): Promise<any> => {
  return null;
};
