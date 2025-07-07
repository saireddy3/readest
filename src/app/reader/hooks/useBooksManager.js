import { useEffect, useState } from 'react';
import { useEnv } from '../../../context/EnvContext';
import { useReaderStore } from '../../../store/readerStore';
import { useSidebarStore } from '../../../store/sidebarStore';
import { uniqueId } from '../../../utils/misc';
import { navigateToReader } from '../../../utils/nav';


const useBooksManager = () => {
  const { envConfig } = useEnv();
  const { bookKeys } = useReaderStore();
  const { setBookKeys, initViewState } = useReaderStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sideBarBookKey, setSideBarBookKey } = useSidebarStore();
  const [shouldUpdateSearchParams, setShouldUpdateSearchParams] = useState(false);

  useEffect(() => {
    if (shouldUpdateSearchParams) {
      const ids = bookKeys.map((key) => key.split('-')[0]);
      if (ids) {
        navigateToReader(null, ids);
      }
      setShouldUpdateSearchParams(false);
    }
     
  }, [bookKeys, shouldUpdateSearchParams]);

  // Append a new book and sync with bookKeys and URL
  const appendBook = (id, isPrimary) => {
    const newKey = `${id}-${uniqueId()}`;
    initViewState(envConfig, id, newKey, isPrimary);
    if (!bookKeys.includes(newKey)) {
      const updatedKeys = [...bookKeys, newKey];
      setBookKeys(updatedKeys);
    }
    setSideBarBookKey(newKey);
    setShouldUpdateSearchParams(true);
  };

  // Close a book and sync with bookKeys
  const dismissBook = (bookKey) => {
    const updatedKeys = bookKeys.filter((key) => key !== bookKey);
    setBookKeys(updatedKeys);
    setShouldUpdateSearchParams(true);
  };

  const getNextBookKey = (bookKey) => {
    const index = bookKeys.findIndex((key) => key === bookKey);
    const nextIndex = (index + 1) % bookKeys.length;
    return bookKeys[nextIndex];
  };

  return {
    bookKeys,
    appendBook,
    dismissBook,
    getNextBookKey,
  };
};

export default useBooksManager; 