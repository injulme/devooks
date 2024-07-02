'use client';

import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { DialogTriggerProps } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type InquiryDialogProps = {
  triggerComponent: DialogTriggerProps['children'];
};
type InquirySummary = {
  reviewContent: string;
  isSecure: boolean;
  password?: string;
};
export default function InquiryDialog({ triggerComponent }: InquiryDialogProps) {
  const form = useForm<InquirySummary>();

  const onSubmit = (data: InquirySummary) => {
    console.log('inquiry dialog on submit: ', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>문의</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reviewContent"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Input placeholder="내용을 입력해 주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="isSecure"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="isSecure"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="isSecure">비밀글</FormLabel>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className={cn({ hidden: !form.watch('isSecure') })}>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input placeholder="비밀번호" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <DialogFooter className="justify-center sm:justify-center">
              <Button type="submit">등록하기</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
