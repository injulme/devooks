'use client';

import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import { codeToOptions } from '@/lib/utils';

import Heart from '@/assets/icons/heart.svg';
import Home from '@/assets/icons/home.svg';
import Instagram from '@/assets/icons/instagram.svg';
import Star from '@/assets/icons/star.svg';
import Youtube from '@/assets/icons/youtube.svg';
import cover1 from '@/assets/images/cover1.png';
import cover2 from '@/assets/images/cover2.png';
import cover3 from '@/assets/images/cover3.png';
import cover4 from '@/assets/images/cover4.png';
import cover5 from '@/assets/images/cover5.png';
import DummyImage from '@/assets/images/dummy_img2.jpg';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BookDetailTabTypeCode } from '@/constant/common';

type PageParams = {
  id: string;
};
const bookTabs = codeToOptions(BookDetailTabTypeCode);

export default function ({ params }: { params: PageParams }) {
  const [selectTab, setSelectTab] = useState('REVIEW_INQUIRY');
  const DynamicComponent = dynamic(() => import(`@/components/book/tabs/${selectTab}`), {
    loading: () => <div>loading...</div>,
  });
  const images = [cover1, cover2, cover3, cover4, cover5];
  return (
    <section className="grid grid-cols-5 gap-4">
      <div className="col-span-3 flex flex-col gap-8">
        <div className="h-[880px]">
          <Image
            src={DummyImage}
            alt="썸네일"
            className="mb-4 h-[430px] w-full rounded bg-no-repeat object-cover"
          />
          <Carousel opts={{ loop: true }} className="rounded">
            <CarouselContent>
              {images.map((image, index) => {
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="h-[330px] bg-slate-700">
                      <Image
                        src={image}
                        alt={`cover_${index}`}
                        className="h-full w-full rounded bg-no-repeat object-cover"
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-[32px]" />
            <CarouselNext className="right-[32px]" />
          </Carousel>
        </div>

        <div>
          <Tabs defaultValue={bookTabs[0].value} value={selectTab ?? bookTabs[0].value}>
            <TabsList>
              {bookTabs.map((menu) => {
                return (
                  <TabsTrigger
                    value={menu.value}
                    key={menu.value}
                    onClick={() => setSelectTab(menu.value)}
                  >
                    {menu.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {bookTabs.map((menu) => {
              return (
                <TabsContent value={menu.value} key={menu.value}>
                  <DynamicComponent />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
      <div className="col-span-2">
        <div className="sticky top-24 flex flex-col gap-8">
          <Card className="p-6 shadow-lg">
            <div className="flex justify-between text-sm text-zinc-700">
              <span className="mb-4 flex items-center gap-1">
                <Heart /> 123
              </span>
              <span>2024-06-21</span>
            </div>
            <p className="text-sm text-zinc-500">#category #category #category</p>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              The People of the Kingdom
            </h2>
            <div className="text-md flex items-center gap-1 text-zinc-800">
              <Star /> 4.9 (37)
            </div>

            <div className="mt-48 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  3,980,000원{' '}
                  <span className="text-sm font-medium text-muted-foreground">(VAT 포함)</span>
                </h4>
                <p className="text-gray-800">300 페이지</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IoSettingsOutline size={24} />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" align="start">
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="text-lg font-semibold">수정</div>
                    <p className="text-sm text-muted-foreground">전자책을 수정할 수 있습니다.</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="text-lg font-semibold">삭제</div>
                    <p className="text-sm text-muted-foreground">전자책을 삭제할 수 있습니다.</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">미리보기</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>미리보기</DialogTitle>
                    <DialogDescription>The People of the Kingdom</DialogDescription>
                  </DialogHeader>
                  <div className="p-4">미리보기 이미지</div>
                  <DialogFooter className="justify-center sm:justify-center">
                    <Button type="submit">구매하기</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button>구매하기</Button>
            </div>
          </Card>
          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-8">
              <Avatar className="h-[120px] w-[120px] shadow-xl">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Home />
                  <Instagram />
                  <Youtube />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">upn2n</h3>
                <p className="text-md text-gray-700">여기, 내가 그대로 있어요.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
