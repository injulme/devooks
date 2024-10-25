'use client';

import { Crown, Heart, MessageCircleMore, MessageSquareMore, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function Comment() {
  return (
    <div className="flex flex-col border-b py-4 first-of-type:border-t-2">
      <div className="flex items-center gap-3">
        <Avatar className="h-[32px] w-[32px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex w-full justify-between gap-1">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            in******* <div className="h-3 w-[1px] bg-gray-300" />
            2023.12.21
          </span>
          <span className="text-xs font-medium leading-none">
            <div className="flex items-center gap-1">
              <Star size={12} fill="yellow" strokeWidth={1} />
              <Star size={12} fill="yellow" strokeWidth={1} />
              <Star size={12} fill="yellow" strokeWidth={1} />
              <Star size={12} fill="yellow" strokeWidth={1} />
              <Star size={12} strokeWidth={1} />
            </div>
          </span>
        </div>
      </div>
      <p className="text-sm leading-5 text-gray-800">
        역사를 잊고 살아갈 순 없습니다.
        <br />
        정작 읽어야할 사람들은 안 읽는 것 같네요.
      </p>
      <div className="flex justify-end">
        <Button variant="link" size="sm">
          <MessageSquareMore size={20} strokeWidth={1.5} className="mr-1 scale-x-[-1]" />
          12
        </Button>
      </div>
    </div>
  );
}
