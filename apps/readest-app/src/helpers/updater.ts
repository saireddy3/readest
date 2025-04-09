import { CHECK_UPDATE_INTERVAL_SEC } from '@/services/constants';
import { TranslationFunc } from '@/hooks/useTranslation';
import { eventDispatcher } from '@/utils/event';
import { READEST_WEB_BASE_URL } from '@/services/constants';

const LAST_CHECK_KEY = 'lastAppUpdateCheck';

/**
 * Check for app updates in web environment
 * Web app always uses the latest version, so we simply remind the user to refresh
 */
export const checkForAppUpdates = async (_: TranslationFunc, autoCheck = true) => {
  // In web environment, simply check if we need to remind the user to refresh
  const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
  const now = Date.now();
  if (autoCheck && lastCheck && now - parseInt(lastCheck, 10) < CHECK_UPDATE_INTERVAL_SEC * 1000)
    return;
  localStorage.setItem(LAST_CHECK_KEY, now.toString());

  // In a web environment, you can't directly update the app
  // But we can check if there's a new service worker update available
  // or simply notify users to refresh their browser
  
  try {
    // Optional: Check for new version by fetching a version.json file from your server
    const versionCheck = await fetch(`${READEST_WEB_BASE_URL}/version.json?t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-cache',
    }).then(res => res.json()).catch(() => null);
    
    // If we have a version check endpoint and there's a new version available
    if (versionCheck && versionCheck.newVersionAvailable) {
      // Show a notification to the user
      eventDispatcher.dispatch('toast', {
        type: 'info',
        message: _('A new version is available. Refresh the page to update.'),
        timeout: 10000,
      });
      
      return {
        version: versionCheck.version,
        body: versionCheck.notes || '',
        date: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
  
  return null;
};
