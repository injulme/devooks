import axios, { AxiosRequestConfig } from 'axios';

import { getAccessToken, getRefreshToken, logout, setTokens } from '@/lib/auth';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const initialConfig: AxiosRequestConfig = Object.freeze({
  baseURL: baseURL,
  timeout: 0,
});

function setBaseUrl(baseUrl: string): void {
  api.defaults.baseURL = baseUrl;
}

function setApiJwt(accessToken: string): void {
  const bearerToken = `Bearer ${accessToken}`;
  api.defaults.headers.common.Authorization = bearerToken;
}

function createApiInstance(bearerJwt = '') {
  const api = axios.create({
    ...initialConfig,
  });
  api.defaults.headers.common['Authorization'] = bearerJwt;
  return api;
}

export const api = createApiInstance(getAccessToken({ bearer: true }));

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    if (error === undefined) throw error;

    if (
      !error.request?.responseURL?.endsWith('/api/v1/auth/login') &&
      error.response?.status === 401
    ) {
      try {
        const { accessToken } = await refreshToken();
        const retryConfig = {
          ...error.config,
          headers: { ...error.config.headers, Authorization: `Bearer ${accessToken}` },
        };

        return api(retryConfig);
      } catch (error) {
        logout();
        return;
      }
    } else if (error.response?.status === 401 && !getAccessToken()) {
      logout();
      return;
    } else if (error) {
      const e = { ...error.response?.data, status: error.response?.status };
      throw e;
    }

    throw error;
  },
);

// refresh token api
export async function refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
  const refreshApi = createApiInstance(getRefreshToken({ bearer: true }));

  try {
    const result = await refreshApi({
      url: `/api/v1/auth/reissue`,
      method: 'get',
    });
    const { accessToken, refreshToken } = result.data;
    setTokens(accessToken, refreshToken);
    setApiJwt(accessToken);
    return result.data;
  } catch (error) {
    logout();
    throw error;
  }
}

export { setBaseUrl, setApiJwt };
export default api;
