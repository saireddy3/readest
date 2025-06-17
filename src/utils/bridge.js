// Web-based implementation of bridge functions

/**
 * Copy a URI to a path
 * @param {Object} request - Copy URI request
 * @param {string} request.uri - Source URI
 * @param {string} request.dst - Destination path
 * @returns {Promise<Object>} Response object
 * @returns {boolean} .success - Whether the operation was successful
 * @returns {string} [.error] - Error message if operation failed
 */
export async function copyURIToPath(request) {
  console.warn(`copyURIToPath is not supported in web environment: ${request.uri} -> ${request.dst}`);
  return {
    success: false,
    error: 'This feature is not available in web browsers',
  };
}

/**
 * Enable or disable background audio
 * @param {Object} request - Background audio request
 * @param {boolean} request.enabled - Whether background audio should be enabled
 * @returns {Promise<void>}
 */
export async function invokeUseBackgroundAudio(request) {
  console.warn('useBackgroundAudio is not supported in web environment');
  // In a web environment, we can still attempt to keep audio playing in background
  if (request.enabled) {
    try {
      // This is a no-op in web - browsers handle background audio differently
      console.log('Background audio requested but not fully supported in web');
    } catch (error) {
      console.error('Error with background audio:', error);
    }
  }
} 