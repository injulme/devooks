'use client';

import { AiFillPicture } from 'react-icons/ai';

import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export interface BookImageCarouselProps {
  mainImagePreview?: string[];
  descriptionImagePreviews?: string[];
  className?: string;
}

export default function BookImageCarousel({
  mainImagePreview,
  descriptionImagePreviews,
  className,
}: BookImageCarouselProps) {
  return (
    <div className={className}>
      <AspectRatio ratio={1.33 / 1} className="mb-4">
        {mainImagePreview && mainImagePreview.length > 0 ? (
          <Image
            src={mainImagePreview[mainImagePreview.length - 1]}
            className="mb-4 h-full w-full rounded bg-no-repeat object-cover"
            alt="대표 이미지"
          />
        ) : (
          <div className="mb-4 flex h-full w-full items-center justify-center rounded border">
            <AiFillPicture size={140} className="bg-no-repeat object-cover text-gray-300" />
          </div>
        )}
      </AspectRatio>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {descriptionImagePreviews && descriptionImagePreviews.length > 0
            ? descriptionImagePreviews.map((image, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="xs:basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="rounded border">
                      <AspectRatio ratio={1.33 / 1}>
                        <Image
                          src={image}
                          alt={`cover_${index}`}
                          className="h-full w-full rounded bg-no-repeat object-cover"
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                );
              })
            : [0, 1, 2].map((i) => {
                return (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                    <AspectRatio ratio={1.33 / 1}>
                      <div className="flex h-full items-center justify-center rounded border">
                        <AiFillPicture
                          size={80}
                          className="bg-no-repeat object-cover text-gray-300"
                        />
                      </div>
                    </AspectRatio>
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
