'use client';

import Image from 'next/image';

import Star from '@/assets/icons/star.svg';
import cover1 from '@/assets/images/cover1.png';
import cover2 from '@/assets/images/cover2.png';
import cover3 from '@/assets/images/cover3.png';
import cover4 from '@/assets/images/cover4.png';
import cover5 from '@/assets/images/cover5.png';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

export default function BookBox({ bookId }: { bookId: number }) {
  const imgs = [cover1, cover2, cover3, cover4, cover5];

  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <div className="relative mb-2 box-border h-[150px] min-w-[150px] overflow-hidden rounded-lg border border-gray-300 shadow-lg">
        <AspectRatio ratio={3 / 4}>
          <Image
            src={imgs[bookId % 5]}
            alt={`image_${bookId}`}
            className="bg-no-repeat object-cover transition-all hover:scale-110"
            fill
          />
        </AspectRatio>
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
