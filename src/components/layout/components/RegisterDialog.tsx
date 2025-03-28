'use client';

import RegisterSuccessDialog from './RegisterSuccessDialog';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { useSignUp } from '@/services/member.hooks';
import { SignUpRequest } from '@leesm0518/devooks-api';

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
import { MultiSelect } from '@/components/ui/multi-select';
import { Separator } from '@/components/ui/separator';

import { useSignupStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

export default function RegisterDialog() {
  const signup = useSignupStore((state) => state);
  const categories = useCategoryStore((state) => state.categories);
  const form = useForm<SignUpRequest>();
  const [agreeChecks, setAgreeChecks] = useState([false, false, false]);

  const [allAgreeCheck, setAllAgreeCheck] = useState(false);

  const { mutate: postSignup, isSuccess } = useSignUp();
  const onAllAgreeCheck = () => {
    setAllAgreeCheck(!allAgreeCheck);
    setAgreeChecks((prev) => prev.map(() => !allAgreeCheck));
  };

  const onAgreeCheck = (index: number) => {
    let agrees = agreeChecks.map((agree, idx) => (idx === index ? !agree : agree));

    setAgreeChecks([...agrees]);
  };
  const [isSubmitOk, setIsSubmitOk] = useState(false);

  useEffect(() => {
    const agreeOk = agreeChecks.every((agree) => agree);
    const nickname = form.watch('nickname');
    const favoriteCategoryIdList = form.watch('favoriteCategoryIdList');

    if (agreeOk && nickname && favoriteCategoryIdList && favoriteCategoryIdList.length > 0) {
      setIsSubmitOk(true);
    } else {
      setIsSubmitOk(false);
    }
  }, [agreeChecks, form]);

  const onJoinSubmit = (data: SignUpRequest) => {
    console.log('on join submit', data);

    signup.updateSignup(data);

    postSignup({
      signUpRequest: {
        ...data,
        oauthId: signup.oauthId || '',
        oauthType: signup.oauthType || 'KAKAO',
      },
    });
  };
  useEffect(() => {
    if (!isSuccess) return;
    signup.onOpenChange(false);
  }, [isSuccess]);

  // TODO: 카카오 회원가입 탈퇴시키고 다시 회원가입 테스트하기 register success dialog 잘 뜨는지 봐야됨
  return (
    <Fragment>
      {<RegisterSuccessDialog />}
      <Dialog open={signup.open} onOpenChange={() => signup.onOpenChange(!signup.open)}>
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
                  name="favoriteCategoryIdList"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>관심 카테고리</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={categories || []}
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? []}
                          placeholder="카테고리를 선택해주세요"
                          variant="inverted"
                          animation={2}
                          maxCount={5}
                          modalPopover
                          {...field}
                        />
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
                  <Button type="submit" disabled={!isSubmitOk}>
                    회원가입
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
