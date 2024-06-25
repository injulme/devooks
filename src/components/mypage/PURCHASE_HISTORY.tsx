import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const dummy = Array(3)
  .fill({})
  .map((_, i) => i);

export default function PurchaseHistory() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Label htmlFor="search-field" className="min-w-[80px]">
          책 검색
        </Label>
        <Input type="text" id="search-field" placeholder="책 이름을 입력해 주세요." />
        <Button className="px-8">검색</Button>
      </div>
      <div className="flex flex-col gap-4">
        {dummy.map((d) => {
          return (
            <Card className="shadow-lg" key={d}>
              <CardContent className="mt-4">
                <p className="text-md mb-2 text-right text-muted-foreground">
                  주문일시 <span className="text-slate-900">2023.01.07 18:03</span>
                </p>
                <div className="flex w-full gap-5">
                  <div className="w-[240px] rounded-sm bg-slate-700 shadow">box {d}</div>
                  <div className="flex w-full flex-col">
                    <p className="text-sm text-zinc-500">#category #category #category</p>
                    <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                      The People of the Kingdom
                    </h2>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-[28px] w-[28px] shadow-xl">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h3 className="text-2xl font-semibold tracking-tight">upn2n</h3>
                    </div>
                    <div className="flex items-end justify-between">
                      <h4 className="text-md scroll-m-20 font-semibold tracking-tight">
                        3,980,000원{' '}
                        <span className="text-xs font-medium text-muted-foreground">
                          (VAT 포함)
                        </span>
                      </h4>
                      <div className="space-x-2">
                        <Button variant="outline">리뷰작성</Button>
                        <Button>미리보기</Button>
                        <Button>다운로드</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
