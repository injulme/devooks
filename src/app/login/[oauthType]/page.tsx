'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { usePostLogin } from '@/services/login/hooks/usePostLogin';
import { OauthType } from '@/services/login/type';

import { ApiError, MEMBER4041 } from '@/lib/api-error';

import { useAuthStore, useRegisterStore, useTokenStore } from '@/stores/auth-store';

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
  const reigster = useRegisterStore((state) => state);
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
            reigster.onOpenChange(true);
            reigster.updateRegister({
              oauthId: errorResponse.message.oauthId,
              oauthType: oauthType,
            });
          }
        }
      });
  }, [oauthType, authorizationCode]);
  return <div></div>;
}
