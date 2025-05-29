import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '@/hooks/useTranslation';

const Spinner = ({ loading }) => {
  const _ = useTranslation();
  if (!loading) return null;

  return (
    <div
      className={clsx(
        'absolute left-1/2 -translate-x-1/2 transform text-center',
        'top-4 pt-[calc(env(safe-area-inset-top)+64px)]',
      )}
      role='status'
    >
      <span className='loading loading-dots loading-lg'></span>
      <span className='hidden'>{_('Loading...')}</span>
    </div>
  );
};

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner; 