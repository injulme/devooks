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
      <div className="flex gap-2">
        <Label htmlFor="search-field">책 검색</Label>
        <Input type="text" id="search-field" placeholder="책 이름을 입력해 주세요." />
        <Button>검색</Button>
      </div>
      {dummy.map((d) => {
        return (
          <div key={d}>
            <Card>
              <CardDescription>주문일시 2023.01.07 18:03</CardDescription>
              <CardContent>
                <div>
                  <div className="h-[250px] bg-slate-700">box {d}</div>
                  <p className="text-sm text-zinc-500">#category #category #category</p>
                  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    The People of the Kingdom
                  </h2>
                  <Avatar className="h-[120px] w-[120px] shadow-xl">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-semibold tracking-tight">upn2n</h3>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    3,980,000원{' '}
                    <span className="text-sm font-medium text-muted-foreground">(VAT 포함)</span>
                  </h4>
                  <div>
                    <Button>리뷰작성</Button>
                  </div>
                  <div>
                    <Button>미리보기</Button>
                  </div>
                  <div>
                    <Button>다운로드</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </section>
  );
}
