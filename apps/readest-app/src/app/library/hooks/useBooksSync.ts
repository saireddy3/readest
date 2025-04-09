import { useEffect, useRef } from 'react';
import { useEnv } from '@/context/EnvContext';
import { useLibraryStore } from '@/store/libraryStore';
import { Book } from '@/types/book';

export interface UseBooksSyncProps {
  onSyncStart?: () => void;
  onSyncEnd?: () => void;
}

export const useBooksSync = ({ onSyncStart, onSyncEnd }: UseBooksSyncProps) => {
  const { appService } = useEnv();
  const { library, setLibrary } = useLibraryStore();
  const syncBooksPullingRef = useRef(false);

  const pullLibrary = async () => {
    // Simply pull local library, no remote sync
    if (appService) {
      onSyncStart?.();
      const localBooks = await appService.loadLibraryBooks();
      setLibrary(localBooks);
      onSyncEnd?.();
    }
  };

  const pushLibrary = async () => {
    // Simply save local library, no remote sync
    if (appService) {
      onSyncStart?.();
      appService.saveLibraryBooks(library);
      onSyncEnd?.();
    }
  };

  useEffect(() => {
    if (syncBooksPullingRef.current) return;
    syncBooksPullingRef.current = true;

    pullLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { pullLibrary, pushLibrary };
};
