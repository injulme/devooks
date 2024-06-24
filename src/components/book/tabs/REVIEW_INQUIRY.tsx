'use client';

import { FaRegStar, FaStar } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ReviewInquiry() {
  return (
    <section>
      <Card className="flex flex-col gap-4 bg-slate-300 px-5 py-8 text-slate-800 shadow">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">리뷰</span>
          <div className="flex gap-1">
            <FaStar size={28} />
            <FaStar size={28} />
            <FaStar size={28} />
            <FaStar size={28} />
            <FaRegStar size={28} />
          </div>
          <span>4.0 (1297)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">문의</span>
          <span>132개</span>
        </div>
      </Card>
      <div>
        <div>
          <Button>전체</Button>
          <Button variant="secondary">리뷰</Button>
          <Button variant="secondary">문의</Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">글쓰기</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start">
            <DropdownMenuItem className="flex flex-col items-start">
              <div className="text-lg font-semibold">리뷰</div>
              <p className="text-sm text-muted-foreground">
                전자책을 구매한 이후에 리뷰를 남겨보세요.
              </p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start">
              <div className="text-lg font-semibold">문의</div>
              <p className="text-sm text-muted-foreground">
                전자책을 구매하기 전에 문의를 남겨보세요.
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
