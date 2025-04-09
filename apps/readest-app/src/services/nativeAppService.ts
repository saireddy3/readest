import { Book } from '@/types/book';
import { FileSystem, BaseDir, AppPlatform } from '@/types/system';
import { isContentURI, isValidURL } from '@/utils/misc';
import { getCoverFilename, getFilename } from '@/utils/book';
import { WebFile, RemoteFile } from '@/utils/file';
import { BaseAppService } from './appService';
import { LOCAL_BOOKS_SUBDIR } from './constants';

declare global {
  interface Window {
    IS_ROUNDED?: boolean;
    showOpenFilePicker?: (options?: any) => Promise<any>;
    showDirectoryPicker?: (options?: any) => Promise<any>;
  }
}

// Helper for resolving file paths in the web environment
const resolvePath = (fp: string, base: BaseDir): { baseDir: number; base: BaseDir; fp: string } => {
  switch (base) {
    case 'Books':
      return { baseDir: 1, fp: `${LOCAL_BOOKS_SUBDIR}/${fp}`, base };
    case 'Settings':
      return { baseDir: 2, fp, base };
    case 'Data':
      return { baseDir: 3, fp, base };
    case 'Cache':
      return { baseDir: 4, fp, base };
    case 'Log':
      return { baseDir: 5, fp, base };
    case 'None':
      return { baseDir: 0, fp, base };
    default:
      return { baseDir: 0, fp, base };
  }
};

// Implement file system operations for web environment
export const webFileSystem: FileSystem = {
  getURL(path: string) {
    return isValidURL(path) ? path : path; // In web, paths are already URLs or blob URLs
  },
  
  async getBlobURL(path: string, base: BaseDir) {
    if (isValidURL(path)) {
      return path; // If it's already a URL, return it
    }
    
    // For files stored in IndexedDB or other web storage, we would retrieve and convert to blob
    const response = await fetch(path);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },
  
  async openFile(path: string, base: BaseDir, name?: string) {
    const { fp } = resolvePath(path, base);
    const fname = name || getFilename(fp);
    
    if (isValidURL(path)) {
      return await new RemoteFile(path, name).open() as unknown as File;
    }
    
    // In a web environment, we can't directly open a file from the filesystem
    // This would only work for files selected by the user via file input
    throw new Error('Direct file access not supported in web environment');
  },
  
  async copyFile(srcPath: string, dstPath: string, base: BaseDir) {
    console.warn('File copying between paths is limited in web environment');
    
    // In a web environment, we can copy blobs between storage locations
    // but not directly access the file system outside of the sandbox
    if (isValidURL(srcPath)) {
      const response = await fetch(srcPath);
      const blob = await response.blob();
      // Here we would save the blob to some web storage (localStorage, IndexedDB, etc.)
      console.log(`Would save ${dstPath} to web storage`);
    } else {
      throw new Error('Source file cannot be accessed in web environment');
    }
  },
  
  async readFile(path: string, base: BaseDir, mode: 'text' | 'binary') {
    // In web environment, we would retrieve from web storage or fetch from URL
    if (isValidURL(path)) {
      const response = await fetch(path);
      return mode === 'text' ? await response.text() : await response.arrayBuffer();
    }
    
    // For data stored in web storage (localStorage, IndexedDB, etc.)
    throw new Error('File reading from local storage not implemented for web');
  },
  
  async writeFile(path: string, base: BaseDir, content: string | ArrayBuffer | File) {
    console.warn('File writing is limited in web environment');
    
    // In web environment, we would save to IndexedDB or other web storage
    // This is a stub implementation
    console.log(`Would write to ${path} in ${base} storage`);
    return;
  },
  
  async removeFile(path: string, base: BaseDir) {
    console.warn('File removal is limited in web environment');
    
    // In web environment, we would remove from IndexedDB or other web storage
    console.log(`Would remove ${path} from ${base} storage`);
    return;
  },
  
  async createDir(path: string, base: BaseDir, recursive = false) {
    console.warn('Directory creation is limited in web environment');
    
    // Web doesn't have traditional directories
    // We might implement virtual directories in web storage
    console.log(`Would create directory ${path} in ${base} storage`);
    return;
  },
  
  async removeDir(path: string, base: BaseDir, recursive = false) {
    console.warn('Directory removal is limited in web environment');
    
    // Similar to createDir, this would remove virtual directories
    console.log(`Would remove directory ${path} from ${base} storage`);
    return;
  },
  
  async readDir(path: string, base: BaseDir) {
    console.warn('Directory listing is limited in web environment');
    
    // We would list virtual directories from web storage
    return [];
  },
  
  async exists(path: string, base: BaseDir) {
    // Check if a file exists in web storage
    console.warn('File existence check is limited in web environment');
    return false;
  },
  
  getPrefix() {
    return '';
  }
};

// Web implementation of the app service
export class NativeAppService extends BaseAppService {
  fs = webFileSystem;
  appPlatform = 'web' as AppPlatform;
  isAppDataSandbox = true;
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  isAndroidApp = /Android/i.test(navigator.userAgent);
  isIOSApp = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  hasTrafficLight = false; // No traffic lights in web browsers
  hasWindow = true;
  hasWindowBar = false; // No window bar in browsers
  hasContextMenu = false; // Limited context menu support in browsers
  hasRoundedWindow = false;
  hasSafeAreaInset = this.isMobile;
  hasHaptics = 'vibrate' in navigator;
  hasSysFontsList = true;

  override resolvePath(fp: string, base: BaseDir) {
    return resolvePath(fp, base);
  }

  async getInitBooksDir(): Promise<string> {
    return LOCAL_BOOKS_SUBDIR;
  }

  async getCacheDir(): Promise<string> {
    return 'cache';
  }

  async selectDirectory(): Promise<string> {
    // Use the modern File System Access API if available
    if (window.showDirectoryPicker) {
      try {
        const dirHandle = await window.showDirectoryPicker();
        return dirHandle.name;
      } catch (e) {
        console.error('Directory selection error:', e);
        throw new Error('User cancelled directory selection');
      }
    }
    
    throw new Error('Directory selection not supported in this browser');
  }

  async selectFiles(name: string, extensions: string[]): Promise<string[]> {
    // Use the modern File System Access API if available
    if (window.showOpenFilePicker) {
      try {
        const fileHandles = await window.showOpenFilePicker({
          multiple: true,
          types: [
            {
              description: name,
              accept: {
                'application/octet-stream': extensions.map(ext => `.${ext}`)
              }
            }
          ]
        });
        
        // Create object URLs for the selected files
        const files = await Promise.all(fileHandles.map(handle => handle.getFile()));
        return files.map(file => URL.createObjectURL(file));
      } catch (e) {
        console.error('File selection error:', e);
        if (e instanceof Error && e.name !== 'AbortError') {
          throw e;
        }
        return [];
      }
    }
    
    // Fallback to traditional file input (would need to be shown to user)
    throw new Error('Please use a file input element for this browser');
  }

  getCoverImageUrl = (book: Book): string => {
    return book.coverPath || '';
  };

  getCoverImageBlobUrl = async (book: Book): Promise<string> => {
    if (book.coverPath) {
      return book.coverPath;
    }
    return '';
  };
}
