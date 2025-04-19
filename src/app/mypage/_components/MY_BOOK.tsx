import { useState } from 'react';

import Image from 'next/image';

import { Download, Eye, MessageCircle, Search, Star } from 'lucide-react';

import Comment from '@/app/book/_components/tabs/comment';

import cover1 from '@/assets/images/cover1.png';

import AvatarProfile from '@/components/avatar-profile/avatar-profile';
import { Badge } from '@/components/ui/badge';
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
      <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="search-field" className="min-w-[80px] font-medium text-slate-700">
            책 검색
          </Label>
          <div className="relative flex-1">
            <Input
              type="text"
              id="search-field"
              placeholder="책 이름을 입력해 주세요."
              className="border-slate-200 pl-10 focus-visible:ring-slate-500"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
          </div>
          <Button className="min-w-[100px] bg-slate-700 hover:bg-slate-600">검색</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {dummy.map((d) => {
          return (
            <Card
              className="overflow-hidden border-slate-200 transition-all duration-300 hover:border-slate-300"
              key={d}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className="relative h-[200px] w-[140px] flex-shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={cover1}
                      alt="썸네일"
                      className="h-full w-full object-cover"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute right-2 top-2">
                      <Badge className="bg-slate-700 text-white">판매중</Badge>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <div className="mb-1 flex flex-wrap gap-1">
                            <Badge
                              variant="outline"
                              className="border-slate-200 bg-blue-50 text-xs text-slate-700"
                            >
                              #소설
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-slate-200 bg-indigo-50 text-xs text-slate-700"
                            >
                              #판타지
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-slate-200 bg-violet-50 text-xs text-slate-700"
                            >
                              #모험
                            </Badge>
                          </div>
                          <h2 className="text-xl font-bold text-slate-800">
                            The People of the Kingdom
                          </h2>
                        </div>
                        <span className="whitespace-nowrap text-xs text-slate-500">
                          등록일 2023.01.07
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <AvatarProfile
                          size="sm"
                          className="border-2 border-slate-200"
                          src={'https://github.com/shadcn.png'}
                          fallback={'CN'}
                        />
                        <h3 className="text-sm font-medium text-slate-700">upn2n</h3>
                        <div className="ml-auto flex items-center text-slate-600">
                          <Star className="mr-1 h-4 w-4 fill-slate-500 text-slate-500" />
                          <span className="text-sm font-medium">4.5</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                      <h4 className="text-lg font-bold text-slate-800">
                        3,980,000원
                        <span className="ml-1 text-xs font-normal text-slate-500">(VAT 포함)</span>
                      </h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsDrawerOpen(true)}
                          className="border-slate-200 text-slate-700 hover:bg-slate-50"
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          리뷰
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-200 text-slate-700 hover:bg-slate-50"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          미리보기
                        </Button>
                        <Button size="sm" className="bg-slate-700 hover:bg-slate-600">
                          <Download className="mr-1 h-4 w-4" />
                          다운로드
                        </Button>
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
        <SheetContent className="sm:max-w-1/2 w-1/2 border-l border-slate-200 bg-white">
          <SheetHeader className="mb-4">
            <SheetTitle className="font-serif text-2xl text-slate-800">
              The People of the Kingdom
            </SheetTitle>
            <div className="h-[240px] w-full overflow-hidden rounded-lg shadow-md">
              <Image src={cover1} alt="책 표지" className="h-full w-full object-cover" />
            </div>
          </SheetHeader>
          <ScrollArea className="h-3/4 space-y-4 pb-12 pr-4">
            {dummy.map((i) => {
              return (
                <Card key={i} className="my-4 border-slate-200 bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AvatarProfile
                        size="sm"
                        src={'https://github.com/shadcn.png'}
                        fallback={'U'}
                      />
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <h4 className="font-medium text-slate-800">사용자</h4>
                          <div className="flex items-center text-slate-500">
                            <Star className="mr-1 h-4 w-4 fill-slate-500" />
                            <Star className="mr-1 h-4 w-4 fill-slate-500" />
                            <Star className="mr-1 h-4 w-4 fill-slate-500" />
                            <Star className="mr-1 h-4 w-4 fill-slate-500" />
                            <Star className="h-4 w-4 fill-slate-200" />
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">
                          정말 재미있게 읽었습니다. 다음 이야기가 기대됩니다!
                        </p>
                        <div className="mt-1 text-xs text-slate-400">2023.03.15</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </section>
  );
}
