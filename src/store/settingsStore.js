import { create } from 'zustand';

/**
 * @typedef {Object} SettingsState
 * @property {SystemSettings} settings
 * @property {boolean} isFontLayoutSettingsDialogOpen
 * @property {boolean} isFontLayoutSettingsGlobal
 * @property {function(SystemSettings): void} setSettings
 * @property {function(EnvConfigType, SystemSettings): void} saveSettings
 * @property {function(boolean): void} setFontLayoutSettingsDialogOpen
 * @property {function(boolean): void} setFontLayoutSettingsGlobal
 */

export const useSettingsStore = create((set) => ({
  settings: {},
  isFontLayoutSettingsDialogOpen: false,
  isFontLayoutSettingsGlobal: true,
  setSettings: (settings) => set({ settings }),
  saveSettings: async (envConfig, settings) => {
    const appService = await envConfig.getAppService();
    await appService.saveSettings(settings);
  },
  setFontLayoutSettingsDialogOpen: (open) => set({ isFontLayoutSettingsDialogOpen: open }),
  setFontLayoutSettingsGlobal: (global) => set({ isFontLayoutSettingsGlobal: global }),
})); 