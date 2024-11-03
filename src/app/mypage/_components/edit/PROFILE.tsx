import Withdrawal from './WITHDRAWAL';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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

export default function Profile() {
  const form = useForm();

  const onSubmit = () => {
    console.log('submit');
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
              name="username"
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
              name="username"
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
            <FormField
              control={form.control}
              name="username"
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
              name="username"
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
            <FormField
              control={form.control}
              name="username"
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
              name="username"
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
              name="username"
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
              name="username"
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
