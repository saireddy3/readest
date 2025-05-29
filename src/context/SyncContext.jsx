'use client';

import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { SyncClient } from '@/libs/sync';

const syncClient = new SyncClient();

const SyncContext = createContext({ syncClient });

export const SyncProvider = ({ children }) => {
  return <SyncContext.Provider value={{ syncClient }}>{children}</SyncContext.Provider>;
};

SyncProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSyncContext = () => useContext(SyncContext); 