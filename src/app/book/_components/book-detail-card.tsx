'use client';

import { Crown, Heart, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function BookDetailCard() {
  return (
    <Card className="p-6 shadow-lg">
      <div className="mb-4 flex justify-between text-sm text-zinc-700">
        <Badge variant="sky" className="flex items-center gap-1">
          <Crown size={16} /> 주간 베스트
        </Badge>
        <span className="flex items-center gap-1">
          <Heart size={16} /> 123
        </span>
      </div>

      <div className="flex items-center gap-1 text-sm text-zinc-800">
        <Star size={16} />
        <Star size={16} />
        <Star size={16} />
        <Star size={16} />
        <Star size={16} /> 4.9 (37)
      </div>
      <p className="text-sm text-zinc-500">#category #category #category</p>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            3,980,000원{' '}
            <span className="text-sm font-medium text-muted-foreground">(VAT 포함)</span>
          </h4>
          <p className="text-gray-800">300 페이지</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">미리보기</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>미리보기</DialogTitle>
              <DialogDescription>The People of the Kingdom</DialogDescription>
            </DialogHeader>
            <div className="p-4">미리보기 이미지</div>
            <DialogFooter className="justify-center sm:justify-center">
              <Button type="submit">구매하기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button>구매하기</Button>
      </div>
    </Card>
  );
}
