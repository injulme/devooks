'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ApiError, MEMBER4041 } from '@/lib/api-error';

import { usePostLogin } from '@/modules/login/hooks/usePostLogin';
import { OauthType } from '@/modules/login/type';

import { useRegisterStore } from '@/stores/useRegisterStore';

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

export default function ({ params, searchParams }: Props) {
  const router = useRouter();
  const onOpenChange = useRegisterStore((state) => state.onOpenChange);
  const oauthType = params.oauthType.toUpperCase() as OauthType;

  const { code: authorizationCode } = searchParams;
  console.table({ authorizationCode, oauthType });
  const { mutateAsync: login } = usePostLogin();

  useEffect(() => {
    if (!oauthType || !authorizationCode) return;
    login({ authorizationCode: authorizationCode, oauthType: oauthType })
      .then((response) => console.log('login response:: ', response))
      .catch((error) => {
        const errorResponse: ApiError = error.response.data;
        if (!errorResponse) return;
        if (errorResponse.status === 404) {
          if (errorResponse.code === MEMBER4041) {
            // 회원가입 하기
            console.log('login error!! ', errorResponse);
            router.push('/');
            onOpenChange({
              open: true,
              oauthId: errorResponse.message.oauthId,
              oauthType: oauthType,
            });
          }
        }
      });
  }, [oauthType, authorizationCode]);
  return <div></div>;
}
