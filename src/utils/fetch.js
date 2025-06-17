/**
 * Fetch with authentication handling (authentication removed)
 * @param {string} url - The URL to fetch from
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} The fetch response
 */
export const fetchWithAuth = async (url, options) => {
  // Authentication removed, perform regular fetch
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    console.error('Error:', errorData.error || response.statusText);
    throw new Error(errorData.error || 'Request failed');
  }

  return response;
}; 