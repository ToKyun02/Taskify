import axios from 'axios';
import authStore from '@/stores/authStore';

const axiosHelper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const getAccessToken = () => {
  if (!window) return null;
  const accessToken = authStore.getState().accessToken;
  return accessToken;
};

axiosHelper.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosHelper;
