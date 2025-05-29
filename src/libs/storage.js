/**
 * Creates a progress handler for tracking file transfer progress
 * @param {number} totalFiles - Total number of files to process
 * @param {{count: number}} completedFilesRef - Reference to track completed files
 * @param {function({progress: number, total: number, transferSpeed: number}): void} [onProgress] - Optional progress callback
 * @returns {function({progress: number, total: number, transferSpeed: number}): void} Progress handler function
 */
export const createProgressHandler = (
  totalFiles,
  completedFilesRef,
  onProgress,
) => {
  return (progress) => {
    const fileProgress = progress.progress / progress.total;
    const overallProgress = ((completedFilesRef.count + fileProgress) / totalFiles) * 100;

    if (onProgress) {
      onProgress({
        progress: overallProgress,
        total: 100,
        transferSpeed: progress.transferSpeed,
      });
    }
  };
};

/**
 * Uploads a file (stub for web mode)
 * @param {File} file - File to upload
 * @param {function({progress: number, total: number, transferSpeed: number}): void} [onProgress] - Optional progress callback
 * @returns {Promise<void>}
 */
export const uploadFile = async (file, onProgress) => {
  // No remote upload needed in web mode
  console.log('File upload skipped in web mode:', file.name);
  if (onProgress) {
    onProgress({ progress: 100, total: 100, transferSpeed: 0 });
  }
  return;
};

/**
 * Downloads a file (stub for web mode)
 * @param {string} filePath - Path of file to download
 * @param {function({progress: number, total: number, transferSpeed: number}): void} [onProgress] - Optional progress callback
 * @returns {Promise<void>}
 * @throws {Error} Always throws in web mode
 */
export const downloadFile = async (filePath, onProgress) => {
  // No remote download needed in web mode
  console.log('File download skipped in web mode:', filePath);
  if (onProgress) {
    onProgress({ progress: 100, total: 100, transferSpeed: 0 });
  }
  throw new Error('File download skipped in web mode');
};

/**
 * Deletes a file (stub for web mode)
 * @param {string} filePath - Path of file to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (filePath) => {
  // No remote deletion needed in web mode
  console.log('File deletion skipped in web mode:', filePath);
  return;
}; 