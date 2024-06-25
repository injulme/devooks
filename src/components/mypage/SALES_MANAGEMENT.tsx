import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const dummy = Array(4)
  .fill({})
  .map((_, i) => i);

export default function SalesManagement() {
  return (
    <section>
      <div className="flex gap-4">
        <Card className="w-[280px]">
          <CardHeader>
            <h4>출금 가능 수익금</h4>
          </CardHeader>
          <CardContent className="text-center text-lg font-semibold">0원</CardContent>
        </Card>
        <Card className="w-[280px]">
          <CardHeader>
            <h4>출금 완료 수익금</h4>
          </CardHeader>
          <CardContent className="text-center text-lg font-semibold">0원</CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <h2 className="mb-2 text-2xl font-bold">수익금 내역</h2>
          <div className="flex flex-col gap-4">
            {dummy.map((d) => {
              return (
                <Card className="flex gap-4 p-2" key={d}>
                  <div className="w-[200px] rounded-sm bg-slate-700">box</div>
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
          <h2 className="mb-2 text-2xl font-bold">출금 내역</h2>
          <div className="flex flex-col gap-4">
            {dummy.map((d) => {
              return (
                <Card className="flex gap-4 p-2" key={d}>
                  <div className="flex w-[120px] items-center justify-center rounded-sm bg-slate-400 text-xl font-semibold text-white">
                    대기
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label className="w-[80px]">출금 은행</Label>
                      <span className="text-slate-700">국민은행</span>
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
