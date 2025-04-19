'use client';

import Ratings from '../ui/ratings';

import Image from 'next/image';

import { useGetPreviewImages } from '@/services/pdf.hooks';
import { EbookDetailView } from '@leesm0518/devooks-api';
import { BookOpen, Eye, Heart, ShoppingCart } from 'lucide-react';

import WishlistButton from '@/components/ebook/wishlist-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import { useCategoryStore } from '@/stores/global-store';

interface Props extends Partial<EbookDetailView> {
  relatedCategoryIdList?: string[];
  price?: number;
  review?: any;
  className?: string;
}

export default function BookDetailCard({
  pageCount = 0,
  price = 0,
  review = { rating: 0, count: 0 },
  relatedCategoryIdList = [],
  wishlistId,
  id,
  pdfId,
  className,
}: Props) {
  const categories = useCategoryStore((state) => state.categories);

  const relatedCategories = categories.filter((category) =>
    relatedCategoryIdList.includes(category.value),
  );
  const { data: pdfsPreviewById } = useGetPreviewImages(pdfId || '');

  return (
    <div className={cn('overflow-hidden border-slate-200 shadow-md', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {relatedCategories.map((category) => (
              <Badge
                variant="outline"
                key={category.value}
                className="bg-slate-50 text-xs text-slate-600"
              >
                {category.label}
              </Badge>
            ))}
          </div>
          <WishlistButton wishlistId={wishlistId} ebookId={id} />
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-2">
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <Ratings value={review.rating} size={16} variant="yellow" />
          <span>{review.rating.toFixed(1)}</span>
          <span className="text-xs text-slate-500">
            ({Intl.NumberFormat().format(review.count)}개 리뷰)
          </span>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-500">판매가</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-slate-900">
                  {Intl.NumberFormat().format(price)}원
                </span>
                <span className="text-xs text-slate-500">(VAT 포함)</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <BookOpen className="h-4 w-4" />
                <span>{pageCount}페이지</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  미리보기
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[620px]">
                <DialogHeader>
                  <DialogTitle className="text-center">미리보기</DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[75vh] rounded-md border">
                  <div className="flex flex-col items-center p-4">
                    {pdfsPreviewById?.previewImageList.map((pdf, index) => (
                      <div key={pdf.id} className="mb-6 w-full max-w-[550px]">
                        <p className="mb-2 text-center text-xs text-slate-500">{index + 1}페이지</p>
                        <div className="overflow-hidden rounded-md border border-slate-200 shadow-sm">
                          <Image
                            src={pdf.imagePath}
                            alt={`미리보기 이미지 ${index + 1}페이지`}
                            className="w-full object-contain"
                            width={550}
                            height={800}
                          />
                        </div>
                      </div>
                    ))}

                    {(!pdfsPreviewById || pdfsPreviewById.previewImageList.length === 0) && (
                      <div className="flex flex-col items-center justify-center py-20">
                        <BookOpen className="mb-3 h-12 w-12 text-slate-300" />
                        <p className="text-slate-500">미리보기 이미지가 없습니다.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() =>
                      document
                        .querySelector<HTMLButtonElement>(
                          '[role="dialog"] button[aria-label="Close"]',
                        )
                        ?.click()
                    }
                  >
                    닫기
                  </Button>
                  <Button className="flex-1 gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    구매하기
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              구매하기
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-5 pt-0">
        <p className="mt-3 text-xs text-slate-500">구매 후 바로 다운로드하여 읽을 수 있습니다.</p>
      </CardFooter>
    </div>
  );
}
