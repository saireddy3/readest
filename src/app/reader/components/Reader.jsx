'use client';

import clsx from 'clsx';
import * as React from 'react';
import { useEffect, Suspense, useRef, useState } from 'react';
import { md5 } from '../../../utils/md5.js';
import { useEnv } from '../../../context/EnvContext';
import { useTheme } from '../../../hooks/useTheme';
import { useThemeStore } from '../../../store/themeStore';
import { useSettingsStore } from '../../../store/settingsStore';
import { useScreenWakeLock } from '../../../hooks/useScreenWakeLock';
import { Toast } from '../../../components/Toast';
import ReaderContent from './ReaderContent';
import { useSidebarStore } from '../../../store/sidebarStore';
import { useLocationChangeTracking } from '../hooks/useLocationChangeTracking';

/**
 * Reader component with integrated content consumption tracking
 * 
 * @param {string} propBookUrl - URL of the book to load
 * @param {Function} onLocationChange - Callback for location changes
 * @param {string} sessionKey - Session identifier for consumption tracking
 * @param {Function} trackConsumption - Function to track content consumption
 * @param {string} bookId - Book identifier for consumption tracking
 * @param {string} bookType - Book type for consumption tracking
 */
const Reader = ({ 
  bookUrl: propBookUrl, 
  onLocationChange, 
  sessionKey, 
  trackConsumption, 
  bookId, 
  bookType,
  instanceNumber
}) => {
  console.log({propBookUrl})
  const defaultBookUrl = 'https://cdn.readest.com/books/this-side-of-paradise.epub';
  const [urlBookUrl, setUrlBookUrl] = useState(null);
  const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);
  const bookUrl = urlBookUrl || propBookUrl || defaultBookUrl;
  const { envConfig, appService } = useEnv();
  const { settings, setSettings } = useSettingsStore();
  const { isSideBarVisible } = useSidebarStore();
  const isInitiating = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookHash, setBookHash] = useState(null);

  const { updateAppTheme } = useThemeStore();
  useTheme();
  useScreenWakeLock(settings.screenWakeLock);

  // Location change handling for content consumption tracking
  useLocationChangeTracking(onLocationChange, sessionKey, trackConsumption, bookId, bookType, instanceNumber);

  // First effect: Process URL parameters
  useEffect(() => {
    // Get URL parameters only on the client side
    const urlParams = new URLSearchParams(window.location.search);
    setUrlBookUrl(urlParams.get('bookUrl'));
    setUrlParamsProcessed(true);
  }, []);

  // Second effect: Initialize book only after URL parameters are processed
  useEffect(() => {
    if (!urlParamsProcessed) return; // Wait for URL params to be processed
    
    updateAppTheme('base-100');
    if (isInitiating.current) return;
    isInitiating.current = true;
    
    console.log("⏳ Starting book initialization with URL:", bookUrl);
    
    const initSettings = async () => {
      try {
        console.log("⏳ Starting book initialization process");
        const appService = await envConfig.getAppService();
        
        // Load and set user settings first
        console.log("⏳ Loading user settings");
        const settings = await appService.loadSettings();
        setSettings(settings);
        
        console.log("⏳ Fetching book from URL:", bookUrl);
        // Fetch the file from URL
        let blob;
        try {
          const response = await fetch(bookUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch book: ${response.status} ${response.statusText}`);
          }
          blob = await response.blob();
        } catch (fetchError) {
          console.warn("Failed to fetch book from URL, continuing with empty state:", fetchError);
          // Continue without the book - let the user upload one manually
          setLoading(false);
          return;
        }
        
        console.log("✅ Successfully fetched book content:", blob.size, "bytes");
        
        // Create a File object from the blob
        const filename = bookUrl.split('/').pop() || 'book.epub';
        const file = new File([blob], filename, { type: 'application/epub+zip' });
        
        // Generate a hash for the book
        const arrayBuffer = await file.arrayBuffer();
        const hash = await md5(arrayBuffer);
        console.log("📊 Book hash:", hash);
        
        // We need to ensure the library exists in IndexedDB
        let books = await appService.loadLibraryBooks();
        console.log("📚 Current library has", books.length, "books");
        
        // Check if book exists by hash
        const existingBook = books.find(b => b.hash === hash);
        if (existingBook) {
          console.log("📕 Book already exists in library:", existingBook);
          setBookHash(existingBook.hash);
        } else {
          console.log("📗 Importing new book");
          
          // Import the book using the File object
          const book = await appService.importBook(
            file,
            books,
            true,  // Save the book file locally
            true,  // Save the cover as well
            false,  // don't overwrite
            false   // not transient
          );
          
          if (book) {
            // Ensure the book has the source URL saved
            book.url = bookUrl;
            
            console.log("✅ Book successfully imported:", book);
            
            // Update books array with the new book
            books = [book, ...books.filter(b => b.hash !== book.hash)];
            
            // Save the updated library to IndexedDB
            console.log("💾 Saving updated library to storage");
            await appService.saveLibraryBooks(books);
            
            // Set the book hash for rendering
            setBookHash(book.hash);
          } else {
            throw new Error("Book import returned null");
          }
        }
        
        // Force a save of the current settings to ensure defaults are stored
        await appService.saveSettings(settings);
        
        console.log("✅ Book initialization complete");
      } catch (err) {
        console.error("❌ Error loading book:", err);
        setError(`Error loading book: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
        isInitiating.current = false;
      }
    };

    initSettings();
    return () => {
      isInitiating.current = false;
    };
  }, [bookUrl, urlParamsProcessed]);

  if (!urlParamsProcessed || loading) {
    return (
      <div className="hero h-dvh bg-base-100">
        <div className="hero-content text-center">
          <div>
            <div className="mt-4 text-base-content">
            {!urlParamsProcessed ? "Processing URL parameters..." : "Loading book..."}
            </div>
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
          <ReaderContent key={bookHash || 'default'} ids={bookHash || undefined} />
          <Toast />
        </Suspense>
      </div>
    )
  );
};

export default Reader; 