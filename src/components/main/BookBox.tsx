'use client';

import Image from 'next/image';

import Star from '@/assets/icons/star.svg';
import DummyImg2 from '@/assets/images/dummy_img2.jpg';
import DummyImg3 from '@/assets/images/dummy_img3.jpg';
import DummyImg4 from '@/assets/images/dummy_img4.png';

export default function BookBox({ bookId }: { bookId: number }) {
  const imgs = [DummyImg2, DummyImg3, DummyImg4];

  return (
    <div className="">
      <div className="">
        <Image
          src={imgs[bookId % 3]}
          alt={`image_${bookId}`}
          className="rounded-lg bg-no-repeat object-contain shadow-lg"
        />
      </div>
      <h4 className="line-clamp-2 min-h-[56px] scroll-m-20 overflow-hidden text-ellipsis text-xl font-semibold">
        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
      </h4>

      <div className="text-md flex items-center gap-1 text-zinc-400">
        <Star /> 4.9 (37)
      </div>
      <p className="text-sm text-zinc-500">#category</p>
    </div>
  );
}
