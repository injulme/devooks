'use client';

import Image from 'next/image';

import { EbookListGetSummary } from '@/services/ebook/type';
import { Heart, Star } from 'lucide-react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { useCategoryStore } from '@/stores/global-store';

export default function BookBox({ bookData }: { bookData: EbookListGetSummary }) {
  const { title, price, review, writerName, relatedCategoryIdList, mainImagePath, wishlistId } =
    bookData;

  const categories = useCategoryStore((state) => state.categories);

  const relatedCategories = categories.filter((category) =>
    relatedCategoryIdList.includes(category.value),
  );
  const categoryLabels = relatedCategories.map((category) => `#${category.label}`).join(' ');

  return (
    <div className="flex flex-col">
      <div className="group relative mb-4 box-border h-full w-full overflow-hidden rounded-lg border border-gray-100 shadow-md">
        <AspectRatio ratio={1.33 / 1}>
          <Image
            src={process.env.NEXT_PUBLIC_BASE_URL + mainImagePath}
            alt={`image_${title}`}
            className="bg-no-repeat object-cover transition-all duration-200 group-hover:scale-110"
            fill
          />
        </AspectRatio>
        <div className="absolute right-3 top-2 rounded-full bg-white/30 p-3 shadow-sm transition-all group-hover:bg-white/50">
          {wishlistId ? (
            <Heart size={24} className="fill-red-500 stroke-red-500" />
          ) : (
            <Heart size={24} />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="mb-2 line-clamp-2 scroll-m-20 text-lg font-semibold leading-6">{title}</h4>

        <div>
          <p className="text-sm tracking-wide text-zinc-500">{categoryLabels}</p>
          <div className="flex items-center gap-1 text-sm text-zinc-800">
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} />
            <Star size={16} /> {review.rating.toFixed(1)} (
            {Intl.NumberFormat().format(review.count)})
          </div>
          <p className="text-lg font-semibold tracking-wide text-zinc-900">
            {Intl.NumberFormat().format(price)}원
          </p>
          <p className="mt-2 text-sm text-zinc-500">{writerName}</p>
        </div>
      </div>
    </div>
  );
}
