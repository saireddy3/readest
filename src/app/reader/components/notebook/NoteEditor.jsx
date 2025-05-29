import React, { useEffect, useRef } from 'react';

import { useNotebookStore } from '@/store/notebookStore';
import { useTranslation } from '@/hooks/useTranslation';

const NoteEditor = ({ onSave, onEdit }) => {
  const _ = useTranslation();
  const textareaRef = useRef(null);
  const { notebookNewAnnotation, notebookEditAnnotation } = useNotebookStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSave = () => {
    const text = textareaRef.current?.value;
    if (!text) return;

    if (notebookNewAnnotation) {
      onSave(notebookNewAnnotation, text);
    } else if (notebookEditAnnotation) {
      onEdit({ ...notebookEditAnnotation, note: text });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      handleSave();
    }
  };

  return (
    <div className='my-2'>
      <textarea
        ref={textareaRef}
        className='textarea textarea-bordered w-full resize-none'
        placeholder={_('Type your note here...')}
        defaultValue={notebookEditAnnotation?.note || ''}
        onKeyDown={handleKeyDown}
      />
      <div className='flex justify-end' dir='ltr'>
        <button
          className='btn btn-primary btn-sm mt-2'
          onClick={handleSave}
        >
          {_('Save')}
        </button>
      </div>
    </div>
  );
};

export default NoteEditor; 