import { memberAPI } from './api-instance';

import {
  MemberApiModifyAccountInfoRequest,
  MemberApiModifyProfileImageRequest,
  MemberApiModifyProfileRequest,
  MemberApiSignUpRequest,
  MemberApiWithdrawMemberRequest,
} from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 회원가입 */
export const useSignUp = () => {
  return useMutation({
    mutationKey: [memberAPI.signUp.name],
    mutationFn: (data: MemberApiSignUpRequest) => memberAPI.signUp(data),
  });
};

/** 회원 탈퇴 */
export const useWithdrawMember = () => {
  return useMutation({
    mutationKey: [memberAPI.withdrawMember.name],
    mutationFn: (data: MemberApiWithdrawMemberRequest) => memberAPI.withdrawMember(data),
  });
};

/** 프로필 수정 */
export const useModifyProfile = () => {
  return useMutation({
    mutationKey: [memberAPI.modifyProfile.name],
    mutationFn: (data: MemberApiModifyProfileRequest) => memberAPI.modifyProfile(data),
  });
};

/** 프로필 사진 수정 */
export const useModifyProfileImage = () => {
  return useMutation({
    mutationKey: [memberAPI.modifyProfileImage.name],
    mutationFn: (data: MemberApiModifyProfileImageRequest) => memberAPI.modifyProfileImage(data),
  });
};

/** 계좌 정보 수정 */
export const useModifyAccountInfo = () => {
  return useMutation({
    mutationKey: [memberAPI.modifyAccountInfo.name],
    mutationFn: (data: MemberApiModifyAccountInfoRequest) => memberAPI.modifyAccountInfo(data),
  });
};

/** 프로필 조회 */
export const useGetProfile = (memberId: string) => {
  return useQuery({
    queryKey: [memberAPI.getProfile.name, memberId],
    queryFn: () => memberAPI.getProfile({ memberId }),
    select: ({ data }) => data,
    enabled: !!memberId,
  });
};
