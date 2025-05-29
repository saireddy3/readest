/**
 * @typedef {'books'|'configs'|'notes'} SyncType
 * @typedef {'push'|'pull'|'both'} SyncOp
 */

/**
 * @typedef {Object} BookRecord
 * @property {string} user_id
 * @property {string} book_hash
 * @property {string} title
 * @property {string} author
 * @property {string} [cover]
 * @property {string} [description]
 * @property {string} [language]
 * @property {string} [publisher]
 * @property {string} [published]
 * @property {string} [identifier]
 * @property {string[]} [subject]
 * @property {string} [format]
 * @property {string} [path]
 * @property {number} [size]
 * @property {number} [progress]
 * @property {number} [updatedAt]
 * @property {number} [createdAt]
 */

/**
 * @typedef {Object} BookConfigRecord
 * @property {string} user_id
 * @property {string} book_hash
 * @property {Object} [viewSettings]
 * @property {number} [progress]
 * @property {string} [location]
 * @property {number} [updatedAt]
 * @property {number} [createdAt]
 */

/**
 * @typedef {Object} BookNoteRecord
 * @property {string} user_id
 * @property {string} book_hash
 * @property {string} id
 * @property {string} type
 * @property {string} cfi
 * @property {string} [text]
 * @property {string} [note]
 * @property {string} [color]
 * @property {number} [updatedAt]
 * @property {number} [createdAt]
 */

/**
 * @typedef {Object} SyncResult
 * @property {Array|null} books
 * @property {Array|null} notes
 * @property {Array|null} configs
 */

/**
 * @typedef {Object} SyncData
 * @property {Array} [books]
 * @property {Array} [notes]
 * @property {Array} [configs]
 */

export class SyncClient {
  /**
   * Pull incremental changes since a given timestamp (in ms).
   * Returns empty result as authentication is removed.
   * @param {number} since - Timestamp in milliseconds
   * @param {string} [type] - Type of data to sync
   * @param {string} [book] - Book hash to sync
   */
  async pullChanges(since, type, book) {
    console.log(`Sync pullChanges skipped (no auth) - since: ${since}, type: ${type}, book: ${book}`);
    const result = {
      books: null,
      notes: null,
      configs: null
    };
    
    if (type === 'books') result.books = [];
    if (type === 'notes') result.notes = [];
    if (type === 'configs') result.configs = [];
    
    return result;
  }

  /**
   * Push local changes to the server.
   * No-op as authentication is removed.
   * @param {Object} payload - Data to push
   */
  async pushChanges(payload) {
    console.log('Sync pushChanges skipped (no auth) - payload:', payload);
    const result = {
      books: null,
      notes: null,
      configs: null
    };
    
    if (payload.books) result.books = [];
    if (payload.notes) result.notes = [];
    if (payload.configs) result.configs = [];
    
    return result;
  }
} 