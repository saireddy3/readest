/**
 * Check if the current platform is macOS
 * @returns {boolean} True if running on macOS
 */
export const isMacOS = () => {
  return typeof window !== 'undefined' && window.navigator.platform.includes('Mac');
};

/**
 * Check if the current platform is Windows
 * @returns {boolean} True if running on Windows
 */
export const isWindows = () => {
  return typeof window !== 'undefined' && window.navigator.platform.includes('Win');
}; 