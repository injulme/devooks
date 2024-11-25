'use client';

import { EbookGetSummary } from '@/services/ebook/type';
import { Star } from 'lucide-react';

import WishlistButton from '@/components/ebook/wishlist-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useCategoryStore } from '@/stores/global-store';

type BookDetailCardProps = Pick<
  EbookGetSummary,
  'pageCount' | 'price' | 'review' | 'relatedCategoryIdList' | 'wishlistId' | 'id'
>;
export default function BookDetailCard({
  pageCount = 0,
  price = 0,
  review = { rating: 0, count: 0 },
  relatedCategoryIdList = [],
  wishlistId,
  id,
}: BookDetailCardProps) {
  const categories = useCategoryStore((state) => state.categories);

  const relatedCategories = categories.filter((category) =>
    relatedCategoryIdList.includes(category.value),
  );
  const categoryLabels = relatedCategories.map((category) => `#${category.label}`).join(' ');

  return (
    <Card className="relative p-6 shadow-lg">
      <WishlistButton wishlistId={wishlistId} ebookId={id} />

      <p className="text-sm tracking-wide text-zinc-500">{categoryLabels}</p>
      <div className="flex items-center gap-1 text-sm text-zinc-800">
        <Star size={16} />
        <Star size={16} />
        <Star size={16} />
        <Star size={16} />
        <Star size={16} /> {review.rating.toFixed(1)} ({Intl.NumberFormat().format(review.count)})
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {Intl.NumberFormat().format(price)}원{' '}
            <span className="text-sm font-medium text-muted-foreground">(VAT 포함)</span>
          </h4>
          <p className="text-gray-800">{pageCount} 페이지</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              미리보기
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>미리보기</DialogTitle>
              <DialogDescription>The People of the Kingdom</DialogDescription>
            </DialogHeader>
            <div className="p-4">미리보기 이미지</div>
            <DialogFooter className="justify-center sm:justify-center">
              <Button type="submit">구매하기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button>구매하기</Button>
      </div>
    </Card>
  );
}
