import { SignupRequest, SignupResponse } from './type';

import api from '@/lib/api';

export async function postSignup({
  oauthId,
  oauthType,
  nickname,
  favoriteCategoryIdList,
}: SignupRequest): Promise<SignupResponse> {
  return await api.post('/api/v1/members/signup', {
    oauthId,
    oauthType,
    nickname,
    favoriteCategoryIdList,
  });
}
