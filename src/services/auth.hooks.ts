import { authAPI } from './api-instance';

import {
  AuthApiCheckEmailRequest,
  AuthApiLoginRequest,
  AuthApiLogoutRequest,
  AuthApiReissueRequest,
} from '@leesm0518/devooks-api';
import { useMutation } from '@tanstack/react-query';

/** 로그인 */
export const useLogin = () => {
  return useMutation({
    mutationKey: [authAPI.login.name],
    mutationFn: (data: AuthApiLoginRequest) => authAPI.login(data),
  });
};

/** 로그아웃 */
export const useLogout = () => {
  return useMutation({
    mutationKey: [authAPI.logout.name],
    mutationFn: (data: AuthApiLogoutRequest) => authAPI.logout(data),
  });
};

/** 토큰 재발급 */
export const useReissue = () => {
  return useMutation({
    mutationKey: [authAPI.reissue.name],
    mutationFn: (data: AuthApiReissueRequest) => authAPI.reissue(data),
  });
};

/** 이메일 확인 */
export const useCheckEmail = () => {
  return useMutation({
    mutationKey: [authAPI.checkEmail.name],
    mutationFn: (data: AuthApiCheckEmailRequest) => authAPI.checkEmail(data),
  });
};
