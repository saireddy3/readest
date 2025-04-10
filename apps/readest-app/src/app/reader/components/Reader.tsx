'use client';

import clsx from 'clsx';
import * as React from 'react';
import { useEffect, Suspense, useRef } from 'react';

import { useEnv } from '@/context/EnvContext';
import { useTheme } from '@/hooks/useTheme';
import { useThemeStore } from '@/store/themeStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useScreenWakeLock } from '@/hooks/useScreenWakeLock';
import { AboutWindow } from '@/components/AboutWindow';
import { Toast } from '@/components/Toast';
import ReaderContent from './ReaderContent';
import { useSidebarStore } from '@/store/sidebarStore';

const Reader: React.FC<{ ids?: string }> = ({ ids }) => {
  const { envConfig, appService } = useEnv();
  const { settings, setSettings } = useSettingsStore();
  const { isSideBarVisible } = useSidebarStore();
  const isInitiating = useRef(false);

  const { updateAppTheme } = useThemeStore();
  useTheme();
  useScreenWakeLock(settings.screenWakeLock);

  useEffect(() => {
    updateAppTheme('base-100');
    if (isInitiating.current) return;
    isInitiating.current = true;
    const initSettings = async () => {
      const appService = await envConfig.getAppService();
      const settings = await appService.loadSettings();
      setSettings(settings);
    };

    initSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    settings?.globalReadSettings && (
      <div
        className={clsx(
          `reader-page bg-base-100 text-base-content select-none`,
          !isSideBarVisible && appService?.hasRoundedWindow && 'rounded-window',
        )}
      >
        <Suspense>
          <ReaderContent ids={ids} settings={settings} />
          <AboutWindow />
          <Toast />
        </Suspense>
      </div>
    )
  );
};

export default Reader;
