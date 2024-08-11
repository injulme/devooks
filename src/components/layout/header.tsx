'use client';

import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '@/assets/images/devooks_logo.png';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { OauthType } from '@/modules/login/type';

type LoginLinkParams = Record<OauthType, string>;

export default function Header() {
  const router = useRouter();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState<boolean>(false);

  const loginLinkParams: LoginLinkParams = {
    KAKAO: `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
    NAVER: `${process.env.NEXT_PUBLIC_NAVER_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}`,
    GOOGLE: `${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=profile`,
  };

  const onSignin = (oauthType: OauthType) => {
    router.push(loginLinkParams[oauthType]);
  };
  return (
    <header className="fixed top-0 z-50 flex h-[56px] w-full items-center justify-between gap-6 bg-white px-[16px] shadow">
      <Link href={'/'}>
        <Image src={Logo} alt="devooks 로고" height={40} />
      </Link>
      <Input />
      <Button variant="outline">
        <Link href="/book/add">책 등록</Link>
      </Button>

      <LoginDialog onSignin={onSignin} />
      <RegisterDialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen} />
    </header>
  );
}
