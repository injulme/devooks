import Withdrawal from './WITHDRAWAL';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { EmailRequest } from '@/services/auth/type';
import { useGetMemberProfileById } from '@/services/member/hooks/useGetMemberProfileById';
import { usePatchMemberProfile } from '@/services/member/hooks/usePatchMemberProfile';
import { MemberProfileUpdateRequest } from '@/services/member/type';

import { Button } from '@/components/ui/button';
import { FacetedFilter } from '@/components/ui/faceted-filter';
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
import { Textarea } from '@/components/ui/textarea';

import { useAuthStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

type FormField = MemberProfileUpdateRequest & EmailRequest;

export default function Profile() {
  // TODO: @src/services/member/type.ts 파일에서 MemberProfile 타입과 MemberProfileUpdateRequest 타입을 확인하세요.
  const form = useForm<FormField>({
    defaultValues: {
      nickname: '',
      phoneNumber: '',
      blogLink: '',
      instagramLink: '',
      youtubeLink: '',
      introduction: '',
      favoriteCategoryIdList: [],
      email: '',
    },
  });
  const categories = useCategoryStore((state) => state.categories);
  const userId = useAuthStore((state) => state.id);

  const { data: memberData } = useGetMemberProfileById(userId);
  const { mutate: patchMemberProfile } = usePatchMemberProfile();

  const onSubmit = (data: FormField) => {
    console.log('submit', data);
    // patchMemberProfile(data);
  };

  const [isWithdrawal, setIsWithdrawal] = useState<boolean>(false);

  useEffect(() => {
    if (!memberData) return;
    form.setValue('nickname', memberData.nickname);
    // form.setValue('email', memberData.email);

    form.setValue('favoriteCategoryIdList', memberData.favoriteCategoryIdList);
    form.setValue('introduction', memberData.profile.introduction);
    form.setValue('blogLink', memberData.profile.blogLink);
    form.setValue('instagramLink', memberData.profile.instagramLink);
    form.setValue('youtubeLink', memberData.profile.youtubeLink);
  }, [memberData]);

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
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
              render={({ field }) => {
                // console.log('field', field.value);
                return (
                  <FormItem>
                    {/* <FormLabel>관심 카테고리</FormLabel> */}
                    <FormControl>
                      <FacetedFilter
                        title="관심 카테고리"
                        options={categories || []}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        // {...field}
                      />
                      {/* <MultiSelect
                        options={categories || []}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        // defaultValue={[
                        //   '335e249c-ae39-4074-90d7-b3aaa7683d9b',
                        //   'e327d7df-01fa-4963-b65f-567b1379713f',
                        // ]}
                        placeholder="카테고리를 선택해주세요"
                        variant="inverted"
                        animation={2}
                        maxCount={5}
                        modalPopover
                        {...field}
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
              <Button type="submit">수정하기</Button>
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
