import { LoginResponse } from '../login/type';
import { MemberProfile, MemberProfileUpdateRequest, SignupRequest, SignupResponse } from './type';

import api from '@/lib/api';

export async function POST_signup({
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

export async function GET_member_profile_by_id(memberId: string): Promise<MemberProfile> {
  const { data } = await api.get(`/api/v1/members/${memberId}/profile`);
  return data;
}

export async function PATCH_member_profile(
  profileData: MemberProfileUpdateRequest,
): Promise<LoginResponse['member']> {
  const { data } = await api.patch(`/api/v1/members/profile`, profileData);
  return data;
}
