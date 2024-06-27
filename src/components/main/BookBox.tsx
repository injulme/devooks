'use client';

import Image from 'next/image';

import Star from '@/assets/icons/star.svg';
import DummyImg2 from '@/assets/images/dummy_img2.jpg';
import DummyImg3 from '@/assets/images/dummy_img3.jpg';
import DummyImg4 from '@/assets/images/dummy_img4.png';

import { Badge } from '../ui/badge';

export default function BookBox({ bookId }: { bookId: number }) {
  const imgs = [DummyImg2, DummyImg3, DummyImg4];

  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <div className="relative mb-2 box-border h-[150px] overflow-hidden rounded-lg border border-gray-300 shadow-lg sm:w-[150px]">
        <Image
          src={imgs[bookId % 3]}
          alt={`image_${bookId}`}
          className="bg-no-repeat object-cover transition-all hover:scale-110"
          fill
        />
      </div>
      <div>
        <h4 className="line-clamp-2 min-h-[56px] scroll-m-20 overflow-hidden text-ellipsis text-lg font-semibold">
          Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
        </h4>

        <div className="text-md flex items-center gap-1 text-zinc-400">
          <Star /> 4.9 (37)
        </div>
        <p className="text-md font-semibold text-zinc-900">22,000원</p>
        <p className="text-sm text-zinc-500">나는 작가</p>
        <div className="space-x-1">
          <Badge className="opacity-70">#category</Badge>
          <Badge className="opacity-70">#category</Badge>
          <Badge className="opacity-70">#category</Badge>
        </div>
      </div>
    </div>
  );
}
