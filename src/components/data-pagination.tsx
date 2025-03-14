import { usePathname, useSearchParams } from 'next/navigation';

import { Table } from '@tanstack/react-table';
import qs from 'qs';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface DataPaginationProps<TData> {
  table: Table<TData>;
}

export default function DataPagination<TData>({ table }: DataPaginationProps<TData>) {
  const pathname = usePathname();
  const params = useSearchParams();

  const query = qs.parse(params.toString());
  const queryString = qs.stringify(query, { addQueryPrefix: true });

  // TODO: 페이지네이션 파라미터 어떻게 처리할지
  console.log(params.toString(), query, queryString);

  const page = params.get('page');

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

  const onLinkPreviousPage = () => {
    const previousPage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    // const query = { ...query, page: previousPage };

    return `${pathname}?tab=wishlist&page=${previousPage}`;
  };

  const onLinkNextPage = () => {
    const nextPage = currentPage + 1 >= pageCount ? pageCount : currentPage + 1;
    return `${pathname}?tab=wishlist&page=${nextPage}`;
  };

  return (
    <div className="space-x-2 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => table.previousPage()} href={onLinkPreviousPage()} />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: endPage - startPage }, (_, i) => i + startPage).map(
              (pageIndex) => {
                const currentPageIndex = pageIndex + 1;

                return (
                  <PaginationLink
                    href={`${pathname}?tab=wishlist&page=${currentPageIndex}`}
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
            <PaginationNext onClick={() => table.nextPage()} href={onLinkNextPage()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
