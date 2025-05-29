'use client';

import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import env from '../services/environment';

const EnvContext = createContext(undefined);

export const EnvProvider = ({ children }) => {
  const [envConfig] = useState(env);
  const [appService, setAppService] = useState(null);

  React.useEffect(() => {
    envConfig.getAppService().then((service) => setAppService(service));
  }, [envConfig]);

  return <EnvContext.Provider value={{ envConfig, appService }}>{children}</EnvContext.Provider>;
};

EnvProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEnv = () => {
  const context = useContext(EnvContext);
  if (!context) throw new Error('useEnv must be used within EnvProvider');
  return context;
}; 