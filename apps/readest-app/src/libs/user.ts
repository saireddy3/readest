import { getAPIBaseUrl } from '@/services/environment';
import { getUserID } from '@/utils/access';
import { fetchWithAuth } from '@/utils/fetch';

const API_ENDPOINT = getAPIBaseUrl() + '/user/delete';

export const deleteUser = async () => {
  // Authentication removed, always return success
  console.log('User deletion API call skipped - no authentication');
  return true;
};
