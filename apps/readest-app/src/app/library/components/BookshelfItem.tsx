import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { navigateToLibrary, navigateToReader } from '@/utils/nav';
import { useEnv } from '@/context/EnvContext';
import { useLibraryStore } from '@/store/libraryStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useLongPress } from '@/hooks/useLongPress';
import { getOSPlatform } from '@/utils/misc';
import { getLocalBookFilename } from '@/utils/book';
import { BOOK_UNGROUPED_ID, BOOK_UNGROUPED_NAME } from '@/services/constants';
import { FILE_REVEAL_LABELS, FILE_REVEAL_PLATFORMS } from '@/utils/os';
import { Book, BookGroupType, BooksGroup } from '@/types/book';
import BookItem from './BookItem';
import GroupItem from './GroupItem';

export type BookshelfItem = Book | BooksGroup;

export const generateBookshelfItems = (books: Book[]): (Book | BooksGroup)[] => {
  const groups: BooksGroup[] = books.reduce((acc: BooksGroup[], book: Book) => {
    if (book.deletedAt) return acc;
    book.groupId = book.groupId || BOOK_UNGROUPED_ID;
    book.groupName = book.groupName || BOOK_UNGROUPED_NAME;
    const groupIndex = acc.findIndex((group) => group.id === book.groupId);
    const booksGroup = acc[acc.findIndex((group) => group.id === book.groupId)];
    if (booksGroup) {
      booksGroup.books.push(book);
      booksGroup.updatedAt = Math.max(acc[groupIndex]!.updatedAt, book.updatedAt);
    } else {
      acc.push({
        id: book.groupId,
        name: book.groupName,
        books: [book],
        updatedAt: book.updatedAt,
      });
    }
    return acc;
  }, []);
  groups.forEach((group) => {
    group.books.sort((a, b) => b.updatedAt - a.updatedAt);
  });
  const ungroupedBooks: Book[] =
    groups.find((group) => group.name === BOOK_UNGROUPED_NAME)?.books || [];
  const groupedBooks: BooksGroup[] = groups.filter((group) => group.name !== BOOK_UNGROUPED_NAME);
  return [...ungroupedBooks, ...groupedBooks].sort((a, b) => b.updatedAt - a.updatedAt);
};

export const generateGroupsList = (items: Book[]): BookGroupType[] => {
  return items
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .reduce((acc: BookGroupType[], item: Book) => {
      if (item.deletedAt) return acc;
      if (
        item.groupId &&
        item.groupName &&
        item.groupId !== BOOK_UNGROUPED_ID &&
        item.groupName !== BOOK_UNGROUPED_NAME &&
        !acc.find((group) => group.id === item.groupId)
      ) {
        acc.push({ id: item.groupId, name: item.groupName });
      }
      return acc;
    }, []) as BookGroupType[];
};

interface BookshelfItemProps {
  item: BookshelfItem;
  isSelectMode: boolean;
  selectedBooks: string[];
  transferProgress: number | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSelection: (hash: string) => void;
  handleBookUpload: (book: Book) => Promise<boolean>;
  handleBookDownload: (book: Book) => Promise<boolean>;
  handleBookDelete: (book: Book) => Promise<boolean>;
  handleSetSelectMode: (selectMode: boolean) => void;
  handleShowDetailsBook: (book: Book) => void;
}

const BookshelfItem: React.FC<BookshelfItemProps> = ({
  item,
  isSelectMode,
  selectedBooks,
  transferProgress,
  setLoading,
  toggleSelection,
  handleBookUpload,
  handleBookDownload,
  handleBookDelete,
  handleSetSelectMode,
  handleShowDetailsBook,
}) => {
  const _ = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { envConfig, appService } = useEnv();
  const { settings } = useSettingsStore();
  const { updateBook } = useLibraryStore();

  const showBookDetailsModal = async (book: Book) => {
    if (await makeBookAvailable(book)) {
      handleShowDetailsBook(book);
    }
  };

  const makeBookAvailable = async (book: Book) => {
    if (book.uploadedAt && !book.downloadedAt) {
      let available = false;
      const loadingTimeout = setTimeout(() => setLoading(true), 200);
      try {
        available = await handleBookDownload(book);
        updateBook(envConfig, book);
      } finally {
        if (loadingTimeout) clearTimeout(loadingTimeout);
        setLoading(false);
        return available;
      }
    }
    return true;
  };

  const handleBookClick = async (book: Book) => {
    if (isSelectMode) {
      toggleSelection(book.hash);
    } else {
      if (!(await makeBookAvailable(book))) return;
      navigateToReader(router, [book.hash]);
    }
  };

  const handleGroupClick = (group: BooksGroup) => {
    if (isSelectMode) {
      toggleSelection(group.id);
    } else {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('group', group.id);
      navigateToLibrary(router, `${params.toString()}`);
    }
  };

  const bookContextMenuHandler = async (book: Book) => {
    showBookDetailsModal(book);
  };

  const groupContextMenuHandler = async (group: BooksGroup) => {
    handleGroupClick(group);
  };

  const { pressing, handlers } = useLongPress({
    onLongPress: async () => {
      if (!isSelectMode) {
        handleSetSelectMode(true);
      }
      if ('format' in item) {
        toggleSelection((item as Book).hash);
      } else {
        toggleSelection((item as BooksGroup).id);
      }
    },
    onTap: () => {
      if ('format' in item) {
        handleBookClick(item as Book);
      } else {
        handleGroupClick(item as BooksGroup);
      }
    },
    onContextMenu: () => {
      if ('format' in item) {
        bookContextMenuHandler(item as Book);
      } else {
        groupContextMenuHandler(item as BooksGroup);
      }
    },
  });

  return (
    <div
      className={clsx(
        'sm:hover:bg-base-300/50 group flex h-full flex-col px-0 py-4 sm:px-4',
        pressing ? 'scale-95' : 'scale-100',
      )}
      style={{
        transition: 'transform 0.2s',
      }}
      {...handlers}
    >
      <div className='flex-grow'>
        {'format' in item ? (
          <BookItem
            book={item}
            isSelectMode={isSelectMode}
            selectedBooks={selectedBooks}
            transferProgress={transferProgress}
            handleBookUpload={handleBookUpload}
            handleBookDownload={handleBookDownload}
            showBookDetailsModal={showBookDetailsModal}
          />
        ) : (
          <GroupItem group={item} isSelectMode={isSelectMode} selectedBooks={selectedBooks} />
        )}
      </div>
    </div>
  );
};

export default BookshelfItem;
