/**
 * @typedef {Object} TTSMark
 * @property {number} offset - Character offset in text
 * @property {string} name - Mark name
 * @property {string} text - Text content
 */

/**
 * Transform book config to database format
 * @param {unknown} bookConfig - Book configuration to transform
 * @param {string} userId - User ID
 * @returns {import('@/types/records').DBBookConfig} Database book config
 */
export const transformBookConfigToDB = (bookConfig, userId) => {
  const { bookHash, progress, location, searchConfig, viewSettings, updatedAt } = bookConfig;

  return {
    user_id: userId,
    book_hash: bookHash,
    location: location,
    progress: progress && JSON.stringify(progress),
    search_config: searchConfig && JSON.stringify(searchConfig),
    view_settings: viewSettings && JSON.stringify(viewSettings),
    updated_at: new Date(updatedAt ?? Date.now()).toISOString(),
  };
};

/**
 * Transform database book config to application format
 * @param {import('@/types/records').DBBookConfig} dbBookConfig - Database book config
 * @returns {import('@/types/book').BookConfig} Application book config
 */
export const transformBookConfigFromDB = (dbBookConfig) => {
  const { book_hash, progress, location, search_config, view_settings, updated_at } = dbBookConfig;
  return {
    bookHash: book_hash,
    location,
    progress: progress && JSON.parse(progress),
    searchConfig: search_config && JSON.parse(search_config),
    viewSettings: view_settings && JSON.parse(view_settings),
    updatedAt: new Date(updated_at).getTime(),
  };
};

/**
 * Transform book to database format
 * @param {unknown} book - Book to transform
 * @param {string} userId - User ID
 * @returns {import('@/types/records').DBBook} Database book
 */
export const transformBookToDB = (book, userId) => {
  const {
    hash,
    format,
    title,
    author,
    groupId,
    groupName,
    tags,
    progress,
    createdAt,
    updatedAt,
    deletedAt,
    uploadedAt,
  } = book;

  return {
    user_id: userId,
    book_hash: hash,
    format,
    title,
    author,
    group_id: groupId,
    group_name: groupName,
    tags: tags,
    progress: progress,
    created_at: new Date(createdAt ?? Date.now()).toISOString(),
    updated_at: new Date(updatedAt ?? Date.now()).toISOString(),
    deleted_at: deletedAt ? new Date(deletedAt).toISOString() : null,
    uploaded_at: uploadedAt ? new Date(uploadedAt).toISOString() : null,
  };
};

/**
 * Transform database book to application format
 * @param {import('@/types/records').DBBook} dbBook - Database book
 * @returns {import('@/types/book').Book} Application book
 */
export const transformBookFromDB = (dbBook) => {
  const {
    book_hash,
    format,
    title,
    author,
    group_id,
    group_name,
    tags,
    progress,
    created_at,
    updated_at,
    deleted_at,
    uploaded_at,
  } = dbBook;

  return {
    hash: book_hash,
    format,
    title,
    author,
    groupId: group_id,
    groupName: group_name,
    tags: tags,
    progress: progress,
    createdAt: new Date(created_at).getTime(),
    updatedAt: new Date(updated_at).getTime(),
    deletedAt: deleted_at ? new Date(deleted_at).getTime() : null,
    uploadedAt: uploaded_at ? new Date(uploaded_at).getTime() : null,
  };
};

/**
 * Transform book note to database format
 * @param {unknown} bookNote - Book note to transform
 * @param {string} userId - User ID
 * @returns {import('@/types/records').DBBookNote} Database book note
 */
export const transformBookNoteToDB = (bookNote, userId) => {
  const { bookHash, id, type, cfi, text, style, color, note, createdAt, updatedAt, deletedAt } = bookNote;

  return {
    user_id: userId,
    book_hash: bookHash,
    id,
    type,
    cfi,
    text,
    style,
    color,
    note,
    created_at: new Date(createdAt ?? Date.now()).toISOString(),
    updated_at: new Date(updatedAt ?? Date.now()).toISOString(),
    // note that only null deleted_at is updated to the database, undefined is not
    deleted_at: deletedAt ? new Date(deletedAt).toISOString() : null,
  };
};

/**
 * Transform database book note to application format
 * @param {import('@/types/records').DBBookNote} dbBookNote - Database book note
 * @returns {import('@/types/book').BookNote} Application book note
 */
export const transformBookNoteFromDB = (dbBookNote) => {
  const { book_hash, id, type, cfi, text, style, color, note, created_at, updated_at, deleted_at } = dbBookNote;

  return {
    bookHash: book_hash,
    id,
    type,
    cfi,
    text,
    style,
    color,
    note,
    createdAt: new Date(created_at).getTime(),
    updatedAt: new Date(updated_at).getTime(),
    deletedAt: deleted_at ? new Date(deleted_at).getTime() : null,
  };
}; 