// Export constants
export const ThemeType = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// Export interfaces as JSDoc comments for documentation
/**
 * @typedef {Object} ReadSettings
 * @property {string} sideBarWidth
 * @property {boolean} isSideBarPinned
 * @property {string} notebookWidth
 * @property {boolean} isNotebookPinned
 * @property {boolean} autohideCursor
 * @property {string} translateTargetLang
 * @property {HighlightStyle} highlightStyle
 * @property {Record<HighlightStyle, HighlightColor>} highlightStyles
 * @property {CustomTheme[]} customThemes
 */

/**
 * @typedef {Object} SystemSettings
 * @property {number} version
 * @property {string} localBooksDir
 * @property {boolean} keepLogin
 * @property {boolean} autoUpload
 * @property {boolean} alwaysOnTop
 * @property {boolean} autoCheckUpdates
 * @property {boolean} screenWakeLock
 * @property {boolean} autoImportBooksOnOpen
 * @property {number} lastSyncedAtBooks
 * @property {number} lastSyncedAtConfigs
 * @property {number} lastSyncedAtNotes
 * @property {ReadSettings} globalReadSettings
 * @property {ViewSettings} globalViewSettings
 */ 