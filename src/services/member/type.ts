import { LoginResponse, OauthType } from '../login/type';

export type SignupRequest = {
  oauthId?: string;
  oauthType?: OauthType | null;
  nickname?: string;
  favoriteCategoryIdList?: string[];
};

export type SignupResponse = LoginResponse;

export interface MemberProfile {
  // memberId: string;
  // nickname: string;
  // profileImagePath: string;
  // profile: {
  //   blogLink: string;
  //   instagramLink: string;
  //   youtubeLink: string;
  //   introduction: string;
  // };
  // favoriteCategoryIdList: string[];
  profile: {
    id: string;
    nickname: string;
    profileImagePath: string;
    favoriteCategoryIdList: string[];
    blogLink: string;
    instagramLink: string;
    youtubeLink: string;
    introduction: string;
    realName: string;
    bank: string;
    accountNumber: string;
    phoneNumber: string;
    email: string;
  };
}

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
