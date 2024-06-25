import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ReasonsForWithdrawal = [
  { label: '사고싶은 책이 없어요', value: 'REASON_ONE' },
  { label: '오류가 자주 발생해요', value: 'REASON_TWO' },
  { label: '유사한 서비스를 찾았어요', value: 'REASON_THREE' },
  { label: '기타', value: 'OTHER' },
];

export default function Withdrawal() {
  const form = useForm();
  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  });
  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reasonCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>회원탈퇴 이유를 알려주세요.</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {ReasonsForWithdrawal.map((reason) => {
                    return (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={reason.value}
                      >
                        <FormControl>
                          <RadioGroupItem value={reason.value} />
                        </FormControl>
                        <FormLabel className="font-normal">{reason.label}</FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('reasonCode') === 'OTHER' && (
          <FormField
            control={form.control}
            name="reasons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>기타 사유 (선택)</FormLabel>
                <FormControl>
                  <Input placeholder="입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="certificateEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일 확인</FormLabel>
              <FormControl>
                <Input placeholder="입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className="bg-slate-100">
          <ul className="mx-8 my-4 flex list-disc flex-col gap-3 text-sm text-muted-foreground">
            <li>현재 사용중인 계정 정보는 회원 탈퇴 후 복구가 불가합니다.</li>
            <li>진행 중인 거래건이 있거나 페널티 조치 중인 경우 탈퇴 신청이 불가합니다.</li>
            <li>
              구매후기 및 답글은 탈퇴 시 자동 삭제되지 않습니다. 탈퇴 후에는 계정 정보가 삭제되어
              본인 확인이 불가하므로, 탈퇴 신청 전에 게시글 삭제를 요청해 주시기 바랍니다.
            </li>
          </ul>
        </Card>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              주의사항을 모두 확인하였습니다.
            </label>
          </div>
          <Button type="submit" variant="outline" disabled>
            회원 탈퇴
          </Button>
        </div>
      </form>
    </Form>
  );
}
