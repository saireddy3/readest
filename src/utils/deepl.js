const API_URL = 'https://www2.deepl.com/jsonrpc';
const HEADERS = {
  'Content-Type': 'application/json',
};

const buildRequestData = (params) => {
  const getTimeStamp = () => {
    const ts = Date.now();
    const iCount = params.text.split('i').length;
    return iCount > 1 ? ts - (ts % iCount) + iCount : ts;
  };

  const postData = {
    jsonrpc: '2.0',
    method: 'LMT_handle_texts',
    id: Math.floor(Math.random() * 90000000) + 10000000,
    params: {
      texts: [{ text: params.text, requestAlternatives: 3 }],
      timestamp: getTimeStamp(),
      splitting: 'newlines',
      lang: {
        source_lang_user_selected: params.sourceLang.toUpperCase(),
        target_lang: params.targetLang.toUpperCase(),
      },
    },
  };

  let postStr = JSON.stringify(postData);

  if ((postData.id + 5) % 29 === 0 || (postData.id + 3) % 13 === 0) {
    postStr = postStr.replace('"method":"', '"method" : "');
  } else {
    postStr = postStr.replace('"method":"', '"method": "');
  }

  return postStr;
};

export const query = async (params) => {
  const response = await fetch(API_URL, {
    headers: HEADERS,
    method: 'POST',
    body: buildRequestData(params),
  });

  if (!response.ok) {
    throw new Error(
      response.status === 429 ? 'Too many requests, please try again later.' : 'Unknown error.',
    );
  }

  const { result } = await response.json();
  return {
    translations: [
      {
        detected_source_language: result?.lang || params?.sourceLang || 'auto',
        text: result?.texts?.[0]?.text || '',
      },
    ],
  };
};

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
  const result = await query({
    text,
    sourceLang: sourceLang || 'auto',
    targetLang,
  });
  return result.translations[0];
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