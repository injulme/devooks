'use client';

import Image from 'next/image';
import Link from 'next/link';

import { House } from 'lucide-react';

import Instagram from '@/assets/icons/instagram.webp';
import Youtube from '@/assets/icons/youtube.webp';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function UserInfo() {
  return (
    <div className="flex justify-between bg-slate-300 px-10 py-12">
      <div className="flex gap-8">
        <Avatar className="h-[120px] w-[120px] shadow-xl">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">upn2n</h3>
            <p className="text-xs text-zinc-500">#java #spring #kotlin</p>
          </div>

          <p className="text-sm text-gray-700">여기, 내가 그대로 있어요.</p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer rounded-full bg-white p-2 shadow-lg">
            <House className="stroke-slate-500" />
          </div>
          <div className="cursor-pointer rounded-full bg-white p-2 shadow-lg">
            <Image src={Instagram} alt="instagram logo" className="h-6 w-6" />
          </div>
          <div className="cursor-pointer rounded-full bg-white p-2 shadow-lg">
            <Image src={Youtube} alt="youtube logo" className="h-6 w-6" />
          </div>
        </div>
        <Link href={'/mypage/edit'}>
          <Button size="sm" variant="secondary">
            프로필 수정
          </Button>
        </Link>
      </div>
    </div>
  );
}
