'use client';

import clsx from 'clsx';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEnv } from '@/context/EnvContext';
import { useSettingsStore } from '@/store/settingsStore';
import { useBookDataStore } from '@/store/bookDataStore';
import { useReaderStore } from '@/store/readerStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { Book } from '@/types/book';
import { SystemSettings } from '@/types/settings';
import { handleClose, handleOnCloseWindow } from '@/utils/webWindow';
import { uniqueId } from '@/utils/misc';
import { eventDispatcher } from '@/utils/event';
import { redirectToDirectReader } from '@/utils/nav';
import { BOOK_IDS_SEPARATOR } from '@/services/constants';

import useBooksManager from '../hooks/useBooksManager';
import useBookShortcuts from '../hooks/useBookShortcuts';
import BookDetailModal from '@/components/BookDetailModal';
import Spinner from '@/components/Spinner';
import SideBar from './sidebar/SideBar';
import Notebook from './notebook/Notebook';
import BooksGrid from './BooksGrid';
import TTSControl from './tts/TTSControl';

const ReaderContent: React.FC<{ ids?: string; settings: SystemSettings }> = ({ ids, settings }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { envConfig, appService } = useEnv();
  const { bookKeys, dismissBook, getNextBookKey } = useBooksManager();
  const { sideBarBookKey, setSideBarBookKey } = useSidebarStore();
  const { saveSettings } = useSettingsStore();
  const { getConfig, getBookData, saveConfig } = useBookDataStore();
  const { getView, setBookKeys } = useReaderStore();
  const { initViewState, getViewState, clearViewState } = useReaderStore();
  const [showDetailsBook, setShowDetailsBook] = useState<Book | null>(null);
  const isInitiating = useRef(false);
  const [loading, setLoading] = useState(false);

  useBookShortcuts({ sideBarBookKey, bookKeys });

  // Add an effect to reset initiation state when the ids change
  useEffect(() => {
    // Reset the initialization state when ids prop changes
    isInitiating.current = false;
  }, [ids]);

  useEffect(() => {
    if (isInitiating.current) return;
    isInitiating.current = true;

    const bookIds = ids || searchParams?.get('ids') || '';
    const initialIds = bookIds.split(BOOK_IDS_SEPARATOR).filter(Boolean);
    
    // If there are no IDs, don't proceed with setting empty book keys
    // The Reader component will handle loading a default book
    if (initialIds.length === 0) {
      console.log('No book IDs provided, skipping initialization');
      return;
    }
    
    const initialBookKeys = initialIds.map((id) => `${id}-${uniqueId()}`);
    console.log('Initialize books with keys:', initialBookKeys);
    setBookKeys(initialBookKeys);
    const uniqueIds = new Set<string>();
    
    initialBookKeys.forEach((key, index) => {
      const id = key.split('-')[0]!;
      const isPrimary = !uniqueIds.has(id);
      uniqueIds.add(id);
      if (!getViewState(key)) {
        initViewState(envConfig, id, key, isPrimary).catch((error) => {
          console.log('Error initializing book', key, error);
        });
        if (index === 0) setSideBarBookKey(key);
      }
    });

    const handleShowBookDetails = (event: CustomEvent) => {
      const book = event.detail as Book;
      setShowDetailsBook(book);
      return true;
    };
    eventDispatcher.onSync('show-book-details', handleShowBookDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, searchParams]);

  useEffect(() => {
    const unlisten = handleOnCloseWindow(handleCloseBooks);
    window.addEventListener('beforeunload', handleCloseBooks);
    eventDispatcher.on('quit-app', handleCloseBooks);
    return () => {
      unlisten();
      window.removeEventListener('beforeunload', handleCloseBooks);
      eventDispatcher.off('quit-app', handleCloseBooks);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookKeys]);

  const saveBookConfig = async (bookKey: string) => {
    const config = getConfig(bookKey);
    const { book } = getBookData(bookKey) || {};
    const { isPrimary } = getViewState(bookKey) || {};
    if (isPrimary && book && config) {
      eventDispatcher.dispatch('sync-book-progress', { bookKey });
      const settings = useSettingsStore.getState().settings;
      await saveConfig(envConfig, bookKey, config, settings);
    }
  };

  const saveConfigAndCloseBook = async (bookKey: string) => {
    console.log('Closing book', bookKey);
    try {
      getView(bookKey)?.close();
      getView(bookKey)?.remove();
    } catch {
      console.info('Error closing book', bookKey);
    }
    eventDispatcher.dispatch('tts-stop', { bookKey });
    await saveBookConfig(bookKey);
    clearViewState(bookKey);
  };

  const saveSettingsAndReload = () => {
    saveSettings(envConfig, settings);
    redirectToDirectReader();
  };

  const handleCloseBooks = async () => {
    const settings = useSettingsStore.getState().settings;
    await Promise.all(bookKeys.map((key) => saveConfigAndCloseBook(key)));
    await saveSettings(envConfig, settings);
  };

  const handleCloseBooksAndReload = () => {
    handleCloseBooks();
    redirectToDirectReader();
  };

  const handleCloseBook = async (bookKey: string) => {
    saveConfigAndCloseBook(bookKey);
    if (sideBarBookKey === bookKey) {
      setSideBarBookKey(getNextBookKey(sideBarBookKey));
    }
    dismissBook(bookKey);
    if (bookKeys.filter((key) => key !== bookKey).length == 0) {
      redirectToDirectReader();
    }
  };

  if (!bookKeys || bookKeys.length === 0) return null;
  const bookData = getBookData(bookKeys[0]!);
  if (!bookData || !bookData.book || !bookData.bookDoc) {
    setTimeout(() => setLoading(true), 300);
    return (
      loading && (
        <div className={clsx('hero hero-content', appService?.isIOSApp ? 'h-[100vh]' : 'h-dvh')}>
          <Spinner loading={true} />
        </div>
      )
    );
  }

  return (
    <div className={clsx('flex', appService?.isIOSApp ? 'h-[100vh]' : 'h-dvh')}>
      <SideBar onGoToLibrary={handleCloseBooksAndReload} />
      <BooksGrid bookKeys={bookKeys} onCloseBook={handleCloseBook} />
      <TTSControl />
      <Notebook />
      {showDetailsBook && (
        <BookDetailModal
          isOpen={!!showDetailsBook}
          book={showDetailsBook}
          onClose={() => setShowDetailsBook(null)}
        />
      )}
    </div>
  );
};

export default ReaderContent;
