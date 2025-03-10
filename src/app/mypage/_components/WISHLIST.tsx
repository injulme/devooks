'use client';

import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { EbookListGetSummary } from '@/services/ebook/type';
import { useGetWishlist } from '@/services/wishlist.hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

import BookContainer from '@/components/ebook/book-container';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const columnHelper = createColumnHelper<EbookListGetSummary>();
export const columns = [columnHelper.accessor('id', { id: 'id' })];

export default function Wishlist() {
  const params = useSearchParams();

  // TODO: useTable 구현해야 됨
  const page = params.get('page');

  const { data: wishlist } = useGetWishlist(page ? parseInt(page) : 1, 3);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: page ? parseInt(page) : 1,
    pageSize: 3,
  });

  const table = useReactTable({
    data: wishlist?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: wishlist?.pageable.totalPages || 0,
    rowCount: wishlist?.pageable.totalElements || 0,

    state: {
      pagination,
    },
  });

  const handlePageChange = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
  };
  const pageCount = table.getPageCount();
  const currentPage = parseInt(page ?? '1');

  const MAX_PAGE_NUMBER = 3;

  const startPage = Math.max(
    0,
    Math.min(currentPage - Math.floor(MAX_PAGE_NUMBER / 2), pageCount - MAX_PAGE_NUMBER),
  );
  const endPage = Math.min(startPage + MAX_PAGE_NUMBER, pageCount);

  return (
    <div className="w-full">
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      <div className="space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                href={`/mypage?tab=wishlist&page=${currentPage - 1 <= 0 ? 1 : currentPage - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              {Array.from({ length: endPage - startPage }, (_, i) => i + startPage).map(
                (pageIndex) => {
                  const currentPageIndex = pageIndex + 1;

                  return (
                    <PaginationLink
                      href={`/mypage?tab=wishlist&page=${currentPageIndex}`}
                      key={currentPageIndex}
                      isActive={currentPageIndex === currentPage}
                      onClick={() => handlePageChange(currentPageIndex)}
                    >
                      {currentPageIndex}
                    </PaginationLink>
                  );
                },
              )}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                href={`/mypage?tab=wishlist&page=${currentPage + 1 >= pageCount ? pageCount : currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
