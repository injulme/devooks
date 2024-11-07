import { LoginResponse, OauthType } from '../login/type';

export type SignupRequest = {
  oauthId?: string;
  oauthType?: OauthType | null;
  nickname?: string;
  favoriteCategoryIdList?: string[];
};

export type SignupResponse = LoginResponse;

export type MemberProfile = {
  memberId: string;
  nickname: string;
  profileImagePath: string;
  profile: {
    blogLink: string;
    instagramLink: string;
    youtubeLink: string;
    introduction: string;
  };
  favoriteCategoryIdList: string[];
};

export type MemberProfileUpdateRequest = {
  nickname: string;
  phoneNumber: string;
  blogLink: string;
  instagramLink: string;
  youtubeLink: string;
  introduction: string;
  favoriteCategoryIdList: string[];
  email: string;
};
