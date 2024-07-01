'use client';
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

import { visibleLoginState } from '@/states';
import { Separator } from '@radix-ui/react-separator';
import { useRecoilState } from 'recoil';

import Google from '@/assets/icons/google.svg';
import Kakao from '@/assets/icons/kakao.svg';
import Naver from '@/assets/icons/naver.svg';
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

import { LoginType } from '@/constant/common';

export default function Header() {
  const form = useForm();
  const [visibleLogin, setVisibleLogin] = useRecoilState(visibleLoginState);
  const [isJoinPopup, setIsJoinPopup] = useState<boolean>(false);
  const onJoinPopupOpen = (loginType: LoginType) => {
    setVisibleLogin(false);
    setIsJoinPopup(true);
  };
  const onJoinSubmit = () => {
    console.log('on join submit');
  };

  return (
    <header className="fixed top-0 z-50 flex h-[56px] w-full items-center justify-between gap-6 bg-white px-[16px] shadow">
      <Link href={'/'}>
        <Image src={Logo} alt="devooks 로고" height={40} />
      </Link>
      <Input />
      <Button onClick={() => setVisibleLogin(true)}>로그인</Button>
      <Dialog open={visibleLogin} onOpenChange={setVisibleLogin}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader className="gap-4">
            <DialogTitle className="flex justify-center">
              <Image src={Logo} alt="devooks 로고" height={50} />
            </DialogTitle>
            <div className="flex items-center gap-5">
              <Separator className="my-4 h-[1px] w-full bg-gray-300" />
              <span className="w-3/5">간편로그인</span>
              <Separator className="my-4 h-[1px] w-full bg-gray-300" />
            </div>
            <div className="flex justify-evenly">
              <button
                onClick={() => onJoinPopupOpen('NAVER')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-naver bg-brand-naver"
              >
                <Naver />
              </button>
              <button
                onClick={() => onJoinPopupOpen('KAKAO')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-kakao bg-brand-kakao"
              >
                <Kakao />
              </button>
              <button
                onClick={() => onJoinPopupOpen('GOOGLE')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-brand-google"
              >
                <Google />
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={isJoinPopup} onOpenChange={setIsJoinPopup}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader className="gap-4">
            <DialogTitle className="flex justify-center">
              <Image src={Logo} alt="devooks 로고" height={50} />
            </DialogTitle>
            <div className="flex items-center gap-5">
              <Separator className="my-4 h-[1px] w-full bg-gray-300" />
              <span className="w-3/5">회원가입</span>
              <Separator className="my-4 h-[1px] w-full bg-gray-300" />
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
    </header>
  );
}
