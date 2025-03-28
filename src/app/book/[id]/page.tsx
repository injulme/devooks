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
  // console.log('ebookData ,', ebookData);

  if (isLoading || !ebookData) return <div>loading...</div>;
  return (
    <Fragment>
      <h2 className="scroll-m-20 pb-8 text-center text-3xl font-semibold tracking-tight first:mt-0">
        {ebookData?.ebook.title}
      </h2>
      <section className="grid grid-cols-6 gap-20">
        <div className="col-span-4 flex flex-col gap-8">
          <BookImageCarousel
            mainImagePreview={[ebookData.ebook.mainImage.imagePath]}
            descriptionImagePreviews={ebookData?.ebook.descriptionImageList.map(
              (descriptionImage) => descriptionImage.imagePath,
            )}
          />

          <div>
            <Tabs defaultValue={bookTabs[0].value} value={selectedTabId}>
              <TabsList className="sticky top-0 z-10 w-full bg-white">
                {bookTabs.map((menu) => {
                  // TODO: scrollIntoView & Observer 로 처리할지, scrollTo 로 처리할지 결정
                  // 근데 해당 페이지 오면 탭 active 상태 변경 해줘야 하는데 이거 고려하기
                  return (
                    <TabsTrigger
                      value={menu.value}
                      key={menu.value}
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
                  );
                })}
              </TabsList>

              <section ref={introductionRef} className="mt-12">
                <Introduction introduction={ebookData.ebook.introduction} />
              </section>
              <section ref={tableOfContentsRef} className="mt-12">
                <TableOfContents tableOfContents={ebookData.ebook.tableOfContents} />
              </section>
              <section ref={reviewRef} className="mt-12">
                <Review ebookId={ebookData.ebook.id} />
              </section>
              <section ref={claimRef} className="mt-12">
                <Claim />
              </section>
            </Tabs>
          </div>
        </div>
        <div className="col-span-2">
          <div className="sticky top-24 flex flex-col gap-8">
            <BookDetailCard
              price={ebookData?.ebook.price}
              pageCount={ebookData.ebook.pageCount}
              review={ebookData.ebook.review}
              relatedCategoryIdList={ebookData.ebook.relatedCategoryIdList}
              wishlistId={ebookData.ebook.wishlistId}
              id={ebookData.ebook.id}
              pdfId={ebookData.ebook.pdfId}
            />
            <SellerProfileCard userId={ebookData.ebook.seller.id} />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
