// Web-based implementation of file transfer utilities

/**
 * @typedef {Object} ProgressPayload
 * @property {number} progress - Current progress in bytes
 * @property {number} total - Total size in bytes
 * @property {number} transferSpeed - Transfer speed in bytes per second
 */

/**
 * Upload a file using XMLHttpRequest
 * @param {File} file - File to upload
 * @param {string} uploadUrl - URL to upload to
 * @param {function(ProgressPayload): void} [onProgress] - Progress callback
 * @returns {Promise<void>}
 */
export const webUpload = (file, uploadUrl, onProgress) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress({
          progress: event.loaded,
          total: event.total,
          transferSpeed: event.loaded / ((Date.now() - startTime) / 1000),
        });
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Upload failed'));

    xhr.send(file);
  });
};

/**
 * Download a file with progress tracking
 * @param {string} downloadUrl - URL to download from
 * @param {function(ProgressPayload): void} [onProgress] - Progress callback
 * @returns {Promise<Blob>} Downloaded file as Blob
 */
export const webDownload = async (downloadUrl, onProgress) => {
  const response = await fetch(downloadUrl);
  if (!response.ok) throw new Error('File download failed');

  const contentLength = response.headers.get('Content-Length');
  if (!contentLength) throw new Error('Cannot track progress: Content-Length missing');

  const totalSize = parseInt(contentLength, 10);
  let receivedSize = 0;
  const reader = response.body.getReader();
  const chunks = [];

  const startTime = Date.now();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
    receivedSize += value.length;

    if (onProgress) {
      onProgress({
        progress: receivedSize,
        total: totalSize,
        transferSpeed: receivedSize / ((Date.now() - startTime) / 1000),
      });
    }
  }

  return new Blob(chunks);
}; 