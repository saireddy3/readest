import { r2Storage } from './r2';

/**
 * Get a signed URL for downloading a file
 * @param {string} fileKey - The key of the file to download
 * @param {number} expiresIn - The expiration time in seconds
 * @returns {Promise<string>} The signed URL
 */
export const getDownloadSignedUrl = async (fileKey, expiresIn) => {
  const bucketName = process.env['R2_BUCKET_NAME'] || '';
  return await r2Storage.getDownloadSignedUrl(bucketName, fileKey, expiresIn);
};

/**
 * Get a signed URL for uploading a file
 * @param {string} fileKey - The key of the file to upload
 * @param {number} contentLength - The length of the content in bytes
 * @param {number} expiresIn - The expiration time in seconds
 * @returns {Promise<string>} The signed URL
 */
export const getUploadSignedUrl = async (fileKey, contentLength, expiresIn) => {
  const bucketName = process.env['R2_BUCKET_NAME'] || '';
  return await r2Storage.getUploadSignedUrl(bucketName, fileKey, contentLength, expiresIn);
};

/**
 * Delete an object from storage
 * @param {string} fileKey - The key of the file to delete
 * @returns {Promise<Response>} The deletion response
 */
export const deleteObject = async (fileKey) => {
  const bucketName = process.env['R2_BUCKET_NAME'] || '';
  return await r2Storage.deleteObject(bucketName, fileKey);
}; 