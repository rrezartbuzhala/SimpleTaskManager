import axios from 'axios';
import { getStoredAuthHeader } from './authService';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5187';

const apiClient = axios.create({
  baseURL: API_BASE,
});

apiClient.interceptors.request.use((config) => {
  try {
    const header = getStoredAuthHeader();
    if (header) {
      config.headers = config.headers || {};
      (config.headers as any)['Authorization'] = header;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authCreds');
        }
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

