import { LoginResponse, OauthType } from '../login/type';

export type SignupRequest = {
  oauthId: string;
  oauthType: OauthType;
  nickname: string;
  favoriteCategories: string[];
};

export type SignupResponse = LoginResponse;
