'use client';

import Image from 'next/image';

import { Heart, Star } from 'lucide-react';

import cover1 from '@/assets/images/cover1.png';
import cover2 from '@/assets/images/cover2.png';
import cover3 from '@/assets/images/cover3.png';
import cover4 from '@/assets/images/cover4.png';
import cover5 from '@/assets/images/cover5.png';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

const imgs = [cover1, cover2, cover3, cover4, cover5];
const ImageBox = ({ bookId }: { bookId: number }) => {
  return (
    <div className="group relative mb-2 box-border h-full w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg">
      <AspectRatio ratio={1.33 / 1}>
        <Image
          src={imgs[bookId % 5]}
          alt={`image_${bookId}`}
          className="bg-no-repeat object-cover transition-all duration-200 group-hover:scale-110"
          fill
        />
      </AspectRatio>
      <div className="absolute right-3 top-2 rounded-full bg-white/30 p-3 shadow-sm transition-all group-hover:bg-white/50">
        {bookId % 2 === 0 ? (
          <Heart size={24} className="fill-red-500 stroke-red-500" />
        ) : (
          <Heart size={24} />
        )}
      </div>
    </div>
  );
};

export default function BookBox({ bookId }: { bookId: number }) {
  return (
    <div className="flex flex-col">
      <ImageBox bookId={bookId} />
      <div>
        <h4 className="mb-2 line-clamp-2 min-h-[56px] scroll-m-20 overflow-hidden text-ellipsis text-lg font-semibold">
          {bookId % 2 === 0 ? '『소년이 온다』' : '월 2천만원 벌게해준 알짜폐쇄몰리스트판매노하우'}
        </h4>

        <p className="text-sm text-zinc-500">#category #category #category</p>
        <div className="flex items-center gap-1 text-sm text-zinc-800">
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} /> 4.9 (37)
        </div>
        <p className="text-md font-semibold text-zinc-900">22,000원</p>
        <p className="mt-2 text-sm text-zinc-500">나는 작가</p>
      </div>
    </div>
  );
}
