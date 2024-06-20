'use client';

import Link from 'next/link';

import Home from '@/assets/icons/home.svg';
import Instagram from '@/assets/icons/instagram.svg';
import Youtube from '@/assets/icons/youtube.svg';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '../ui/button';

export default function UserInfo() {
  return (
    <div className="flex min-h-[320px] items-end justify-between bg-slate-300 p-12">
      <div className="flex items-center gap-8">
        <Avatar className="h-[200px] w-[200px] shadow-xl">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Home />
            <Instagram />
            <Youtube />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">upn2n</h3>
          <p className="text-sm text-zinc-500">#java #spring #kotlin</p>
          <p className="text-md text-gray-600">
            판매중 <span>14</span>
          </p>
          <p className="text-md text-gray-700">여기, 내가 그대로 있어요.</p>
        </div>
      </div>

      <Link href={'/mypage/edit'}>
        <Button>프로필 수정</Button>
      </Link>
    </div>
  );
}
