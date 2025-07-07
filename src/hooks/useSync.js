import { useEffect, useRef, useState } from 'react';
// Import router if needed
// import { useRouter } from '../context/RouterContext';
import { useSyncContext } from '../context/SyncContext';
import { useSettingsStore } from '../store/settingsStore';
import { useBookDataStore } from '../store/bookDataStore';
import { transformBookConfigFromDB } from '../utils/transform';
import { transformBookNoteFromDB } from '../utils/transform';
import { transformBookFromDB } from '../utils/transform';

const transformsFromDB = {
  books: transformBookFromDB,
  notes: transformBookNoteFromDB,
  configs: transformBookConfigFromDB,
};

const computeMaxTimestamp = (records) => {
  let maxTime = 0;
  for (const rec of records) {
    if (rec.updated_at) {
      const updatedTime = new Date(rec.updated_at).getTime();
      maxTime = Math.max(maxTime, updatedTime);
    }
    if (rec.deleted_at) {
      const deletedTime = new Date(rec.deleted_at).getTime();
      maxTime = Math.max(maxTime, deletedTime);
    }
  }
  return maxTime;
};

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function useSync(bookKey) {
  const { settings, setSettings } = useSettingsStore();
  const { getConfig, setConfig } = useBookDataStore();
  const config = bookKey ? getConfig(bookKey) : null;

  const [syncingBooks, setSyncingBooks] = useState(false);
  const [syncingConfigs, setSyncingConfigs] = useState(false);
  const [syncingNotes, setSyncingNotes] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [lastSyncedAtBooks, setLastSyncedAtBooks] = useState(0);
  const [lastSyncedAtConfigs, setLastSyncedAtConfigs] = useState(0);
  const [lastSyncedAtNotes, setLastSyncedAtNotes] = useState(0);
  const lastSyncedAtInited = useRef(false);

  const [syncing, setSyncing] = useState(false);
  // null means unsynced, empty array means synced no changes
  const [syncResult, setSyncResult] = useState({
    books: null,
    configs: null,
    notes: null,
  });
  const [syncedBooks, setSyncedBooks] = useState(null);
  const [syncedConfigs, setSyncedConfigs] = useState(null);
  const [syncedNotes, setSyncedNotes] = useState(null);

  const { syncClient } = useSyncContext();

  useEffect(() => {
    if (!settings || !config) return;
    if (lastSyncedAtInited.current) return;
    lastSyncedAtInited.current = true;

    const lastSyncedBooksAt = settings.lastSyncedAtBooks ?? 0;
    const lastSyncedConfigsAt = config?.lastSyncedAtConfig ?? settings.lastSyncedAtConfigs ?? 0;
    const lastSyncedNotesAt = config?.lastSyncedAtNotes ?? settings.lastSyncedAtNotes ?? 0;
    setLastSyncedAtBooks(lastSyncedBooksAt > 0 ? lastSyncedBooksAt - SEVEN_DAYS_IN_MS : 0);
    setLastSyncedAtConfigs(lastSyncedConfigsAt > 0 ? lastSyncedConfigsAt - SEVEN_DAYS_IN_MS : 0);
    setLastSyncedAtNotes(lastSyncedNotesAt > 0 ? lastSyncedNotesAt - SEVEN_DAYS_IN_MS : 0);
  }, [settings, config]);

  // bookId is for configs and notes only, if bookId is provided, only pull changes for that book
  // and update the lastSyncedAt for that book in the book config
  const pullChanges = async (
    type,
    since,
    setLastSyncedAt,
    setSyncing,
    bookId,
  ) => {
    setSyncing(true);
    setSyncError(null);

    try {
      const result = await syncClient.pullChanges(since, type, bookId);
      setSyncResult({ ...syncResult, [type]: result[type] });
      const records = result[type];
      if (!records?.length) return;
      const maxTime = computeMaxTimestamp(records);
      setLastSyncedAt(maxTime);

      // due to closures in React hooks the settings might be stale
      // we need to fetch the latest settings from store
      const settings = useSettingsStore.getState().settings;
      switch (type) {
        case 'books':
          settings.lastSyncedAtBooks = maxTime;
          setSettings(settings);
          break;
        case 'configs':
          if (!bookId) {
            settings.lastSyncedAtConfigs = maxTime;
            setSettings(settings);
          } else if (bookKey && config) {
            config.lastSyncedAtConfig = maxTime;
            setConfig(bookKey, config);
          }
          break;
        case 'notes':
          if (!bookId) {
            settings.lastSyncedAtNotes = maxTime;
            setSettings(settings);
          } else if (bookKey && config) {
            config.lastSyncedAtNotes = maxTime;
            setConfig(bookKey, config);
          }
          break;
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setSyncError(err.message || `Error pulling ${type}`);
      } else {
        setSyncError(`Error pulling ${type}`);
      }
    } finally {
      setSyncing(false);
    }
  };

  const pushChanges = async (payload) => {
    setSyncing(true);
    setSyncError(null);

    try {
      const result = await syncClient.pushChanges(payload);
      setSyncResult(result);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setSyncError(err.message || 'Error pushing changes');
      } else {
        setSyncError('Error pushing changes');
      }
    } finally {
      setSyncing(false);
    }
  };

  const syncBooks = async (books, op = 'both') => {
    if ((op === 'push' || op === 'both') && books?.length) {
      await pushChanges({ books });
    }
    if (op === 'pull' || op === 'both') {
      await pullChanges('books', lastSyncedAtBooks, setLastSyncedAtBooks, setSyncingBooks);
    }
  };

  const syncConfigs = async (bookConfigs, bookId, op = 'both') => {
    if ((op === 'push' || op === 'both') && bookConfigs?.length) {
      await pushChanges({ configs: bookConfigs });
    }
    if (op === 'pull' || op === 'both') {
      await pullChanges(
        'configs',
        lastSyncedAtConfigs,
        setLastSyncedAtConfigs,
        setSyncingConfigs,
        bookId,
      );
    }
  };

  const syncNotes = async (bookNotes, bookId, op = 'both') => {
    if ((op === 'push' || op === 'both') && bookNotes?.length) {
      await pushChanges({ notes: bookNotes });
    }
    if (op === 'pull' || op === 'both') {
      await pullChanges('notes', lastSyncedAtNotes, setLastSyncedAtNotes, setSyncingNotes, bookId);
    }
  };

  useEffect(() => {
    if (!syncing && syncResult) {
      const { books: dbBooks, configs: dbBookConfigs, notes: dbBookNotes } = syncResult;
      const books = dbBooks?.map((dbBook) =>
        transformsFromDB['books'](dbBook),
      );
      const configs = dbBookConfigs?.map((dbBookConfig) =>
        transformsFromDB['configs'](dbBookConfig),
      );
      const notes = dbBookNotes?.map((dbBookNote) =>
        transformsFromDB['notes'](dbBookNote),
      );
      if (books) setSyncedBooks(books);
      if (configs) setSyncedConfigs(configs);
      if (notes) setSyncedNotes(notes);
    }
  }, [syncResult, syncing]);

  return {
    syncing: syncingBooks || syncingConfigs || syncingNotes,
    syncError,
    syncResult,
    syncedBooks,
    syncedConfigs,
    syncedNotes,
    lastSyncedAtBooks,
    lastSyncedAtNotes,
    lastSyncedAtConfigs,
    pullChanges,
    pushChanges,
    syncBooks,
    syncConfigs,
    syncNotes,
  };
} 