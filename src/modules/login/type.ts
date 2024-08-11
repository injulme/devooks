type oauthType = 'NAVER' | 'GOOGLE' | 'KAKAO';

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
  tokenGroup: {
    accessToken: string;
    refreshToken: string;
  };
};
