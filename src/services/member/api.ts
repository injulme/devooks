import { LoginResponse } from '../login/type';
import {
  MemberImageReqeust,
  MemberImageResponse,
  MemberProfile,
  MemberProfileUpdateRequest,
  SignupRequest,
  SignupResponse,
} from './type';

import api from '@/lib/api';

/** 회원가입 */
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

/** 프로필 조회 */
export async function GET_member_profile_by_id(memberId: string): Promise<MemberProfile> {
  const { data } = await api.get(`/api/v1/members/${memberId}/profile`);
  return data;
}

/** 프로필 수정 */
export async function PATCH_member_profile(
  profileData: MemberProfileUpdateRequest,
): Promise<LoginResponse['member']> {
  const { data } = await api.patch(`/api/v1/members/profile`, profileData);
  return data;
}

/** 프로필 사진 수정 */
export async function PATCH_member_image(
  imageData: MemberImageReqeust,
): Promise<MemberImageResponse> {
  const { data } = await api.patch(`/api/v1/members/image`, imageData);
  return data;
}
