import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLibraryStore } from '@/store/libraryStore';
import { navigateToLibrary } from '@/utils/nav';

// Define window.OPEN_WITH_FILES for TypeScript
declare global {
  interface Window {
    OPEN_WITH_FILES?: string[];
  }
}

export function useOpenWithBooks() {
  const router = useRouter();
  const { setCheckOpenWithBooks } = useLibraryStore();
  
  const handleOpenWithFileUrl = (url: string) => {
    console.log('Handle Open with URL:', url);
    let filePath = url;
    if (filePath.startsWith('file://')) {
      filePath = decodeURI(filePath.replace('file://', ''));
    }
    if (!/^(https?:|data:|blob:)/i.test(filePath)) {
      window.OPEN_WITH_FILES = [filePath];
      setCheckOpenWithBooks(true);
      navigateToLibrary(router, `reload=${Date.now()}`);
    }
  };

  // In web environment, we can implement file opening via registerProtocolHandler
  // or using the File System Access API when available
  useEffect(() => {
    // For the web, we could use the Web Share Target API or File System Access API
    // But this is currently not fully supported across browsers
    // This is a placeholder for future implementation
    
    // One option would be to handle files dropped on the page
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const files = Array.from(event.dataTransfer.files);
        window.OPEN_WITH_FILES = files.map(file => URL.createObjectURL(file));
        setCheckOpenWithBooks(true);
        navigateToLibrary(router, `reload=${Date.now()}`);
      }
    };

    // We're not adding any event listeners here because the drop handling 
    // is already implemented in the library page
    
    return () => {
      // Cleanup if needed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
