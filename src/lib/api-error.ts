export interface ApiError {
  error: string;
  timestamp: number;
  status: number;
}

export const AUTH4001 = 'AUTH-400-1';
export const AUTH4002 = 'AUTH-400-2';

export const AUTH4013 = 'AUTH-401-3';
export const AUTH4014 = 'AUTH-401-4';
export const AUTH4015 = 'AUTH-401-5';

export const AUTH4031 = 'AUTH-403-1';
export const AUTH4032 = 'AUTH-403-2';

export const MEMBER4041 = 'MEMBER-404-1';

export const authApiErrorStatus = {
  [AUTH4001]: '인증 코드(authorizationCode)가 NULL이거나 빈 문자일 경우',
  [AUTH4002]: '인증 유형(oauthType)이 NAVER, KAKAO, GOOGLE 이 아닐 경우',

  [AUTH4013]: '네이버 로그인을 실패할 경우',
  [AUTH4014]: '카카오 로그인을 실패할 경우',
  [AUTH4015]: '구글 로그인을 실패할 경우',

  [AUTH4031]: '정지된 회원일 경우',
  [AUTH4032]: '탈퇴한 회원일 경우',

  [MEMBER4041]: '회원을 찾을 수 없는 경우 (message에 oauthId를 넣어서 응답)',
};