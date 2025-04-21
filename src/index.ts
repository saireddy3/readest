// Export main components
import Reader from './app/reader/components/Reader';
import ReaderContent from './app/reader/components/ReaderContent';
import SideBar from './app/reader/components/sidebar/SideBar';
import TOCView from './app/reader/components/sidebar/TOCView';
import SettingsDialog from './app/reader/components/settings/SettingsDialog';
import FoliateViewer from './app/reader/components/FoliateViewer';
import HeaderBar from './app/reader/components/HeaderBar';
import FooterBar from './app/reader/components/FooterBar';

// Export utilities and hooks
import { useTheme } from './hooks/useTheme';
import { useScreenWakeLock } from './hooks/useScreenWakeLock';
import { useEnv } from './context/EnvContext';

// Export contexts
export * from './context/EnvContext';
export * from './context/SyncContext';

// Export store
export * from './store/settingsStore';
export * from './store/themeStore';
export * from './store/sidebarStore';

// Export types
export * from './types/book';
export * from './types/settings';
export * from './types/system';
export * from './types/view';
export * from './types/records';

// Export named components
export {
  Reader,
  ReaderContent,
  SideBar,
  TOCView,
  SettingsDialog,
  FoliateViewer,
  HeaderBar,
  FooterBar,
  useTheme,
  useScreenWakeLock,
  useEnv
};

// Default export for backward compatibility
export default Reader; 