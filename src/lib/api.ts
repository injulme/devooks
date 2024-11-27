import axios from 'axios';

import { useAuthStore, useTokenStore } from '@/stores/auth-store';

const tokenStore = useTokenStore.getState();
const reset = useAuthStore.getState().reset;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = tokenStore.accessToken;
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      reset();
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = tokenStore.refreshToken;

        const response = await axios.post(`/api/v1/auth/reissue`, {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        tokenStore.updateToken({
          accessToken,
          refreshToken: newRefreshToken,
        });

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        tokenStore.logout();
        reset();

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
