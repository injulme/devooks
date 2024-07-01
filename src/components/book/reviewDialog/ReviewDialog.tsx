'use client';

import { FaRegStar, FaStar } from 'react-icons/fa';

import { DialogTriggerProps } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ReviewDialogProps = {
  triggerComponent: DialogTriggerProps['children'];
};
export default function ReviewDialog({ triggerComponent }: ReviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>리뷰</DialogTitle>
        </DialogHeader>
        <Label>평점</Label>
        <div className="flex gap-1">
          <FaStar size={28} />
          <FaStar size={28} />
          <FaStar size={28} />
          <FaStar size={28} />
          <FaRegStar size={28} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="review_content">내용</Label>
          <Input id="review_content" type="text" />
        </div>
        <DialogFooter className="justify-center sm:justify-center">
          <Button type="submit">등록하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
