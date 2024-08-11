type oauthType = 'NAVER' | 'GOOGLE' | 'KAKAO';

type TokenGroupType = {
  accessToken: string | null;
  refreshToken: string | null;
};

/** @post login request */
export type LoginRequest = {
  authorizationCode: string;
  oauthType: oauthType;
};

/** @post login response */
export type LoginResponse = {
  member: {
    id: string;
    nickname: string;
    profileImagePath: string;
    authority: string;
  };
  tokenGroup: TokenGroupType;
};

export type ReissueRequest = Pick<TokenGroupType, 'refreshToken'>;

export type ReissueResponse = {
  tokenGroup: TokenGroupType;
};
