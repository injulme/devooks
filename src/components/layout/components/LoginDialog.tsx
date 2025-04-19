'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { LoginRequestOauthTypeEnum } from '@leesm0518/devooks-api';
import { BookOpen } from 'lucide-react';

import Google from '@/assets/icons/google.svg';
import Kakao from '@/assets/icons/kakao.svg';
import Naver from '@/assets/icons/naver.svg';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

type LoginLinkParams = Record<LoginRequestOauthTypeEnum, string>;

export default function LoginDialog() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<LoginRequestOauthTypeEnum | null>(null);

  const loginLinkParams: LoginLinkParams = {
    KAKAO: `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
    NAVER: `${process.env.NEXT_PUBLIC_NAVER_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}`,
    GOOGLE: `${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_API_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=profile`,
  };

  const onSignin = (oauthType: LoginRequestOauthTypeEnum) => {
    setIsLoading(oauthType);
    setTimeout(() => {
      router.push(loginLinkParams[oauthType]);
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-6 border-2 border-amber-600 bg-white text-amber-600 transition-all duration-300 hover:bg-amber-50"
        >
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md overflow-hidden rounded-xl border-0 p-0 shadow-2xl">
        <div className="bg-amber-600 p-6 text-white">
          <div className="mb-4 flex items-center justify-center gap-2">
            <BookOpen className="h-8 w-8" />
            <span className="text-3xl font-bold">readit</span>
          </div>
          <DialogTitle className="mb-2 text-center text-2xl font-bold">환영합니다!</DialogTitle>
          <DialogDescription className="text-center text-amber-100">
            로그인하고 다양한 전자책의 세계를 경험하세요
          </DialogDescription>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Separator className="shrink bg-gray-200" />
            <span className="whitespace-nowrap text-sm font-medium text-gray-500">간편 로그인</span>
            <Separator className="shrink bg-gray-200" />
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => onSignin('NAVER')}
              disabled={isLoading !== null}
              className="relative h-12 w-full justify-start bg-brand-naver px-4 font-medium text-white transition-all hover:bg-opacity-90"
            >
              <div className="absolute left-4 flex items-center justify-center">
                <Naver className="h-5 w-5" />
              </div>
              <span className="mx-auto">
                {isLoading === 'NAVER' ? '네이버로 로그인 중...' : '네이버로 로그인'}
              </span>
            </Button>

            <Button
              onClick={() => onSignin('KAKAO')}
              disabled={isLoading !== null}
              className="relative h-12 w-full justify-start bg-brand-kakao px-4 font-medium text-[#3A1D1D] transition-all hover:bg-opacity-90"
            >
              <div className="absolute left-4 flex items-center justify-center">
                <Kakao className="h-5 w-5" />
              </div>
              <span className="mx-auto">
                {isLoading === 'KAKAO' ? '카카오로 로그인 중...' : '카카오로 로그인'}
              </span>
            </Button>

            <Button
              onClick={() => onSignin('GOOGLE')}
              disabled={isLoading !== null}
              className="relative h-12 w-full justify-start border border-gray-300 bg-white px-4 font-medium text-gray-800 transition-all hover:bg-gray-50"
            >
              <div className="absolute left-4 flex items-center justify-center">
                <Google className="h-5 w-5" />
              </div>
              <span className="mx-auto">
                {isLoading === 'GOOGLE' ? '구글로 로그인 중...' : '구글로 로그인'}
              </span>
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <span>아직 계정이 없으신가요? </span>
            <span className="cursor-pointer font-medium text-amber-600 hover:underline">
              회원가입
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
