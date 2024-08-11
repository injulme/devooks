import { LoginRequest } from './type';

import api from '@/lib/api';

export async function postLogin({ authorizationCode, oauthType }: LoginRequest): Promise<void> {
  return await api({
    method: 'post',
    url: `/api/v1/auth/login`,
    data: { authorizationCode, oauthType },
  });
}
