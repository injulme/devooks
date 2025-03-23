import Withdrawal from './WITHDRAWAL';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useGetProfile, useModifyProfile } from '@/services/member.hooks';
import { ModifyProfileRequest } from '@leesm0518/devooks-api';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';

import { useAuthStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

export default function Profile() {
  const categories = useCategoryStore((state) => state.categories);
  const userId = useAuthStore((state) => state.id);

  const router = useRouter();
  const { data: memberData } = useGetProfile(userId ?? '');
  const { mutate: patchMemberProfile } = useModifyProfile();

  const form = useForm<ModifyProfileRequest>({
    values: {
      nickname: memberData?.profile.nickname,
      email: memberData?.profile.email,
      phoneNumber: memberData?.profile.phoneNumber,
      favoriteCategoryIdList: memberData?.profile.favoriteCategoryIdList ?? [],
      introduction: memberData?.profile.introduction,
      blogLink: memberData?.profile.blogLink,
      instagramLink: memberData?.profile.instagramLink,
      youtubeLink: memberData?.profile.youtubeLink,
    } as ModifyProfileRequest,
  });

  const onSubmit = (data: ModifyProfileRequest) => {
    console.log('submit', data);

    patchMemberProfile({
      modifyProfileRequest: {
        ...data,
      },
    });
  };

  const [isWithdrawal, setIsWithdrawal] = useState<boolean>(false);

  return (
    <section className="relative max-w-screen-sm">
      {isWithdrawal ? (
        <Withdrawal />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: 전화번호 인증 로직 구현 필요 */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>전화번호</FormLabel>
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
                      options={categories}
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
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>자기소개</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blogLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>개인 블로그</FormLabel>
                  <FormControl>
                    <Input placeholder="입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>인스타그램</FormLabel>
                  <FormControl>
                    <Input placeholder="입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtubeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>유튜브</FormLabel>
                  <FormControl>
                    <Input placeholder="입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-8 text-center">
              <Button
                type="button"
                variant="secondary"
                className="mr-2"
                onClick={() => router.back()}
              >
                취소하기
              </Button>
              <Button type="submit">저장하기</Button>
            </div>
          </form>
        </Form>
      )}

      {!isWithdrawal && (
        <div className="absolute bottom-0 right-0">
          <Button
            type="button"
            variant="link"
            className="items-end p-0 text-gray-500"
            onClick={() => setIsWithdrawal(true)}
          >
            탈퇴하기
          </Button>
        </div>
      )}
    </section>
  );
}
