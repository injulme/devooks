'use client';

import { FaRegStar, FaStar } from 'react-icons/fa';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { BookCategoryType } from '@/constant/common';

export default function Comment() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <Avatar className="h-[40px] w-[40px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium leading-none">
                <div className="flex items-center gap-1">
                  <FaStar size={12} />
                  <FaStar size={12} />
                  <FaStar size={12} />
                  <FaStar size={12} />
                  <FaRegStar size={12} />
                  <span>4.0</span>
                </div>
              </span>
              <span className="text-sm text-muted-foreground">이상민 | 2023.12.21 12:43</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="leading-7">
          The king, seeing how much happier his subjects were, realized the error of his ways and
          repealed the joke tax.
        </p>
      </CardContent>
    </Card>
  );
}
