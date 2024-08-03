import Cookies from 'js-cookie';

export const AUTH_KEY = 'auth';
export const DEFAULT_AUTH = {
  accessToken: '',
  refreshToken: '',
  user: {
    name: '',
    email: '',
  },
};

enum TKey {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

function getToken(key: TKey, bearer: boolean) {
  const prefix = bearer ? 'Bearer ' : '';
  let cookieToken;
  try {
    const cookie = JSON.parse(Cookies.get(AUTH_KEY) as string) || {
      accessToken: '',
      refreshToken: '',
    };
    cookieToken = cookie[AUTH_KEY][key];
  } catch {
    cookieToken = undefined;
  }
  const accessToken: string | undefined = cookieToken;
  return accessToken ? `${prefix}${accessToken}` : accessToken;
}

function setToken(key: TKey, accessToken: string) {
  try {
    const auth = JSON.parse(Cookies.get(AUTH_KEY) as string);

    clearTokens();
    Cookies.set(
      AUTH_KEY,
      JSON.stringify({
        [AUTH_KEY]: {
          ...auth[AUTH_KEY],
          [key]: accessToken,
        },
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function getAccessToken({ bearer } = { bearer: false }): string | undefined {
  return getToken(TKey.accessToken, bearer);
}

export function setAccessToken(token: string): void {
  setToken(TKey.accessToken, token);
}

export function getRefreshToken({ bearer } = { bearer: false }): string | undefined {
  return getToken(TKey.refreshToken, bearer);
}

export function setRefreshToken(refreshToken: string): void {
  setToken(TKey.refreshToken, refreshToken);
}

export function setTokens(token: string, refreshToken: string) {
  setToken(TKey.accessToken, token);
  setToken(TKey.refreshToken, refreshToken);
}

export function clearTokens(): void {
  Cookies.set(AUTH_KEY, '');
}

// api level에서 로그아웃 처리
export function logout() {
  clearTokens();
  location.href = process.env.PUBLIC_URL + '/console/login';
}
