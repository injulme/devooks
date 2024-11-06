import { LoginResponse, OauthType } from '../login/type';

export type SignupRequest = {
  oauthId?: string;
  oauthType?: OauthType | null;
  nickname?: string;
  favoriteCategoryIdList?: string[];
};

export type SignupResponse = LoginResponse;
