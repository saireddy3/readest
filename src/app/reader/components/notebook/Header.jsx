import React from 'react';
import { MdClose, MdPushPin } from 'react-icons/md';
import clsx from 'clsx';

import { useTranslation } from '../../../../hooks/useTranslation';
import { useResponsiveSize } from '../../../../hooks/useResponsiveSize';

const NotebookHeader = ({ isPinned, handleClose, handleTogglePin }) => {
  const _ = useTranslation();

  return (
    <div className='flex h-11 items-center justify-between border-b px-3'>
      <div className='flex items-center gap-2'>
        <button
          className='btn btn-ghost btn-sm h-8 min-h-8 w-8 p-0'
          onClick={handleTogglePin}
          title={isPinned ? _('Unpin') : _('Pin')}
        >
          <MdPushPin
            className={clsx('h-5 w-5', isPinned && 'rotate-45')}
          />
        </button>
        <span className='font-size-sm font-medium'>{_('Notebook')}</span>
      </div>
      <button
        className='btn btn-ghost btn-sm h-8 min-h-8 w-8 p-0'
        onClick={handleClose}
        title={_('Close')}
      >
        <MdClose className='h-5 w-5' />
      </button>
    </div>
  );
};

export default NotebookHeader; 