import { useForm } from 'react-hook-form';

import { z } from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Account() {
  const form = useForm();

  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <section className="max-w-screen-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>실명</FormLabel>
                <FormControl>
                  <Input placeholder="실명" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>출금 은행</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="출금 은행" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank01">농협중앙회</SelectItem>
                        <SelectItem value="bank02">국민은행</SelectItem>
                        <SelectItem value="bank03">토스뱅크</SelectItem>
                        <SelectItem value="bank04">카카오뱅크</SelectItem>
                        <SelectItem value="bank05">신협은행</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>출금 계좌</FormLabel>
                  <FormControl>
                    <Input placeholder="출금 계좌" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-8 text-center">
            <Button type="submit">인증하기</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
