import { Banknote, Gem, ReceiptText } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const dummy = Array(4)
  .fill({})
  .map((_, i) => i);

export default function SalesManagement() {
  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">출금 가능 수익금</CardTitle>
            <TooltipProvider delayDuration={100}>
              <Tooltip delayDuration={100} open={true}>
                <TooltipTrigger>
                  <Gem className="h-4 w-4 stroke-cyan-500 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="text-xs" variant="info">
                  출금하기
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231 원</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 출금 완료</CardTitle>
            <TooltipProvider delayDuration={100}>
              <Tooltip delayDuration={100} open={true}>
                <TooltipTrigger>
                  <ReceiptText className="h-4 w-4 stroke-teal-500 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="text-xs" variant="success">
                  현금영수증 발행
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231 원</div>
            <p className="mt-1 text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <h5 className="mb-2 text-xl font-bold">수익금 내역</h5>
          <div className="flex flex-col gap-4">
            {dummy.map((d) => {
              return (
                <Card className="p-2" key={d}>
                  <div className="flex flex-col justify-between">
                    <h4 className="text-md font-semibold">The People of the Kingdom</h4>
                    <div className="mt-12">
                      <div className="flex items-center">
                        <Label className="w-[80px]">수익금</Label>
                        <span className="font-semibold">22,500원</span>
                      </div>
                      <div className="flex items-center">
                        <Label className="w-[80px]">주문일시</Label>
                        <span className="text-slate-700">2023.01.07 18:53</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-xl font-bold">출금 내역</h5>
          <div className="flex flex-col gap-4">
            {dummy.map((d) => {
              return (
                <Card className="p-2" key={d}>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label className="min-w-[80px] max-w-[80px]">출금 은행</Label>
                      <div className="flex w-full items-center justify-between">
                        <span className="text-slate-700">국민은행</span>
                        <Badge variant="secondary">대기</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Label className="w-[80px]">출금 계좌</Label>
                      <span className="text-slate-700">123-1234-1234</span>
                    </div>
                    <div className="flex items-center">
                      <Label className="w-[80px]">수익금</Label>
                      <span className="font-semibold">22,500원</span>
                    </div>
                    <div className="flex items-center">
                      <Label className="w-[80px]">요청일시</Label>
                      <span className="text-slate-700">2023.01.07 12:12</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
