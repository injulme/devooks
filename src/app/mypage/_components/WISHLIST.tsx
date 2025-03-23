'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { useGetWishlist } from '@/services/wishlist.hooks';
import { EbookView } from '@leesm0518/devooks-api';
import { createColumnHelper } from '@tanstack/react-table';

import DataPagination from '@/components/data-pagination';
import BookContainer from '@/components/ebook/book-container';

import useTable from '@/hooks/useTable';

const columnHelper = createColumnHelper<EbookView>();
export const columns = [columnHelper.accessor('id', { id: 'id' })];

export default function Wishlist() {
  const params = useSearchParams();
  const pathname = usePathname();
  console.log(pathname, params.toString());

  const page = params.get('page');

  const { data: wishlist } = useGetWishlist({ page: page ? parseInt(page) : 1, count: 4 });

  const table = useTable({
    data: wishlist?.data ?? [],
    columns,
    totalPages: wishlist?.pageable.totalPages || 0,
    totalElements: wishlist?.pageable.totalElements || 0,
    rowId: 'id',
    defaultPageIndex: page ? parseInt(page) : 1,
    defaultPagingSize: 3,
  });

  return (
    <div className="w-full">
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows?.map((ebook) => {
            return <BookContainer bookData={ebook.original} key={ebook.id} />;
          })
        ) : (
          <div className="col-span-full">
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No results.</p>
            </div>
          </div>
        )}
      </div>
      <DataPagination table={table} />
    </div>
  );
}
