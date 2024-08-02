/** @post login request */
export type LoginRequest = {
  authorizationCode: string;
  oauthType: string;
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
