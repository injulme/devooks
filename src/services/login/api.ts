import { LoginRequest, LoginResponse } from './type';

import axios from 'axios';

export async function postLogin({
  authorizationCode,
  oauthType,
}: LoginRequest): Promise<LoginResponse> {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/auth/login', {
    authorizationCode,
    oauthType,
  });
  return data;
}
