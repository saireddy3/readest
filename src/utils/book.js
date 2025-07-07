import { EXTS } from '../libs/document';
import { getUserLang, isContentURI, isValidURL, makeSafeFilename } from './misc.js';
import { getDirFromLanguage } from './rtl.js';

/**
 * @param {import('../types/book').Book} book
 * @returns {string}
 */
export const getDir = (book) => {
  return `${book.hash}`;
};

/**
 * @returns {string}
 */
export const getLibraryFilename = () => {
  return 'library.json';
};

/**
 * @param {import('../types/book').Book} book
 * @returns {string}
 */
export const getRemoteBookFilename = (book) => {
  return `${book.hash}/${makeSafeFilename(book.title)}.${EXTS[book.format]}`;
};

/**
 * @param {import('../types/book').Book} book
 * @returns {string}
 */
export const getLocalBookFilename = (book) => {
  return `${book.hash}/${makeSafeFilename(book.title)}.${EXTS[book.format]}`;
};

/**
 * @param {import('../types/book').Book} book
 * @returns {string}
 */
export const getCoverFilename = (book) => {
  return `${book.hash}/cover.png`;
};

/**
 * @param {import('../types/book').Book} book
 * @returns {string}
 */
export const getConfigFilename = (book) => {
  return `${book.hash}/config.json`;
};

/**
 * @param {string} filename
 * @returns {boolean}
 */
export const isBookFile = (filename) => {
  return Object.values(EXTS).includes(filename.split('.').pop());
};

/**
 * @param {string} fileOrUri
 * @returns {string}
 */
export const getFilename = (fileOrUri) => {
  if (isValidURL(fileOrUri) || isContentURI(fileOrUri)) {
    fileOrUri = decodeURI(fileOrUri);
  }
  const normalizedPath = fileOrUri.replace(/\\/g, '/');
  const parts = normalizedPath.split('/');
  const lastPart = parts.pop();
  return lastPart.split('?')[0];
};

/**
 * @param {string} filename
 * @returns {string}
 */
export const getBaseFilename = (filename) => {
  const normalizedPath = filename.replace(/\\/g, '/');
  const baseName = normalizedPath.split('/').pop()?.split('.').slice(0, -1).join('.') || '';
  return baseName;
};

/** @type {import('../types/book').BookConfig} */
export const INIT_BOOK_CONFIG = {
  updatedAt: 0,
};

/**
 * @typedef {Object.<string, string>} LanguageMap
 */

/**
 * @typedef {Object} Contributor
 * @property {LanguageMap} name
 */

/**
 * @param {string | LanguageMap} x
 * @returns {string}
 */
const formatLanguageMap = (x) => {
  const userLang = getUserLang();
  if (!x) return '';
  if (typeof x === 'string') return x;
  const keys = Object.keys(x);
  return x[userLang] || x[keys[0]];
};

/**
 * @param {boolean} [narrow=false]
 * @param {string} [lang='']
 * @returns {Intl.ListFormat}
 */
export const listFormater = (narrow = false, lang = '') => {
  lang = lang ? lang : getUserLang();
  if (narrow) {
    return new Intl.ListFormat('en', { style: 'narrow', type: 'unit' });
  } else {
    return new Intl.ListFormat(lang, { style: 'long', type: 'conjunction' });
  }
};

/**
 * @param {string | string[] | undefined} lang
 * @returns {string}
 */
export const getBookLangCode = (lang) => {
  try {
    const bookLang = typeof lang === 'string' ? lang : lang?.[0];
    return bookLang ? bookLang.split('-')[0] : '';
  } catch {
    return '';
  }
};

/**
 * @param {string | Contributor | [string | Contributor]} contributors
 * @param {string | string[] | undefined} bookLang
 * @returns {string}
 */
export const formatAuthors = (contributors, bookLang) => {
  const langCode = getBookLangCode(bookLang) || 'en';
  return Array.isArray(contributors)
    ? listFormater(langCode === 'zh', langCode).format(
        contributors.map((contributor) =>
          typeof contributor === 'string' ? contributor : formatLanguageMap(contributor?.name),
        ),
      )
    : typeof contributors === 'string'
      ? contributors
      : formatLanguageMap(contributors?.name);
};

/**
 * @param {string | LanguageMap} title
 * @returns {string}
 */
export const formatTitle = (title) => {
  return typeof title === 'string' ? title : formatLanguageMap(title);
};

/**
 * @param {string | LanguageMap} publisher
 * @returns {string}
 */
export const formatPublisher = (publisher) => {
  return typeof publisher === 'string' ? publisher : formatLanguageMap(publisher);
};

/**
 * @param {string | string[] | undefined} lang
 * @returns {string | undefined}
 */
export const formatLanguage = (lang) => {
  return Array.isArray(lang) ? lang.join(', ') : lang;
};

/**
 * @param {string | string[] | undefined} lang
 * @returns {string | undefined}
 */
export const primaryLanguage = (lang) => {
  return Array.isArray(lang) ? lang[0] : lang;
};

/**
 * @param {string | number | Date | undefined} date
 * @returns {string | undefined}
 */
export const formatDate = (date) => {
  if (!date) return;
  const userLang = getUserLang();
  try {
    return new Date(date).toLocaleDateString(userLang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return;
  }
};

/**
 * @param {string | string[] | undefined} subject
 * @returns {string}
 */
export const formatSubject = (subject) => {
  if (!subject) return '';
  return Array.isArray(subject) ? subject.join(', ') : subject;
};

/**
 * @param {import('../types/book').BookProgress} progress
 * @returns {number}
 */
export const getCurrentPage = (progress) => {
  const { section, pageinfo } = progress;
  return pageinfo
    ? pageinfo.current + 1
    : section
      ? section.current + 1
      : 0;
};

/**
 * @param {import('../types/book').WritingMode} writingMode
 * @returns {'ltr' | 'rtl' | 'auto'}
 */
export const getBookDirFromWritingMode = (writingMode) => {
  switch (writingMode) {
    case 'horizontal-tb':
      return 'ltr';
    case 'horizontal-rl':
    case 'vertical-rl':
      return 'rtl';
    default:
      return 'auto';
  }
};

/**
 * @param {string | string[] | undefined} language
 * @returns {string}
 */
export const getBookDirFromLanguage = (language) => {
  const lang = primaryLanguage(language) || '';
  return getDirFromLanguage(lang);
}; 