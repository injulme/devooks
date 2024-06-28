'use client';

import { FaRegStar, FaStar } from 'react-icons/fa';

import Image from 'next/image';

import Heart from '@/assets/icons/heart.svg';
import HomeIcon from '@/assets/icons/home.svg';
import Instagram from '@/assets/icons/instagram.svg';
import Star from '@/assets/icons/star.svg';
import Youtube from '@/assets/icons/youtube.svg';
import Cover1 from '@/assets/images/cover1.png';
import Cover2 from '@/assets/images/cover2.png';
import Cover3 from '@/assets/images/cover3.png';
import Cover4 from '@/assets/images/cover4.png';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import Header from '../header';

const data = [
  {
    imgSrc: Cover1,
    subject: '1퍼센트 부자들의 법칙',
  },
  {
    imgSrc: Cover2,
    subject: '나의 채식 라이프 365',
  },
  {
    imgSrc: Cover3,
    subject: '시작이 어려운 당신에게',
  },
];
export default function Home() {
  return (
    <div className="px-28 py-12">
      <Card className="bg-classic-200 relative h-[100dvh] rounded-3xl p-8">
        <Header />
        <div className="grid h-1/2 grid-cols-3 items-center gap-4">
          <div className="flex flex-col">
            <h1 className="select-none font-serif text-4xl">
              베스트셀러
              <br />
              TOP 3
            </h1>
            <p className="mb-8 mt-4 text-lg text-muted-foreground">오늘의 인기 책을 구경해보세요</p>
            <Input placeholder="제목, 작가, 카테고리" />
          </div>
          <Image src={Cover4} alt="책1" className="h-full w-full bg-no-repeat object-contain" />
          <div className="flex gap-6">
            <Card className="p-6 shadow-lg">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <FaStar size={24} fill="gold" />
                    <FaStar size={24} fill="gold" />
                    <FaStar size={24} fill="gold" />
                    <FaStar size={24} fill="gold" />
                    <FaRegStar size={24} fill="gold" />
                    (124)
                  </div>
                  <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
                    여행을 떠나요
                  </h2>
                  <h3 className="text-sm tracking-tight text-muted-foreground">김민수</h3>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    3,980,000원{' '}
                    <span className="text-sm font-medium text-muted-foreground">(VAT 포함)</span>
                  </h4>
                </div>
                <Button variant="outline-gold" size="xs">
                  Buy Now
                </Button>
              </div>
            </Card>
            <Card className="p-6 shadow-lg">
              <div className="flex flex-col items-center gap-8">
                <Avatar className="h-[120px] w-[120px] shadow-xl">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <HomeIcon />
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
        <div
          className="absolute left-[-78px] right-[-78px] top-[60%] h-8"
          style={{
            clipPath: 'polygon(78px 0%, calc(100% - 78px) 0%, 100% 100%, 0% 100%)',

            background: 'linear-gradient(180deg, rgba(230,221,207,1) 0%, rgba(238,229,218,1) 100%)',
          }}
        />
        <div
          className="shadow-right-bottom absolute left-[-78px] right-[-78px] top-[calc(60%+2rem)] h-4"
          style={{
            background: 'linear-gradient(0deg, rgba(252,247,239,1) 0%, rgba(229,223,217,1) 100%)',
          }}
        />
        <div className="grid h-1/2 grid-cols-3 gap-4 pb-12 pt-32">
          {data.map((d) => {
            return (
              <div className="grid grid-cols-2 items-center gap-4">
                <Image
                  src={d.imgSrc}
                  alt="책1"
                  className="h-full w-full bg-no-repeat object-contain"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <FaStar size={12} fill="gold" />
                    <FaStar size={12} fill="gold" />
                    <FaStar size={12} fill="gold" />
                    <FaStar size={12} fill="gold" />
                    <FaRegStar size={12} fill="gold" />
                  </div>
                  <h2 className="text-md scroll-m-20 font-semibold tracking-tight">{d.subject}</h2>
                  <h3 className="text-xs tracking-tight text-muted-foreground">upn2n</h3>
                  <Button variant="outline-gold" className="w-1/2">
                    Buy Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
