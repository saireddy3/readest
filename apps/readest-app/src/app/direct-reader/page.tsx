'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EnvProvider } from '@/context/EnvContext';
import { SyncProvider } from '@/context/SyncContext';
import { useEnv } from '@/context/EnvContext';
import { useSettingsStore } from '@/store/settingsStore';
import Spinner from '@/components/Spinner';
import Reader from '@/app/reader/components/Reader';
import { Book } from '@/types/book';

const BOOK_URL = 'https://cdn.readest.com/books/this-side-of-paradise.epub';

const DirectReaderContent = () => {
  const router = useRouter();
  const { envConfig, appService } = useEnv();
  const { settings, setSettings } = useSettingsStore();
  const [loading, setLoading] = useState(true);
  const [bookHash, setBookHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookFromUrl = async () => {
      if (!appService) return;
      
      try {
        console.log("Starting book load process from URL:", BOOK_URL);
        
        // Load settings
        const loadedSettings = await appService.loadSettings();
        setSettings(loadedSettings);
        
        console.log("Attempting to load book from URL...");
        
        try {
          // First, let's fetch the file from URL manually
          console.log("Manually fetching the book content from URL...");
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
          
          // Now import the book using the File object
          const book = await appService.importBook(
            file,
            emptyLibrary,
            true,  // Save the book file locally so it can be found later
            true,  // Save the cover as well
            false  // don't overwrite
          );
          
          if (book) {
            // Manually ensure the URL property is set
            book.url = BOOK_URL;
            
            console.log("Book successfully imported:", book.hash);
            
            // Save the book to local storage
            await appService.saveLibraryBooks([book]);
            
            setBookHash(book.hash);
            // Open reader with this book
            router.push(`/reader?ids=${book.hash}`);
          } else {
            throw new Error("Book import returned null");
          }
        } catch (err) {
          console.error("Error in direct URL loading:", err);
          setError(`Error loading book: ${err instanceof Error ? err.message : String(err)}`);
        }
      } catch (error) {
        console.error('Error in book loading process:', error);
        setError(`Failed to load book: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    loadBookFromUrl();
  }, [appService, router, setSettings]);

  if (loading) {
    return (
      <div className="hero h-dvh">
        <div className="hero-content text-center">
          <div>
            <Spinner loading={true} />
            <div className="mt-4">Loading book from URL...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero h-dvh">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-error">Error</h1>
            <p className="py-4">{error}</p>
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

  // This is a fallback, though the direct router.push should handle navigation
  return bookHash ? <Reader ids={bookHash} /> : null;
};

export default function DirectReaderPage() {
  return (
    <EnvProvider>
      <SyncProvider>
        <DirectReaderContent />
      </SyncProvider>
    </EnvProvider>
  );
} 