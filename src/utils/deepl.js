/**
 * @typedef {Object} TranslationResult
 * @property {string} text - Translated text
 * @property {string} detectedSourceLang - Detected source language
 */

/**
 * @typedef {Object} TranslationResponse
 * @property {TranslationResult[]} translations - Array of translation results
 */

/**
 * Translate text using DeepL API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @param {string} [sourceLang] - Source language code
 * @returns {Promise<TranslationResult>} Translation result
 */
export const translate = async (text, targetLang, sourceLang) => {
  const response = await fetch('/api/deepl/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      target_lang: targetLang,
      source_lang: sourceLang,
    }),
  });

  if (!response.ok) {
    throw new Error('Translation failed');
  }

  const data = await response.json();
  return data.translations[0];
};

/**
 * Get supported languages from DeepL API
 * @returns {Promise<Object[]>} Array of supported languages
 */
export const getSupportedLanguages = async () => {
  const response = await fetch('https://api-free.deepl.com/v2/languages', {
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get supported languages');
  }

  return response.json();
}; 