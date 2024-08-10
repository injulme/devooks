'use client';

import { Fragment } from 'react';
import { FaChevronRight } from 'react-icons/fa6';

import Link from 'next/link';

import BookBox from '@/components/main/BookBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { TabTypeCode } from '@/constant/common';

import { codeToOptions } from '@/lib/utils';

import { useGetEbooks } from '@/modules/ebook/hooks/useGetEbooks';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

const mainMenus = codeToOptions(TabTypeCode);
export default function Home() {
  const { data } = useGetEbooks();
  console.log('책 전체 리스트 호출:: ', data);
  return (
    <Fragment>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItem>
            <div className="h-[430px] bg-slate-700">box1</div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-[430px] bg-slate-600">box2</div>
          </CarouselItem>
          <CarouselItem>
            <div className="h-[430px] bg-slate-500">box3</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-[32px]" />
        <CarouselNext className="right-[32px]" />
      </Carousel>

      {mainMenus.map((menu) => {
        return (
          <Card key={menu.value} className="mx-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {menu.label}

                <Link href={{ pathname: `/main`, query: { tab: menu.value } }}>
                  <Button variant="link" className="flex items-center gap-1">
                    더 보러가기 <FaChevronRight />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel>
                <CarouselContent>
                  {dummy.map((d) => {
                    return (
                      <CarouselItem key={d} className="basis-1/3">
                        <Link href={`/book/${d}`}>
                          <BookBox bookId={d} />
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-6" />
                <CarouselNext className="right-6" />
              </Carousel>
            </CardContent>
          </Card>
        );
      })}
    </Fragment>
  );
}
