/**
 * Convert a file path to a usable URL
 * @param {string} filePath - File path to convert
 * @returns {string} Usable URL
 */
export const convertFileSrc = (filePath) => {
  if (filePath.startsWith('blob:') || filePath.startsWith('data:') || filePath.startsWith('http')) {
    return filePath;
  }
  
  // For web, we can't directly access the file system paths
  // Return a placeholder or error indicator
  console.warn('Direct file path access is not supported in web environments');
  return filePath;
};

/**
 * Open a file dialog for selecting files
 * @param {Object} options - Dialog options
 * @param {boolean} [options.multiple] - Allow multiple file selection
 * @param {boolean} [options.directory] - Allow directory selection
 * @param {Array<{name: string, extensions: string[]}>} [options.filters] - File type filters
 * @returns {Promise<string[]|null>} Selected file paths or null
 */
export const openFileDialog = async (options) => {
  try {
    // Check if File System Access API is available
    if ('showOpenFilePicker' in window) {
      const pickerOpts = {
        multiple: options.multiple || false,
      };
      
      if (options.filters && options.filters.length > 0) {
        pickerOpts.types = options.filters.map(filter => ({
          description: filter.name,
          accept: {
            'application/octet-stream': filter.extensions.map(ext => `.${ext}`)
          }
        }));
      }
      
      if (options.directory) {
        const dirHandle = await window.showDirectoryPicker();
        return [dirHandle.name]; // Return directory name as a fallback
      } else {
        const fileHandles = await window.showOpenFilePicker(pickerOpts);
        const files = await Promise.all(fileHandles.map(async (handle) => {
          const file = await handle.getFile();
          return URL.createObjectURL(file);
        }));
        return files;
      }
    } else {
      // Fallback for browsers without File System Access API
      console.warn('File System Access API not available');
      const input = document.createElement('input');
      input.type = 'file';
      
      if (options.multiple) {
        input.multiple = true;
      }
      
      if (options.filters && options.filters.length > 0) {
        input.accept = options.filters
          .flatMap(filter => filter.extensions.map(ext => `.${ext}`))
          .join(',');
      }
      
      return new Promise((resolve) => {
        input.onchange = () => {
          if (!input.files || input.files.length === 0) {
            resolve(null);
            return;
          }
          
          const files = Array.from(input.files).map(file => URL.createObjectURL(file));
          resolve(files);
        };
        
        input.click();
      });
    }
  } catch (error) {
    console.error('Error opening file dialog:', error);
    return null;
  }
};

/**
 * Get app data directory (no direct web equivalent)
 * @returns {Promise<string>} App data directory path
 */
export const getAppDataDir = async () => {
  // Web apps don't have direct access to system directories
  // Return a placeholder value
  return '/app-data';
};

/**
 * Get app cache directory (no direct web equivalent)
 * @returns {Promise<string>} App cache directory path
 */
export const getAppCacheDir = async () => {
  // Web apps don't have direct access to system directories
  // Return a placeholder value
  return '/app-cache';
};

/**
 * Read a file (using fetch for web)
 * @param {string} path - File path to read
 * @param {'text'|'binary'} [mode='text'] - Read mode
 * @returns {Promise<string|ArrayBuffer|null>} File contents or null
 */
export const readFile = async (path, mode = 'text') => {
  try {
    // Handle blob URLs and relative paths
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`Failed to read file: ${response.statusText}`);
    }
    
    return mode === 'text' ? await response.text() : await response.arrayBuffer();
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
};

/**
 * Check if a file exists (limited web support)
 * @param {string} path - File path to check
 * @returns {Promise<boolean>} Whether file exists
 */
export const fileExists = async (path) => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}; 