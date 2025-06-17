/**
 * Get maximum inline size based on view settings
 * @param {Object} viewSettings - View settings object
 * @param {boolean} viewSettings.scrolled - Whether content is scrolled
 * @param {number} viewSettings.maxColumnCount - Maximum number of columns
 * @param {number} viewSettings.maxInlineSize - Maximum inline size
 * @returns {number} Maximum inline size
 */
export const getMaxInlineSize = (viewSettings) => {
  const isScrolled = viewSettings.scrolled;
  const maxColumnCount = viewSettings.maxColumnCount;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  return maxColumnCount === 1 || isScrolled
    ? Math.max(screenWidth, screenHeight, 720)
    : viewSettings.maxInlineSize;
};

/**
 * Get default maximum inline size
 * @returns {number} Default maximum inline size
 */
export const getDefaultMaxInlineSize = () => {
  if (typeof window === 'undefined') return 720;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return screenWidth < screenHeight ? Math.max(screenWidth, 720) : 720;
};

/**
 * Get default maximum block size
 * @returns {number} Default maximum block size
 */
export const getDefaultMaxBlockSize = () => {
  if (typeof window === 'undefined') return 1440;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return Math.max(screenWidth, screenHeight, 1440);
}; 