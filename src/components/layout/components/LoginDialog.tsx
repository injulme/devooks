'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { OauthType } from '@/services/login/type';
import { CircleUserRound } from 'lucide-react';

import Google from '@/assets/icons/google.svg';
import Kakao from '@/assets/icons/kakao.svg';
import Naver from '@/assets/icons/naver.svg';
import Logo from '@/assets/images/devooks_logo.png';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

type LoginLinkParams = Record<OauthType, string>;

export default function LoginDialog() {
  const router = useRouter();

  const loginLinkParams: LoginLinkParams = {
    KAKAO: `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
    NAVER: `${process.env.NEXT_PUBLIC_NAVER_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}`,
    GOOGLE: `${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=profile`,
  };

  const onSignin = (oauthType: OauthType) => {
    router.push(loginLinkParams[oauthType]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CircleUserRound strokeWidth={1.5} size={16} /> 로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader className="gap-4">
          <DialogTitle className="flex justify-center">
            <Image src={Logo} alt="devooks 로고" height={50} />
          </DialogTitle>
          <div className="flex items-center gap-5">
            <Separator className="shrink bg-gray-300" />
            <div className="w-3/5">간편로그인</div>
            <Separator className="shrink bg-gray-300" />
          </div>
          <div className="flex justify-evenly">
            <button
              onClick={() => onSignin('NAVER')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-naver bg-brand-naver"
            >
              <Naver />
            </button>
            <button
              onClick={() => onSignin('KAKAO')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-kakao bg-brand-kakao"
            >
              <Kakao />
            </button>
            <button
              onClick={() => onSignin('GOOGLE')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-brand-google"
            >
              <Google />
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
