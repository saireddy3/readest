import { create } from 'zustand';

interface SidebarState {
  sideBarBookKey: string | null;
  sideBarWidth: string;
  isSideBarVisible: boolean;
  isSideBarPinned: boolean;
  setSideBarBookKey: (key: string) => void;
  setSideBarWidth: (width: string) => void;
  toggleSideBar: () => void;
  toggleSideBarPin: () => void;
  setSideBarVisible: (visible: boolean) => void;
  setSideBarPin: (pinned: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  sideBarBookKey: null,
  sideBarWidth: '',
  isSideBarVisible: false,
  isSideBarPinned: false,
  setSideBarBookKey: (key: string) => set({ sideBarBookKey: key }),
  setSideBarWidth: (width: string) => set({ sideBarWidth: width }),
  toggleSideBar: () => set((state) => ({ isSideBarVisible: !state.isSideBarVisible })),
  toggleSideBarPin: () => set((state) => ({ isSideBarPinned: !state.isSideBarPinned })),
  setSideBarVisible: (visible: boolean) => set({ isSideBarVisible: visible }),
  setSideBarPin: (pinned: boolean) => set({ isSideBarPinned: pinned }),
}));
