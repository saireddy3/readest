'use client';

import clsx from 'clsx';
import * as React from 'react';
import { useEffect, Suspense, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useEnv } from '@/context/EnvContext';
import { useTheme } from '@/hooks/useTheme';
import { useThemeStore } from '@/store/themeStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useScreenWakeLock } from '@/hooks/useScreenWakeLock';
import { AboutWindow } from '@/components/AboutWindow';
import { Toast } from '@/components/Toast';
import ReaderContent from './ReaderContent';
import { useSidebarStore } from '@/store/sidebarStore';
import Spinner from '@/components/Spinner';
import { Book } from '@/types/book';

const BOOK_URL = 'https://cdn.readest.com/books/the-great-gatsby.epub';

const Reader: React.FC<{ ids?: string }> = ({ ids }) => {
  const { envConfig, appService } = useEnv();
  const { settings, setSettings } = useSettingsStore();
  const { isSideBarVisible } = useSidebarStore();
  const isInitiating = useRef(false);
  const router = useRouter();
  const [loading, setLoading] = useState(!ids);
  const [error, setError] = useState<string | null>(null);
  const previousIds = useRef<string | undefined>(ids);

  const { updateAppTheme } = useThemeStore();
  useTheme();
  useScreenWakeLock(settings.screenWakeLock);

  // Reset isInitiating when ids changes
  useEffect(() => {
    if (ids !== previousIds.current) {
      console.log("IDs changed, resetting initiation state", previousIds.current, "->", ids);
      isInitiating.current = false;
      previousIds.current = ids;
      
      // Only set loading if we're going from having ids to not having ids
      if (!ids) {
        setLoading(true);
      }
    }
  }, [ids]);

  useEffect(() => {
    updateAppTheme('base-100');
    if (isInitiating.current) return;
    isInitiating.current = true;
    
    const initSettings = async () => {
      const appService = await envConfig.getAppService();
      const settings = await appService.loadSettings();
      setSettings(settings);
      
      // If no book ID is provided, load the default book
      if (!ids && appService) {
        try {
          console.log("Loading default book from URL:", BOOK_URL);
          
          // Fetch the file from URL
          const response = await fetch(BOOK_URL);
          if (!response.ok) {
            throw new Error(`Failed to fetch book: ${response.status} ${response.statusText}`);
          }
          
          const blob = await response.blob();
          console.log("Successfully fetched book content:", blob.size, "bytes");
          
          // Create a File object from the blob
          const filename = BOOK_URL.split('/').pop() || 'book.epub';
          const file = new File([blob], filename, { type: 'application/epub+zip' });
          
          // We need an empty books array to pass to importBook
          const emptyLibrary: Book[] = [];
          
          // Import the book using the File object
          const book = await appService.importBook(
            file,
            emptyLibrary,
            true,  // Save the book file locally
            true,  // Save the cover as well
            false  // don't overwrite
          );
          
          if (book) {
            // Manually ensure the URL property is set
            book.url = BOOK_URL;
            
            console.log("Book successfully imported:", book.hash);
            
            // Save the book to local storage
            await appService.saveLibraryBooks([book]);
            
            // Redirect to the reader with this book - use replace to avoid history issues
            router.replace(`/reader?ids=${book.hash}`);
          } else {
            throw new Error("Book import returned null");
          }
        } catch (err) {
          console.error("Error loading default book:", err);
          setError(`Error loading book: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          setLoading(false);
        }
      } else {
        // If we have IDs, we're not loading anymore
        setLoading(false);
      }
    };

    initSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  if (loading) {
    return (
      <div className="hero h-dvh bg-base-100">
        <div className="hero-content text-center">
          <div>
            <Spinner loading={true} />
            <div className="mt-4 text-base-content">Loading book from URL...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero h-dvh bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-error">Error</h1>
            <p className="py-4 text-base-content">{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    settings?.globalReadSettings && (
      <div
        className={clsx(
          `reader-page bg-base-100 text-base-content select-none`,
          !isSideBarVisible && appService?.hasRoundedWindow && 'rounded-window',
        )}
      >
        <Suspense>
          <ReaderContent key={ids || 'default'} ids={ids} settings={settings} />
          <AboutWindow />
          <Toast />
        </Suspense>
      </div>
    )
  );
};

export default Reader;
