'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { EnvProvider } from '../context/EnvContext';
import { SyncProvider } from '../context/SyncContext';
import { IconContext } from 'react-icons';
import { useDefaultIconSize } from '../hooks/useResponsiveSize';

const Providers = ({ children }) => {
  const iconSize = useDefaultIconSize();
  return (
    <EnvProvider>
      <IconContext.Provider value={{ size: `${iconSize}px` }}>
        <SyncProvider>{children}</SyncProvider>
      </IconContext.Provider>
    </EnvProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers; 