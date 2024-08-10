'use client';

import Image from 'next/image';

import Google from '@/assets/icons/google.svg';
import Kakao from '@/assets/icons/kakao.svg';
import Naver from '@/assets/icons/naver.svg';
import Logo from '@/assets/images/devooks_logo.png';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { LoginType } from '@/constant/common';

type LoginDialogProps = {
  onSignin: (loginType: LoginType) => void;
};

export default function LoginDialog({ onSignin }: LoginDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>로그인</Button>
      </DialogTrigger>
      <ThemeToggle />
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
