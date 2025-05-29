import { create } from 'zustand';

/**
 * @typedef {Object} SidebarState
 * @property {string|null} sideBarBookKey
 * @property {string} sideBarWidth
 * @property {boolean} isSideBarVisible
 * @property {boolean} isSideBarPinned
 * @property {function(string): void} setSideBarBookKey
 * @property {function(string): void} setSideBarWidth
 * @property {function(): void} toggleSideBar
 * @property {function(): void} toggleSideBarPin
 * @property {function(boolean): void} setSideBarVisible
 * @property {function(boolean): void} setSideBarPin
 */

export const useSidebarStore = create((set) => ({
  sideBarBookKey: null,
  sideBarWidth: '',
  isSideBarVisible: false,
  isSideBarPinned: false,
  setSideBarBookKey: (key) => set({ sideBarBookKey: key }),
  setSideBarWidth: (width) => set({ sideBarWidth: width }),
  toggleSideBar: () => set((state) => ({ isSideBarVisible: !state.isSideBarVisible })),
  toggleSideBarPin: () => set((state) => ({ isSideBarPinned: !state.isSideBarPinned })),
  setSideBarVisible: (visible) => set({ isSideBarVisible: visible }),
  setSideBarPin: (pinned) => set({ isSideBarPinned: pinned }),
})); 