'use client';

import Image from 'next/image';

import Logo from '@/assets/images/devooks_logo.png';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export default function RegisterSuccessDialog() {
  return (
    <Dialog>
      <DialogContent className="max-w-[400px]">
        <DialogHeader className="gap-4">
          <DialogTitle className="flex justify-center">
            <Image src={Logo} alt="devooks 로고" height={50} />
          </DialogTitle>
          <div className="flex items-center gap-5">
            <Separator className="shrink bg-gray-300" />
            <span className="w-3/5">회원가입</span>
            <Separator className="shrink bg-gray-300" />
          </div>
          회원가입을 축하드립니다.
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
