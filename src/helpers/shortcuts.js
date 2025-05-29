/**
 * @typedef {Object} ShortcutConfig
 * @property {string[]} onSwitchSideBar
 * @property {string[]} onToggleSideBar
 * @property {string[]} onToggleNotebook
 * @property {string[]} onToggleSearchBar
 * @property {string[]} onToggleScrollMode
 * @property {string[]} onToggleSelectMode
 * @property {string[]} onOpenFontLayoutSettings
 * @property {string[]} onReloadPage
 * @property {string[]} onQuitApp
 * @property {string[]} onGoLeft
 * @property {string[]} onGoRight
 * @property {string[]} onGoNext
 * @property {string[]} onGoPrev
 * @property {string[]} onGoHalfPageDown
 * @property {string[]} onGoHalfPageUp
 * @property {string[]} onGoBack
 * @property {string[]} onGoForward
 * @property {string[]} onZoomIn
 * @property {string[]} onZoomOut
 * @property {string[]} onResetZoom
 * @property {string[]} onSaveNote
 * @property {string[]} onCloseNote
 */

const DEFAULT_SHORTCUTS = {
  onSwitchSideBar: ['ctrl+Tab', 'opt+Tab', 'alt+Tab'],
  onToggleSideBar: ['s'],
  onToggleNotebook: ['n'],
  onToggleSearchBar: ['ctrl+f', 'cmd+f'],
  onToggleScrollMode: ['shift+j'],
  onToggleSelectMode: ['shift+s'],
  onOpenFontLayoutSettings: ['shift+f'],
  onReloadPage: ['shift+r'],
  onQuitApp: ['ctrl+q', 'cmd+q'],
  onGoLeft: ['ArrowLeft', 'PageUp', 'h'],
  onGoRight: ['ArrowRight', 'PageDown', 'l', ' '],
  onGoNext: ['ArrowDown', 'j'],
  onGoPrev: ['ArrowUp', 'k'],
  onGoHalfPageDown: ['shift+ArrowDown', 'd'],
  onGoHalfPageUp: ['shift+ArrowUp', 'u'],
  onGoBack: ['shift+ArrowLeft', 'shift+h'],
  onGoForward: ['shift+ArrowRight', 'shift+l'],
  onZoomIn: ['ctrl+=', 'cmd+=', 'shift+='],
  onZoomOut: ['ctrl+-', 'cmd+-', 'shift+-'],
  onResetZoom: ['ctrl+0', 'cmd+0'],
  onSaveNote: ['ctrl+Enter'],
  onCloseNote: ['Escape'],
};

// Load shortcuts from localStorage or fallback to defaults
export const loadShortcuts = () => {
  if (typeof localStorage === 'undefined') return DEFAULT_SHORTCUTS;
  const customShortcuts = JSON.parse(localStorage.getItem('customShortcuts') || '{}');
  return {
    ...DEFAULT_SHORTCUTS,
    ...customShortcuts,
  };
};

// Save custom shortcuts to localStorage
export const saveShortcuts = (shortcuts) => {
  localStorage.setItem('customShortcuts', JSON.stringify(shortcuts));
}; 