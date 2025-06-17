/**
 * Add a handler for window close events
 * @param {Function} handler - Function to call when window is closing
 * @returns {Function} Function to remove the handler
 */
export const handleOnCloseWindow = (handler) => {
  if (typeof window === 'undefined') return () => {};

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      handler();
    }
  };

  const handleBeforeUnload = (event) => {
    handler();
    event.preventDefault();
    event.returnValue = '';
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

/**
 * Check if window is visible
 * @returns {boolean} True if window is visible
 */
export const isWindowVisible = () => {
  if (typeof window === 'undefined') return false;
  return document.visibilityState === 'visible';
};

/**
 * Check if window is focused
 * @returns {boolean} True if window is focused
 */
export const isWindowFocused = () => {
  if (typeof window === 'undefined') return false;
  return document.hasFocus();
};

/**
 * Focus the window
 */
export const focusWindow = () => {
  if (typeof window === 'undefined') return;
  window.focus();
}; 