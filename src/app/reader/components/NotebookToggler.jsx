import React from 'react';
import { LuNotebookPen } from 'react-icons/lu';

import { useSidebarStore } from '../../../store/sidebarStore';
import { useNotebookStore } from '../../../store/notebookStore';
import { useTranslation } from '../../../hooks/useTranslation';
import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import Button from '../../../components/Button';
import { eventDispatcher } from '../../../utils/event';

const NotebookToggler = ({ bookKey }) => {
  const _ = useTranslation();
  const { sideBarBookKey, setSideBarBookKey } = useSidebarStore();
  const { isNotebookVisible, toggleNotebook } = useNotebookStore();
  const iconSize16 = useResponsiveSize(16);

  const handleToggleSidebar = () => {
    if (sideBarBookKey === bookKey) {
      toggleNotebook();
    } else {
      setSideBarBookKey(bookKey);
      if (!isNotebookVisible) toggleNotebook();
    }
  };
  return (
    <Button
      icon={
        sideBarBookKey == bookKey && isNotebookVisible ? (
          <LuNotebookPen size={iconSize16} className='text-base-content' />
        ) : (
          <LuNotebookPen size={iconSize16} className='text-base-content' />
        )
      }
      onClick={handleToggleSidebar}
      tooltip={_('Notebook')}
      tooltipDirection='bottom'
    ></Button>
  );
};

export default NotebookToggler; 