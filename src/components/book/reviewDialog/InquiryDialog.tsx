'use client';

import { DialogProps } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type InquiryDialogProps = {
  open: DialogProps['open'];
  onOpenChange: DialogProps['onOpenChange'];
};
export default function InquiryDialog({ open, onOpenChange }: InquiryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>문의</DialogTitle>
        </DialogHeader>
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
