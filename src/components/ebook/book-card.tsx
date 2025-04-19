'use client';

import Ratings from '../ui/ratings';
import WishlistButton from './wishlist-button';

import Image from 'next/image';
import Link from 'next/link';

import { EbookView } from '@leesm0518/devooks-api';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { useCategoryStore } from '@/stores/global-store';

export default function BookCard({ bookData }: { bookData: EbookView }) {
  const { title, price, review, seller, relatedCategoryIdList, mainImage, wishlistId, id } =
    bookData;

  const categories = useCategoryStore((state) => state.categories);

  const relatedCategories = categories.filter((category) =>
    relatedCategoryIdList.includes(category.value),
  );

  return (
    <Link
      href={`/book/${id}`}
      className="block h-full transition-all duration-200 hover:scale-[1.02]"
    >
      <Card className="h-full overflow-hidden border-slate-200 shadow-sm hover:shadow-md">
        <div className="relative">
          <AspectRatio ratio={3 / 4}>
            <Image
              src={mainImage.imagePath}
              alt={`${title} 표지 이미지`}
              className="bg-slate-50 object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
          <WishlistButton wishlistId={wishlistId} ebookId={id} className="absolute right-2 top-2" />
        </div>

        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-tight text-slate-900">
            {title}
          </h3>

          <div className="mt-auto">
            <div className="mb-1.5 flex flex-wrap gap-1">
              {relatedCategories.slice(0, 2).map((category) => (
                <Badge
                  variant="outline"
                  key={category.value}
                  className="h-4 bg-slate-50 px-1.5 py-0 text-[10px] font-normal text-slate-600"
                >
                  {category.label}
                </Badge>
              ))}
              {relatedCategories.length > 2 && (
                <span className="text-[10px] text-slate-500">+{relatedCategories.length - 2}</span>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm">
              <Ratings value={review.rating} size={14} variant="yellow" />
              <span className="text-xs text-slate-700">{review.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-500">
                ({Intl.NumberFormat().format(review.count)})
              </span>
            </div>

            <p className="mt-1.5 font-semibold text-slate-900">
              {Intl.NumberFormat().format(price)}원
            </p>
          </div>
        </CardContent>

        <CardFooter className="border-t border-slate-100 bg-slate-50 px-4 py-2">
          <p className="text-xs text-slate-500">{seller.nickname}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
