// Export interfaces as JSDoc comments for documentation
/**
 * @typedef {Object} DBBook
 * @property {string} user_id
 * @property {string} book_hash
 * @property {string} format
 * @property {string} title
 * @property {string} author
 * @property {string} [group_id]
 * @property {string} [group_name]
 * @property {string[]} [tags]
 * @property {[number, number]} [progress]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 * @property {string|null} [deleted_at]
 * @property {string|null} [uploaded_at]
 */

/**
 * @typedef {Object} DBBookConfig
 * @property {string} user_id
 * @property {string} book_hash
 * @property {string} [location]
 * @property {string} [progress]
 * @property {string} [search_config]
 * @property {string} [view_settings]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 * @property {string|null} [deleted_at]
 */

/**
 * @typedef {Object} DBBookNote
 * @property {string} user_id
 * @property {string} book_hash
 * @property {string} id
 * @property {string} type
 * @property {string} cfi
 * @property {string} [text]
 * @property {string} [style]
 * @property {string} [color]
 * @property {string} note
 * @property {string} [created_at]
 * @property {string} [updated_at]
 * @property {string|null} [deleted_at]
 */ 