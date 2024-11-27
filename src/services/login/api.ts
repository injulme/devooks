import { LoginRequest, LoginResponse } from './type';

import axios from 'axios';

export async function postLogin({
  authorizationCode,
  oauthType,
}: LoginRequest): Promise<LoginResponse> {
  const { data } = await axios.post('/api/v1/auth/login', {
    authorizationCode,
    oauthType,
  });
  return data;
}
