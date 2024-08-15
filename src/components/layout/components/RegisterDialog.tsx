'use client';

import { useState } from 'react';
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

import { SignupRequest } from '@/modules/member/type';

import { useRegisterStore } from '@/stores/useRegisterStore';

export default function RegisterDialog() {
  const store = useRegisterStore((state) => state);
  const form = useForm<SignupRequest>();
  const [agreeChecks, setAgreeChecks] = useState([false, false, false]);

  const [allAgreeCheck, setAllAgreeCheck] = useState(false);

  const onAllAgreeCheck = () => {
    setAllAgreeCheck(!allAgreeCheck);
    setAgreeChecks((prev) => prev.map(() => !allAgreeCheck));
  };

  const onAgreeCheck = (index: number) => {
    let agrees = agreeChecks.map((agree, idx) => (idx === index ? !agree : agree));

    setAgreeChecks([...agrees]);
  };

  const onJoinSubmit = (data: SignupRequest) => {
    console.log('on join submit', data);
    console.log('on join store', store);

    // TODO: multi-select 작업해서 카테고리 연결하면 끝!
  };

  return (
    <Dialog open={store.open} onOpenChange={store.onOpenChange}>
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
                name="nickname"
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
                name="favoriteCategories.0"
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
                  <Checkbox
                    id="all_terms"
                    checked={allAgreeCheck}
                    onCheckedChange={onAllAgreeCheck}
                  />
                  <Label htmlFor="all_terms">모두 동의합니다.</Label>
                </div>
                <Separator className="h-[0.5px] w-full bg-gray-300" />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms1"
                    checked={agreeChecks[0]}
                    onCheckedChange={() => onAgreeCheck(0)}
                  />
                  <Label htmlFor="terms1">만 14세 이상입니다.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms2"
                    checked={agreeChecks[1]}
                    onCheckedChange={() => onAgreeCheck(1)}
                  />
                  <Label htmlFor="terms2">서비스 이용약관에 동의합니다.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms3"
                    checked={agreeChecks[2]}
                    onCheckedChange={() => onAgreeCheck(2)}
                  />
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
