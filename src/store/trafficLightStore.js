import { create } from 'zustand';

/**
 * @typedef {Object} TrafficLightState
 * @property {AppService} [appService]
 * @property {boolean} isTrafficLightVisible
 * @property {boolean} shouldShowTrafficLight
 * @property {function(AppService): void} initializeTrafficLightStore
 * @property {function(boolean): void} setTrafficLightVisibility
 * @property {function(): Promise<void>} initializeTrafficLightListeners
 * @property {function(): void} cleanupTrafficLightListeners
 * @property {function(): void} [unlistenEnterFullScreen]
 * @property {function(): void} [unlistenExitFullScreen]
 */

export const useTrafficLightStore = create((set, get) => {
  return {
    appService: undefined,
    isTrafficLightVisible: false,
    shouldShowTrafficLight: false,

    initializeTrafficLightStore: (appService) => {
      set({
        appService,
        isTrafficLightVisible: appService.hasTrafficLight,
        shouldShowTrafficLight: appService.hasTrafficLight,
      });
    },

    setTrafficLightVisibility: async (visible) => {
      // In web mode, we check if we're in fullscreen using the browser API
      const isFullscreen = !!document.fullscreenElement;
      set({ isTrafficLightVisible: !isFullscreen && visible, shouldShowTrafficLight: visible });
      // No need to invoke native code in web environment
    },

    initializeTrafficLightListeners: async () => {
      // Use standard web event listeners for fullscreen changes
      const handleEnterFullScreen = () => {
        set({ isTrafficLightVisible: false });
      };

      const handleExitFullScreen = () => {
        const { shouldShowTrafficLight } = get();
        set({ isTrafficLightVisible: shouldShowTrafficLight });
      };

      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          handleEnterFullScreen();
        } else {
          handleExitFullScreen();
        }
      });

      // Return cleanup functions
      const unlistenEnterFullScreen = () => {
        document.removeEventListener('fullscreenchange', handleEnterFullScreen);
      };

      const unlistenExitFullScreen = () => {
        document.removeEventListener('fullscreenchange', handleExitFullScreen);
      };

      set({ unlistenEnterFullScreen, unlistenExitFullScreen });
    },

    cleanupTrafficLightListeners: () => {
      const { unlistenEnterFullScreen, unlistenExitFullScreen } = get();
      if (unlistenEnterFullScreen) unlistenEnterFullScreen();
      if (unlistenExitFullScreen) unlistenExitFullScreen();
      set({ unlistenEnterFullScreen: undefined, unlistenExitFullScreen: undefined });
    },
  };
}); 