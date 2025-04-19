'use client';

import { Fragment, useRef, useState } from 'react';

import { useGetDetailOfEbook } from '@/services/ebook.hooks';

import Claim from '@/app/book/_components/tabs/claim';
import Introduction from '@/app/book/_components/tabs/introduction';
import Review from '@/app/book/_components/tabs/review';
import TableOfContents from '@/app/book/_components/tabs/table-of-contents';

import BookDetailCard from '@/components/ebook/book-detail-card';
import BookImageCarousel from '@/components/ebook/book-image-carousel';
import SellerProfileCard from '@/components/seller/seller-profile-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BookDetailTabType, BookDetailTabTypeCode } from '@/constant/common';

import { codeToArray } from '@/lib/utils';

type PageParams = {
  id: string;
};
const bookTabs = codeToArray(BookDetailTabTypeCode);

export default function BookById({ params }: { params: PageParams }) {
  const [selectedTabId, setSelectedTabId] = useState<BookDetailTabType>('INTRODUCTION');
  const introductionRef = useRef<HTMLDivElement>(null);
  const tableOfContentsRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const { data: ebookData, isLoading } = useGetDetailOfEbook(params.id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto h-8 w-2/3 rounded-lg" />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-12">
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="mt-8">
              <Skeleton className="h-12 w-full rounded-lg" />
              <div className="mt-6 space-y-4">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full rounded-lg" />
            <Skeleton className="mt-8 h-60 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!ebookData) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {ebookData?.ebook.title}
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <BookImageCarousel
              mainImagePreview={[ebookData.ebook.mainImage.imagePath]}
              descriptionImagePreviews={ebookData?.ebook.descriptionImageList.map(
                (descriptionImage) => descriptionImage.imagePath,
              )}
              className="mb-6"
            />

            <Tabs defaultValue={bookTabs[0].value} value={selectedTabId} className="mt-8">
              <TabsList className="sticky top-0 z-10 w-full bg-white p-0.5 shadow-sm">
                {bookTabs.map((menu) => (
                  <TabsTrigger
                    value={menu.value}
                    key={menu.value}
                    className="flex-1 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"
                    onClick={() => {
                      setSelectedTabId(menu.value);
                      if (menu.value === 'INTRODUCTION') {
                        introductionRef.current?.scrollIntoView({ behavior: 'smooth' });
                      } else if (menu.value === 'TABLE_OF_CONTENTS') {
                        tableOfContentsRef.current?.scrollIntoView({ behavior: 'smooth' });
                      } else if (menu.value === 'CLAIM') {
                        claimRef.current?.scrollIntoView({ behavior: 'smooth' });
                      } else if (menu.value === 'REVIEW') {
                        reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {menu.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6 space-y-10 p-2">
                <section ref={introductionRef} id="introduction" className="scroll-mt-20">
                  <Introduction introduction={ebookData.ebook.introduction} />
                </section>
                <section ref={tableOfContentsRef} id="tableOfContents" className="scroll-mt-20">
                  <TableOfContents tableOfContents={ebookData.ebook.tableOfContents} />
                </section>
                <section ref={reviewRef} id="review" className="scroll-mt-20">
                  <Review ebookId={ebookData.ebook.id} />
                </section>
                <section ref={claimRef} id="claim" className="scroll-mt-20">
                  <Claim />
                </section>
              </div>
            </Tabs>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            <BookDetailCard
              price={ebookData?.ebook.price}
              pageCount={ebookData.ebook.pageCount}
              review={ebookData.ebook.review}
              relatedCategoryIdList={ebookData.ebook.relatedCategoryIdList}
              wishlistId={ebookData.ebook.wishlistId}
              id={ebookData.ebook.id}
              pdfId={ebookData.ebook.pdfId}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            />
            <SellerProfileCard
              userId={ebookData.ebook.seller.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
