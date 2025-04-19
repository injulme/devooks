'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useGetEbooks } from '@/services/ebook.hooks';
import { EbookView } from '@leesm0518/devooks-api';
import { BookOpen, ChevronDown, Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import qs from 'qs';

import BookCard from '@/components/ebook/book-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

import { useCategoryStore } from '@/stores/global-store';

type ViewMode = 'grid' | 'list';
type SortOption = 'recent' | 'popular' | 'price-low' | 'price-high';

const PAGE_SIZE = 8;

// 인라인 Skeleton UI 컴포넌트
const BookSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-200 dark:bg-slate-700', className)}
      {...props}
    />
  );
};

export default function Main() {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get('tab') || 'ALL';
  const page = params.get('page') || '1';
  const searchQuery = params.get('search') || '';
  const sort = (params.get('sort') || 'recent') as SortOption;

  const categories = useCategoryStore((state) => state.categories);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchInput, setSearchInput] = useState(searchQuery);

  // 페이지 로드 시 검색어 상태 초기화
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const { data, isLoading } = useGetEbooks({
    categoryIdList: tab === 'ALL' ? '' : tab,
    page: parseInt(page),
    count: PAGE_SIZE,
  });

  const books = data?.data || [];
  const totalPages = data?.pageable.totalPages || 0;
  const totalElements = data?.pageable.totalElements || 0;
  const currentPage = parseInt(page);

  // 정렬 적용 - 키워드 검색 적용
  const sortedBooks = [...books]
    .filter((book) => !searchQuery || book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sort) {
        case 'popular':
          return b.review.rating - a.review.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'recent':
        default:
          return 0; // 서버에서 이미 최신순으로 정렬됐다고 가정
      }
    });

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const query = { ...Object.fromEntries(params.entries()), page: newPage.toString() };
    const queryString = qs.stringify(query);
    router.push(`/main?${queryString}`);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: string) => {
    const query = { ...Object.fromEntries(params.entries()), tab: categoryId, page: '1' };
    const queryString = qs.stringify(query);
    router.push(`/main?${queryString}`);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortOption: SortOption) => {
    const query = { ...Object.fromEntries(params.entries()), sort: sortOption };
    const queryString = qs.stringify(query);
    router.push(`/main?${queryString}`);
  };

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = { ...Object.fromEntries(params.entries()), search: searchInput, page: '1' };
    const queryString = qs.stringify(query);
    router.push(`/main?${queryString}`);
  };

  // 선택된 카테고리 이름 조회
  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'ALL') return '전체';
    const category = categories.find((c) => c.value === categoryId);
    return category?.label || '';
  };

  // 정렬 옵션 이름
  const getSortName = (sortOption: SortOption) => {
    switch (sortOption) {
      case 'recent':
        return '최신순';
      case 'popular':
        return '인기순';
      case 'price-low':
        return '가격 낮은순';
      case 'price-high':
        return '가격 높은순';
    }
  };

  // 페이지네이션 렌더링
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // 페이지네이션 숫자 계산
    const MAX_VISIBLE_PAGES = 5;
    const pages = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      // 전체 페이지가 적으면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 페이지가 많으면 현재 페이지 주변과 처음/끝 표시
      const showEllipsisStart = currentPage > 3;
      const showEllipsisEnd = currentPage < totalPages - 2;

      if (showEllipsisStart) {
        pages.push(1);
        pages.push('ellipsis-start');
      }

      // 현재 페이지 주변
      const startPage = Math.max(1, showEllipsisStart ? currentPage - 1 : 1);
      const endPage = Math.min(totalPages, showEllipsisEnd ? currentPage + 1 : totalPages);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (showEllipsisEnd) {
        pages.push('ellipsis-end');
        pages.push(totalPages);
      }
    }

    // 페이지 URL 생성 함수
    const getPageUrl = (pageNum: number) => {
      const query = { ...Object.fromEntries(params.entries()), page: pageNum.toString() };
      return `/main?${qs.stringify(query)}`;
    };

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={getPageUrl(currentPage - 1)}
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {pages.map((page, i) => {
            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              return (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const pageNumber = page as number;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={getPageUrl(pageNumber)}
                  isActive={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={getPageUrl(currentPage + 1)}
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  // 리스트 뷰 렌더링
  const renderListView = (books: EbookView[]) => {
    return (
      <div className="space-y-4">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="flex">
                <div className="h-40 w-32 flex-shrink-0 overflow-hidden">
                  <img
                    src={book.mainImage.imagePath}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-slate-500">{book.seller.nickname}</p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {book.relatedCategoryIdList.map((catId) => {
                        const category = categories.find((c) => c.value === catId);
                        return category ? (
                          <Badge variant="outline" key={catId} className="text-xs">
                            {category.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">★</span>
                      <span className="text-sm">{book.review.rating.toFixed(1)}</span>
                      <span className="text-xs text-slate-500">({book.review.count}개 리뷰)</span>
                    </div>
                    <span className="font-semibold">{book.price.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // 그리드 뷰 렌더링
  const renderGridView = (books: EbookView[]) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard bookData={book} key={book.id} />
        ))}
      </div>
    );
  };

  // 로딩 상태 렌더링
  const renderLoadingState = () => {
    return viewMode === 'grid' ? (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <BookSkeleton className="aspect-[3/4] w-full rounded-lg" />
            <BookSkeleton className="mt-3 h-5 w-2/3" />
            <BookSkeleton className="mt-2 h-4 w-1/3" />
            <BookSkeleton className="mt-2 h-4 w-1/4" />
          </div>
        ))}
      </div>
    ) : (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookSkeleton key={i} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* 상단 제목, 필터 영역 */}
      <div className="mb-6 flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-slate-900" />
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              전자책 ({totalElements.toLocaleString()})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* 그리드/리스트 뷰 전환 버튼 */}
            <div className="flex rounded-md border">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === 'grid' ? 'bg-slate-100' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === 'list' ? 'bg-slate-100' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* 정렬 옵션 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  {getSortName(sort as SortOption)}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange('recent')}>
                  최신순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('popular')}>
                  인기순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('price-low')}>
                  가격 낮은순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('price-high')}>
                  가격 높은순
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 검색 및 카테고리 필터 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={tab === 'ALL' ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => handleCategoryChange('ALL')}
            >
              전체
            </Badge>

            {categories.map((category) => (
              <Badge
                key={category.value}
                variant={tab === category.value ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => handleCategoryChange(category.value)}
              >
                {category.label}
              </Badge>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
            <Input
              className="rounded-r-none"
              placeholder="검색어를 입력하세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* 검색 결과 정보 */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">"{searchQuery}"</span>에 대한 검색결과{' '}
            <span className="font-semibold">{totalElements}</span>건
          </p>
        </div>
      )}

      {/* 책 목록 또는 로딩 상태 */}
      {isLoading ? (
        renderLoadingState()
      ) : sortedBooks.length > 0 ? (
        viewMode === 'grid' ? (
          renderGridView(sortedBooks)
        ) : (
          renderListView(sortedBooks)
        )
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-16">
          <BookOpen className="h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium">검색 결과가 없습니다</h3>
          <p className="mt-2 text-sm text-slate-500">다른 검색어나 카테고리로 검색해 보세요.</p>
        </div>
      )}

      {/* 페이지네이션 */}
      {renderPagination()}
    </div>
  );
}
