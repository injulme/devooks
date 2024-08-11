'use client';

import { useEffect } from 'react';

import { usePostLogin } from '@/modules/login/hooks/usePostLogin';
import { OauthType } from '@/modules/login/type';

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
  const oauthType = params.oauthType.toUpperCase() as OauthType;

  const { code: authorizationCode } = searchParams;
  console.table({ authorizationCode, oauthType });
  const { mutateAsync: login } = usePostLogin();

  useEffect(() => {
    if (!oauthType || !authorizationCode) return;
    login({ authorizationCode: authorizationCode, oauthType: oauthType }).then((response) =>
      console.log('login response:: ', response),
    );
  }, [oauthType, authorizationCode]);
  return <div></div>;
}
