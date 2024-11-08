import { useReaderStore } from '@/store/readerStore';
import useShortcuts from '@/hooks/useShortcuts';

interface UseBookShortcutsProps {
  sideBarBookKey: string | null;
  bookKeys: string[];
  openSplitView: () => void;
  getNextBookKey: (bookKey: string) => string;
}

const useBookShortcuts = ({
  sideBarBookKey,
  bookKeys,
  openSplitView,
  getNextBookKey,
}: UseBookShortcutsProps) => {
  const { getView, setSideBarBookKey } = useReaderStore();
  const { toggleSideBar } = useReaderStore();

  const switchSideBar = () => {
    if (sideBarBookKey) setSideBarBookKey(getNextBookKey(sideBarBookKey));
  };

  const goLeft = () => {
    getView(sideBarBookKey)?.goLeft();
  };

  const goRight = () => {
    getView(sideBarBookKey)?.goRight();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useShortcuts(
    {
      onOpenSplitView: openSplitView,
      onSwitchSideBar: switchSideBar,
      onToggleSideBar: toggleSideBar,
      onReloadPage: reloadPage,
      onGoLeft: goLeft,
      onGoRight: goRight,
    },
    [sideBarBookKey, bookKeys],
  );
};

export default useBookShortcuts;
