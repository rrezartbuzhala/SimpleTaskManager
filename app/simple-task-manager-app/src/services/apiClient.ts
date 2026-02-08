import axios from 'axios';
import { getStoredAuthHeader } from './authService';

const API_BASE =  window.env?.VITE_API_BASE_URL ?? import.meta.env.VITE_API_BASE_URL;

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
    console.log('Interceptor caught error:', error);
    console.log('Error status:', error.response?.status);
    
    if (error.response && error.response.status === 401) {
      try {
        localStorage.removeItem('authCreds');
        console.log('authCreds removed from localStorage');
      } catch (e) {
        console.error('Failed to remove authCreds:', e);
      }
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

