'use client';

import Ratings from '../ui/ratings';
import WishlistButton from './wishlist-button';

import Image from 'next/image';
import Link from 'next/link';

import { EbookView } from '@leesm0518/devooks-api';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { useCategoryStore } from '@/stores/global-store';

export default function BookContainer({ bookData }: { bookData: EbookView }) {
  const { title, price, review, seller, relatedCategoryIdList, mainImage, wishlistId, id } =
    bookData;

  const categories = useCategoryStore((state) => state.categories);

  const relatedCategories = categories.filter((category) =>
    relatedCategoryIdList.includes(category.value),
  );
  const categoryLabels = relatedCategories.map((category) => `#${category.label}`).join(' ');
  return (
    <Link href={`/book/${id}`}>
      <div className="flex flex-col">
        <div className="relative mb-4 box-border h-full w-full overflow-hidden rounded-lg border border-gray-100 shadow-md">
          <AspectRatio ratio={1.33 / 1}>
            <Image
              src={mainImage.imagePath}
              alt={`image_${title}`}
              className="bg-no-repeat object-cover transition-all duration-200 hover:scale-110"
              fill
            />
          </AspectRatio>
          <WishlistButton wishlistId={wishlistId} ebookId={id} />
        </div>
        <div className="flex flex-col justify-between">
          <h4 className="mb-2 line-clamp-2 scroll-m-20 text-lg font-semibold leading-6">{title}</h4>

          <div>
            <p className="text-sm tracking-wide text-zinc-500">{categoryLabels}</p>
            <div className="flex items-center gap-1 text-sm text-zinc-800">
              <Ratings value={review.rating} size={16} variant="yellow" />{' '}
              {review.rating.toFixed(1)} ({Intl.NumberFormat().format(review.count)})
            </div>
            <p className="text-lg font-semibold tracking-wide text-zinc-900">
              {Intl.NumberFormat().format(price)}원
            </p>
            <p className="mt-2 text-sm text-zinc-500">{seller.nickname}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
