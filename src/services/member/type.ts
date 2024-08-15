import { LoginResponse, OauthType } from '../login/type';

export type SignupRequest = {
  oauthId?: string;
  oauthType?: OauthType | null;
  nickname?: string;
  favoriteCategories?: string[];
};

export type SignupResponse = LoginResponse;
