'use client';

import { useForm } from 'react-hook-form';

import Image from 'next/image';

import Logo from '@/assets/images/devooks_logo.png';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type RegisterDialogProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<any>>;
};

export default function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const form = useForm();
  const onJoinSubmit = () => {
    console.log('on join submit');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader className="gap-4">
          <DialogTitle className="flex justify-center">
            <Image src={Logo} alt="devooks 로고" height={50} />
          </DialogTitle>
          <div className="flex items-center gap-5">
            <Separator className="shrink bg-gray-300" />
            <span className="w-3/5">회원가입</span>
            <Separator className="shrink bg-gray-300" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onJoinSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>관심 카테고리</FormLabel>
                    <FormControl>
                      <Input placeholder="입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Card className="space-y-3 p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="all_terms" />
                  <Label htmlFor="all_terms">모두 동의합니다.</Label>
                </div>
                <Separator className="h-[0.5px] w-full bg-gray-300" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms1" />
                  <Label htmlFor="terms1">만 14세 이상입니다.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms2" />
                  <Label htmlFor="terms2">서비스 이용약관에 동의합니다.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms3" />
                  <Label htmlFor="terms3">개인정보 수집/이용에 동의합니다.</Label>
                </div>
              </Card>

              <div className="text-center">
                <Button type="submit">회원가입</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
