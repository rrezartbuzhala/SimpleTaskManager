import apiClient from './apiClient';

export async function fetchPriorities(): Promise<string[]> {
  try {
    const resp = await apiClient.get('/priorities', { validateStatus: () => true });
    return resp.data || [];
  } catch (err) {
    console.error('Failed to fetch priorities:', err);
    return [];
  }
}

export async function fetchStatuses(): Promise<string[]> {
  try {
    const resp = await apiClient.get('/statuses', { validateStatus: () => true });
    return resp.data || [];
  } catch (err) {
    console.error('Failed to fetch statuses:', err);
    return [];
  }
}
