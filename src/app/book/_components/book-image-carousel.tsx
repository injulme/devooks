'use client';

import Image from 'next/image';

import cover1 from '@/assets/images/cover1.png';
import cover2 from '@/assets/images/cover2.png';
import cover3 from '@/assets/images/cover3.png';
import cover4 from '@/assets/images/cover4.png';
import cover5 from '@/assets/images/cover5.png';
import DummyImage from '@/assets/images/dummy_img2.jpg';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function BookImageCarousel() {
  const images = [cover1, cover2, cover3, cover4, cover5];

  return (
    <div>
      <Image
        src={DummyImage}
        alt="썸네일"
        className="mb-4 h-[430px] w-full rounded bg-no-repeat object-cover"
      />
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="h-[230px] rounded border">
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
  );
}
