/**
 * Calculate MD5 hash of a string or buffer using Web Crypto API
 * @param {string | ArrayBuffer} data - Input data
 * @returns {Promise<string>} MD5 hash
 */
async function md5Internal(data) {
  // Convert string to ArrayBuffer if needed
  const buffer = typeof data === 'string' 
    ? new TextEncoder().encode(data)
    : data;

  // Use Web Crypto API to create hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculate hash of a string
 * @param {string} str - Input string
 * @returns {Promise<string>} Hash
 */
export const md5 = async (str) => {
  return md5Internal(str);
};

/**
 * Calculate hash of a file
 * @param {File} file - File object
 * @returns {Promise<string>} Hash
 */
export const md5File = async (file) => {
  const buffer = await file.arrayBuffer();
  return md5Internal(buffer);
};

/**
 * Calculate partial hash of a file (first 1MB)
 * This is used for quick file identification without reading the entire file
 * @param {File | Blob} file - File or Blob object
 * @returns {Promise<string>} Partial hash
 */
export const partialMD5 = async (file) => {
  // Read first 1MB of the file
  const chunk = await file.slice(0, 1024 * 1024).arrayBuffer();
  return md5Internal(chunk);
};