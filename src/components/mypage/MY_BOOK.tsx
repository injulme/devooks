import { useState } from 'react';

import Comment from '@/components/book/tabs/Comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

export default function MyBook() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
                  등록일시 <span className="text-slate-900">2023.01.07 18:03</span>
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
                        <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
                          리뷰보기
                        </Button>
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
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-1/2 w-1/2">
          <SheetHeader className="mb-4">
            <SheetTitle>The People of the Kingdom</SheetTitle>
            <div className="h-[240px] w-full rounded-sm bg-slate-700 shadow">box</div>
          </SheetHeader>
          <ScrollArea className="h-3/4 space-y-4 pb-12">
            {dummy.map((i) => {
              return (
                <div className="my-4" key={i}>
                  <Comment />
                </div>
              );
            })}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </section>
  );
}
