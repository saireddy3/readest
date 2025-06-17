/**
 * Serialize book configuration by removing default values
 * @param {Object} config - Book configuration
 * @param {Object} globalViewSettings - Global view settings
 * @param {Object} defaultSearchConfig - Default search configuration
 * @returns {string} Serialized configuration
 */
export const serializeConfig = (config, globalViewSettings, defaultSearchConfig) => {
  config = JSON.parse(JSON.stringify(config));
  const viewSettings = config.viewSettings;
  const searchConfig = config.searchConfig;
  
  config.viewSettings = Object.entries(viewSettings).reduce(
    (acc, [key, value]) => {
      if (globalViewSettings[key] !== value) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  
  config.searchConfig = Object.entries(searchConfig).reduce(
    (acc, [key, value]) => {
      if (defaultSearchConfig[key] !== value) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  return JSON.stringify(config);
};

/**
 * Deserialize book configuration by merging with default values
 * @param {string} str - Serialized configuration string
 * @param {Object} globalViewSettings - Global view settings
 * @param {Object} defaultSearchConfig - Default search configuration
 * @returns {Object} Deserialized configuration
 */
export const deserializeConfig = (str, globalViewSettings, defaultSearchConfig) => {
  const config = JSON.parse(str);
  const { viewSettings, searchConfig } = config;
  config.viewSettings = { ...globalViewSettings, ...viewSettings };
  config.searchConfig = { ...defaultSearchConfig, ...searchConfig };
  config.updatedAt ??= Date.now();
  return config;
};

/**
 * Compress book configuration by removing default values and parsing back to object
 * @param {Object} config - Book configuration
 * @param {Object} globalViewSettings - Global view settings
 * @param {Object} defaultSearchConfig - Default search configuration
 * @returns {Object} Compressed configuration
 */
export const compressConfig = (config, globalViewSettings, defaultSearchConfig) => {
  return JSON.parse(serializeConfig(config, globalViewSettings, defaultSearchConfig));
}; 