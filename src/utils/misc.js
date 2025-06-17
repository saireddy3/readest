/**
 * Stub translation function
 * @param {string} key - Translation key
 * @returns {string} The key itself
 */
export const stubTranslation = (key) => key;

/**
 * Get user's locale
 * @returns {string} User's locale
 */
export const getUserLocale = () => {
  if (typeof window === 'undefined') return 'en';
  return window.navigator.language || 'en';
};

/**
 * Get user's language code
 * @returns {string} User's language code
 */
export const getUserLang = () => {
  return getUserLocale().split('-')[0];
};

/**
 * Check if current environment is CJK (Chinese, Japanese, Korean)
 * @returns {boolean} True if CJK environment
 */
export const isCJKEnv = () => {
  const lang = getUserLang();
  return ['zh', 'ja', 'ko'].includes(lang);
};

/**
 * Check if a URL is valid
 * @param {string} url - URL to check
 * @returns {boolean} True if valid URL
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if a URI is a content URI
 * @param {string} uri - URI to check
 * @returns {boolean} True if content URI
 */
export const isContentURI = (uri) => {
  return uri?.startsWith('content://');
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const uniqueId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Make a filename safe for filesystem
 * @param {string} filename - Original filename
 * @returns {string} Safe filename
 */
export const makeSafeFilename = (filename) => {
  return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};

/**
 * Get MD5 hash of content
 * @param {string} content - Content to hash
 * @returns {string} MD5 hash
 */
export const getContentMd5 = (content) => {
  // Simple hash function for demo
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) - hash) + content.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

/**
 * Generate a random MD5-like hash
 * @returns {string} Random hash
 */
export const randomMd5 = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Get the current OS platform
 * @returns {'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'unknown'} The OS platform
 */
export const getOSPlatform = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();

  if (userAgent.includes('windows')) return 'windows';
  if (userAgent.includes('macintosh') || userAgent.includes('darwin')) return 'macos';
  if (userAgent.includes('linux')) return 'linux';
  if (userAgent.includes('android')) return 'android';
  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) return 'ios';
  
  // Fallback to platform check
  if (platform.startsWith('win')) return 'windows';
  if (platform.startsWith('mac')) return 'macos';
  if (platform.startsWith('linux')) return 'linux';
  
  return 'unknown';
};