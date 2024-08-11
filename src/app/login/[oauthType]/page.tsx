'use client';

import { useEffect } from 'react';

import { LoginType } from '@/constant/common';

import { usePostLogin } from '@/modules/login/hooks/usePostLogin';

type OauthTypeParams = {
  oauthType: LoginType;
};

type OauthTypeSearchParams = {
  code: string;
};
interface Props {
  params: OauthTypeParams;
  searchParams: OauthTypeSearchParams;
}

export default function ({ params, searchParams }: Props) {
  const oauthType = params.oauthType.toUpperCase() as LoginType;

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
