'use client';

import { Fragment, useRef, useState } from 'react';

import BookDetailCard from '@/app/book/_components/book-detail-card';
import BookImageCarousel from '@/app/book/_components/book-image-carousel';
import SellerProfileCard from '@/app/book/_components/seller-profile-card';
import Claim from '@/app/book/_components/tabs/claim';
import Comment from '@/app/book/_components/tabs/comment';
import Introduction from '@/app/book/_components/tabs/introduction';
import Review from '@/app/book/_components/tabs/review';
import TableOfContents from '@/app/book/_components/tabs/table-of-contents';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BookDetailTabType, BookDetailTabTypeCode } from '@/constant/common';

import { codeToArray } from '@/lib/utils';

type PageParams = {
  id: string;
};
const bookTabs = codeToArray(BookDetailTabTypeCode);

export default function ({ params }: { params: PageParams }) {
  const [selectedTabId, setSelectedTabId] = useState<BookDetailTabType>('INTRODUCTION');
  const introductionRef = useRef<HTMLDivElement>(null);
  const tableOfContentsRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      <h2 className="scroll-m-20 pb-8 text-center text-3xl font-semibold tracking-tight first:mt-0">
        The People of the Kingdom [book ID: {params.id}]
      </h2>
      <section className="grid grid-cols-6 gap-20">
        <div className="col-span-4 flex flex-col gap-8">
          <BookImageCarousel />

          <div>
            <Tabs defaultValue={bookTabs[0].value} value={selectedTabId}>
              <TabsList className="sticky top-14 bg-white">
                {bookTabs.map((menu) => {
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
                <Introduction />
              </section>
              <section ref={tableOfContentsRef}>
                <TableOfContents />
              </section>
              <section ref={claimRef}>
                <Claim />
              </section>
              <section ref={reviewRef}>
                <Review />
              </section>
            </Tabs>
          </div>
        </div>
        <div className="col-span-2">
          <div className="sticky top-24 flex flex-col gap-8">
            <BookDetailCard />
            <SellerProfileCard />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
