'use client';

import { Fragment } from 'react';

import { useSearchParams } from 'next/navigation';

import { useGetEbooks } from '@/services/ebook/hooks/useGetEbooks';

import BookContainer from '@/components/ebook/book-container';

export default function Main() {
  const params = useSearchParams();

  const { data } = useGetEbooks();
  console.log('책 전체 리스트 호출:: ', data);

  return (
    <Fragment>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data.map((ebook) => {
          return <BookContainer bookData={ebook} key={ebook.id} />;
        })}
      </div>
    </Fragment>
  );
}
