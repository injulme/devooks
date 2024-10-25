'use client';

import Home from '@/assets/icons/home.svg';
import Instagram from '@/assets/icons/instagram.svg';
import Youtube from '@/assets/icons/youtube.svg';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export default function SellerProfileCard() {
  return (
    <Card className="p-4 shadow-lg">
      <div className="flex items-center gap-8">
        <Avatar className="h-[65px] w-[65px] shadow-xl">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Home />
            <Instagram />
            <Youtube />
          </div>
          <h3 className="text-xl font-semibold tracking-tight">upn2n</h3>
          <p className="text-sm text-gray-700">여기, 내가 그대로 있어요.</p>
        </div>
      </div>
    </Card>
  );
}
