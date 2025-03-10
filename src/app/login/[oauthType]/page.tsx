'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { usePostLogin } from '@/services/login/hooks/usePostLogin';
import { OauthType } from '@/services/login/type';

import { ApiError, MEMBER4041 } from '@/lib/api-error';

import { useAuthStore, useSignupStore, useTokenStore } from '@/stores/auth-store';

type OauthTypeParams = {
  oauthType: OauthType;
};

type OauthTypeSearchParams = {
  code: string;
};
interface Props {
  params: OauthTypeParams;
  searchParams: OauthTypeSearchParams;
}

export default function LoginByOauthType({ params, searchParams }: Props) {
  const router = useRouter();
  const signup = useSignupStore((state) => state);
  const updateToken = useTokenStore((state) => state.updateToken);
  const updateAuth = useAuthStore((state) => state.updateAuth);
  const oauthType = params.oauthType.toUpperCase() as OauthType;

  const { code: authorizationCode } = searchParams;
  const { mutateAsync: login } = usePostLogin();

  useEffect(() => {
    if (!oauthType || !authorizationCode) return;
    login({ authorizationCode: authorizationCode, oauthType: oauthType })
      .then((response) => {
        console.log('login response:: ', response);
        updateAuth(response.member);
        updateToken(response.tokenGroup);
        router.push('/');
      })

      .catch((error) => {
        const errorResponse: ApiError = error.response.data;
        if (!errorResponse) return;
        if (errorResponse.status === 404) {
          if (errorResponse.code === MEMBER4041) {
            // 회원가입 하기
            console.log('login error!! ', errorResponse);
            router.push('/');
            signup.onOpenChange(true);
            // TODO: 나중에 수정 필요
            let obj = JSON.parse(errorResponse.message) as { oauthId: string };
            signup.updateSignup({
              oauthId: obj.oauthId,
              oauthType: oauthType,
            });
          }
        }
      });
  }, [oauthType, authorizationCode]);
  return <div></div>;
}
