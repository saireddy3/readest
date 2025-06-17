/**
 * Check if a language code represents a right-to-left language
 * @param {string} langCode - The language code to check
 * @returns {boolean} True if the language is RTL
 */
export const isRTL = (langCode) => {
  const rtlLangs = ['ar', 'fa', 'he', 'ur'];
  return rtlLangs.includes(langCode);
};

/**
 * Get the text direction for a given language code
 * @param {string} langCode - The language code
 * @returns {'rtl' | 'ltr'} The text direction
 */
export const getDirFromLanguage = (langCode) => {
  return isRTL(langCode) ? 'rtl' : 'ltr';
};

/**
 * Get the text direction for the UI language
 * @returns {'rtl' | 'ltr'} The text direction
 */
export const getDirFromUILanguage = () => {
  if (typeof window === 'undefined') return 'ltr';
  const uiLang = document.documentElement.lang || navigator.language || 'en';
  return getDirFromLanguage(uiLang.split('-')[0]);
}; 