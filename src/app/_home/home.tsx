'use client';

import { Fragment } from 'react';
import { FaChevronRight } from 'react-icons/fa6';

import Image from 'next/image';
import Link from 'next/link';

import { codeToOptions } from '@/lib/utils';
import { visibleLoginState } from '@/states';
import { Separator } from '@radix-ui/react-separator';
import { useRecoilState } from 'recoil';

import Google from '@/assets/icons/google.svg';
import Kakao from '@/assets/icons/kakao.svg';
import Naver from '@/assets/icons/naver.svg';
import Logo from '@/assets/images/devooks_logo.png';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { TabType, TabTypeCode } from '@/constant/common';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

const mainMenus = codeToOptions(TabTypeCode);
export default function Home() {
  const [visibleLogin, setVisibleLogin] = useRecoilState(visibleLoginState);

  return (
    <Fragment>
      <Carousel>
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
          <Card key={menu.value}>
            <CardHeader>
              <CardTitle>{menu.label}</CardTitle>
              <CardDescription className="flex justify-end">
                <Link href={{ pathname: `/main`, query: { tab: menu.value } }}>
                  <Button variant="link" className="flex items-center gap-1">
                    더 보러가기 <FaChevronRight />
                  </Button>
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel>
                <CarouselContent>
                  {dummy.map((d) => {
                    return (
                      <CarouselItem key={d} className="basis-1/3">
                        <div className="h-[250px] bg-slate-700">box {d}</div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-[32px]" />
                <CarouselNext className="right-[32px]" />
              </Carousel>
            </CardContent>
          </Card>
        );
      })}

      <Dialog open={visibleLogin} onOpenChange={setVisibleLogin}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader className="gap-4">
            <DialogTitle className="flex justify-center">
              <Image src={Logo} alt="devooks 로고" height={50} />
            </DialogTitle>
            <div className="flex items-center gap-5">
              <Separator className="my-4 h-[1px] w-full bg-gray-300" />
              <span className="w-3/5">간편로그인</span>
              <Separator className="my-4 h-[1px] w-full bg-gray-300" />
            </div>
            <div className="flex justify-evenly">
              <button className="bg-brand-naver border-brand-naver flex h-12 w-12 items-center justify-center rounded-full border">
                <Naver />
              </button>
              <button className="bg-brand-kakao border-brand-kakao flex h-12 w-12 items-center justify-center rounded-full border">
                <Kakao />
              </button>
              <button className="bg-brand-google flex h-12 w-12 items-center justify-center rounded-full border border-gray-300">
                <Google />
              </button>
            </div>
            <span>계정</span>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
