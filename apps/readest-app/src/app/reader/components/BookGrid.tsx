import React from 'react';

import { useReaderStore } from '@/store/readerStore';
import FoliateViewer from './FoliateViewer';
import getGridTemplate from '@/utils/grid';
import SectionInfo from './SectionInfo';
import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
import PageInfoView from './PageInfo';
import Ribbon from './Ribbon';
import SettingsDialog from './settings/SettingsDialog';
import Annotator from './annotator/Annotator';

interface BookGridProps {
  bookKeys: string[];
  onCloseBook: (bookKey: string) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ bookKeys, onCloseBook }) => {
  const { isSideBarPinned, isSideBarVisible, sideBarWidth } = useReaderStore();
  const { getConfig, getProgress, getBookData, getViewState } = useReaderStore();
  const { isFontLayoutSettingsDialogOpen, setFontLayoutSettingsDialogOpen } = useReaderStore();
  const gridWidth = isSideBarPinned && isSideBarVisible ? `calc(100% - ${sideBarWidth})` : '100%';
  const gridTemplate = getGridTemplate(bookKeys.length, window.innerWidth / window.innerHeight);

  return (
    <div
      className='grid h-full'
      style={{
        width: gridWidth,
        gridTemplateColumns: gridTemplate.columns,
        gridTemplateRows: gridTemplate.rows,
      }}
    >
      {bookKeys.map((bookKey) => {
        const bookData = getBookData(bookKey);
        const config = getConfig(bookKey);
        const progress = getProgress(bookKey);
        const { book, bookDoc } = bookData || {};
        if (!book || !config || !bookDoc) return null;

        const isBookmarked = getViewState(bookKey)?.ribbonVisible;
        const { section, pageinfo, tocLabel: chapter } = progress || {};
        const marginGap = `${config.viewSettings!.gapPercent}%`;

        return (
          <div
            id={`gridcell-${bookKey}`}
            key={bookKey}
            className='relative h-full w-full overflow-hidden'
          >
            {isBookmarked && <Ribbon width={marginGap} />}
            <HeaderBar
              bookKey={bookKey}
              bookTitle={book.title}
              isHoveredAnim={bookKeys.length > 2}
              onCloseBook={onCloseBook}
              onSetSettingsDialogOpen={setFontLayoutSettingsDialogOpen}
            />
            <FoliateViewer bookKey={bookKey} bookDoc={bookDoc} config={config} />
            {config.viewSettings!.scrolled ? null : (
              <>
                <SectionInfo chapter={chapter} gapLeft={marginGap} />
                <PageInfoView
                  bookFormat={book.format}
                  section={section ?? null}
                  pageinfo={pageinfo ?? null}
                  gapRight={marginGap}
                />
              </>
            )}
            <Annotator bookKey={bookKey} />
            <FooterBar bookKey={bookKey} pageinfo={pageinfo} isHoveredAnim={false} />
            {isFontLayoutSettingsDialogOpen && <SettingsDialog bookKey={bookKey} config={config} />}
          </div>
        );
      })}
    </div>
  );
};

export default BookGrid;
