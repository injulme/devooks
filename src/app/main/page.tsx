'use client';

import { Fragment } from 'react';

import { useGetEbooks } from '@/services/ebook.hooks';
import { EbookView } from '@leesm0518/devooks-api';

import BookContainer from '@/components/ebook/book-container';

export default function Main() {
  const { data } = useGetEbooks();

  console.log('get ebooks', data);

  return (
    <Fragment>
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data.map((ebook: EbookView) => {
          return <BookContainer bookData={ebook} key={ebook.id} />;
        })}
      </div>
    </Fragment>
  );
}
