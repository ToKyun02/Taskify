import axios from 'axios';
import { getToken } from '@/actions/session';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ssr용 interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
