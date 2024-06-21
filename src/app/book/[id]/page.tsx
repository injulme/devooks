'use client';

import { useState } from 'react';

import Image from 'next/image';

import { codeToOptions } from '@/lib/utils';

import Heart from '@/assets/icons/heart.svg';
import Home from '@/assets/icons/home.svg';
import Instagram from '@/assets/icons/instagram.svg';
import Star from '@/assets/icons/star.svg';
import Youtube from '@/assets/icons/youtube.svg';
import DummyImage from '@/assets/images/dummy_img1.jpeg';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BookDetailTabTypeCode } from '@/constant/common';

type PageParams = {
  id: string;
};
const bookTabs = codeToOptions(BookDetailTabTypeCode);

export default function ({ params }: { params: PageParams }) {
  const [selectTab, setSelectTab] = useState('INTRODUCTION');
  return (
    <section className="grid grid-cols-5 gap-4">
      <div className="col-span-3">
        <div className="h-[480px]">
          <Image
            src={DummyImage}
            alt="썸네일"
            className="h-full w-full bg-no-repeat object-contain"
          />
        </div>
        <div className="">
          <Tabs
            defaultValue={bookTabs[0].value}
            className="w-full"
            value={selectTab ?? bookTabs[0].value}
          >
            <TabsList className="h-[56px]">
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
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                  </p>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
      <div className="col-span-2">
        <Card className="p-6 shadow-lg">
          <div className="flex justify-between text-sm text-zinc-700">
            <span className="flex items-center gap-1">
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

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            3,980,000원{' '}
            <span className="text-sm font-medium text-muted-foreground">(VAT 포함)</span>
          </h4>
          <p className="text-gray-800">300 페이지</p>
          <div className="flex flex-col gap-2">
            <Button variant="outline">미리보기</Button>
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
    </section>
  );
}
