'use client';

import RegisterSuccessDialog from './RegisterSuccessDialog';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { useSignUp } from '@/services/member.hooks';
import { SignUpRequest } from '@leesm0518/devooks-api';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Star, UserPlus } from 'lucide-react';

import Logo from '@/assets/images/devooks_logo.png';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

import { useSignupStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

type RegisterStep = 'terms' | 'profile' | 'categories';

export default function RegisterDialog() {
  const signup = useSignupStore((state) => state);
  const categories = useCategoryStore((state) => state.categories);
  const form = useForm<SignUpRequest>();
  const [agreeChecks, setAgreeChecks] = useState([false, false, false]);
  const [allAgreeCheck, setAllAgreeCheck] = useState(false);
  const [currentStep, setCurrentStep] = useState<RegisterStep>('terms');
  const [formProgress, setFormProgress] = useState(0);

  const { mutate: postSignup, isSuccess, isPending: isLoading } = useSignUp();

  // 프로그레스 바 업데이트
  useEffect(() => {
    const progress = currentStep === 'terms' ? 33 : currentStep === 'profile' ? 66 : 100;

    setFormProgress(progress);
  }, [currentStep]);

  const onAllAgreeCheck = () => {
    setAllAgreeCheck(!allAgreeCheck);
    setAgreeChecks((prev) => prev.map(() => !allAgreeCheck));
  };

  const onAgreeCheck = (index: number) => {
    const agrees = agreeChecks.map((agree, idx) => (idx === index ? !agree : agree));
    setAgreeChecks(agrees);
    setAllAgreeCheck(agrees.every((a) => a));
  };

  // 약관 동의 단계에서 다음 단계로 진행 가능한지 확인
  const canProceedFromTerms = agreeChecks.every((agree) => agree);

  // 프로필 단계에서 다음 단계로 진행 가능한지 확인
  const nickname = form.watch('nickname');
  const canProceedFromProfile = Boolean(nickname && nickname.length >= 2);

  // 카테고리 단계에서 회원가입 제출 가능한지 확인
  const favoriteCategoryIdList = form.watch('favoriteCategoryIdList');
  const canSubmitRegistration = Boolean(
    favoriteCategoryIdList && favoriteCategoryIdList.length > 0,
  );

  const handleNextStep = () => {
    if (currentStep === 'terms') {
      setCurrentStep('profile');
    } else if (currentStep === 'profile') {
      setCurrentStep('categories');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'profile') {
      setCurrentStep('terms');
    } else if (currentStep === 'categories') {
      setCurrentStep('profile');
    }
  };

  const onJoinSubmit = (data: SignUpRequest) => {
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

  return (
    <Fragment>
      {<RegisterSuccessDialog />}
      <Dialog open={signup.open} onOpenChange={() => signup.onOpenChange(!signup.open)}>
        <DialogContent className="max-w-md overflow-hidden rounded-xl border-0 p-0 shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="mb-4 flex justify-center">
              <Image src={Logo} alt="devooks 로고" height={60} className="drop-shadow-md" />
            </div>
            <DialogTitle className="mb-2 text-center text-2xl font-bold">
              {currentStep === 'terms' && '서비스 이용약관'}
              {currentStep === 'profile' && '프로필 설정'}
              {currentStep === 'categories' && '관심 카테고리 선택'}
            </DialogTitle>
            <Progress value={formProgress} className="mt-4 h-1 bg-blue-800" />
          </div>

          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onJoinSubmit)} className="space-y-4">
                {currentStep === 'terms' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="space-y-4 border border-slate-200 p-4 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="all_terms"
                          checked={allAgreeCheck}
                          onCheckedChange={onAllAgreeCheck}
                          className="data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor="all_terms" className="text-base font-medium">
                          모두 동의합니다
                        </Label>
                      </div>
                      <Separator className="h-[0.5px] w-full bg-gray-200" />

                      <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-slate-50">
                        <Checkbox
                          id="terms1"
                          checked={agreeChecks[0]}
                          onCheckedChange={() => onAgreeCheck(0)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor="terms1" className="text-sm">
                          만 14세 이상입니다 <span className="text-red-500">*</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-slate-50">
                        <Checkbox
                          id="terms2"
                          checked={agreeChecks[1]}
                          onCheckedChange={() => onAgreeCheck(1)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                        <div className="flex flex-col">
                          <Label htmlFor="terms2" className="text-sm">
                            서비스 이용약관에 동의합니다 <span className="text-red-500">*</span>
                          </Label>
                          <span className="cursor-pointer text-xs text-blue-600 hover:underline">
                            약관 보기
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 rounded-md p-2 hover:bg-slate-50">
                        <Checkbox
                          id="terms3"
                          checked={agreeChecks[2]}
                          onCheckedChange={() => onAgreeCheck(2)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                        <div className="flex flex-col">
                          <Label htmlFor="terms3" className="text-sm">
                            개인정보 수집/이용에 동의합니다 <span className="text-red-500">*</span>
                          </Label>
                          <span className="cursor-pointer text-xs text-blue-600 hover:underline">
                            약관 보기
                          </span>
                        </div>
                      </div>
                    </Card>

                    <div className="mt-6 flex justify-end">
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!canProceedFromTerms}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        다음 단계 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            닉네임 <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="사용하실 닉네임을 입력해 주세요"
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            2자 이상의 닉네임을 입력해 주세요. 실명이 아니어도 됩니다.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-6 flex justify-between">
                      <Button type="button" onClick={handlePreviousStep} variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> 이전
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!canProceedFromProfile}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        다음 단계 <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'categories' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormField
                      control={form.control}
                      name="favoriteCategoryIdList"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-2 flex items-center">
                            <FormLabel className="mb-0">
                              관심 카테고리 <span className="text-red-500">*</span>
                            </FormLabel>
                            <Star className="ml-2 h-4 w-4 text-amber-400" />
                          </div>
                          <FormControl>
                            <MultiSelect
                              options={categories || []}
                              onValueChange={field.onChange}
                              defaultValue={field.value ?? []}
                              placeholder="관심 있는 카테고리를 선택해 주세요"
                              variant="inverted"
                              animation={2}
                              maxCount={5}
                              modalPopover
                              {...field}
                              className="h-12"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            최대 5개까지 선택할 수 있으며, 나중에 변경할 수 있습니다.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-6 flex justify-between">
                      <Button type="button" onClick={handlePreviousStep} variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> 이전
                      </Button>
                      <Button
                        type="submit"
                        disabled={!canSubmitRegistration || isLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            처리 중... <span className="ml-2 animate-spin">⏳</span>
                          </span>
                        ) : (
                          <span className="flex items-center">
                            가입 완료 <UserPlus className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
