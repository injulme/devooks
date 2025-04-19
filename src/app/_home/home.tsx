'use client';

import { useEffect, useState } from 'react';

import { EbookView } from '@leesm0518/devooks-api';
import { ChevronLeft, ChevronRight, Gift, Sparkles, TrendingUp, Zap } from 'lucide-react';

import Cover1 from '@/assets/images/cover1.png';
import Cover2 from '@/assets/images/cover2.png';
import Cover3 from '@/assets/images/cover3.png';
import Cover4 from '@/assets/images/cover4.png';
import Cover5 from '@/assets/images/cover5.png';
import DummyImg1 from '@/assets/images/dummy_img1.jpeg';
import DummyImg2 from '@/assets/images/dummy_img2.jpg';
import DummyImg3 from '@/assets/images/dummy_img3.jpg';
import DummyImg4 from '@/assets/images/dummy_img4.png';

import BookCard from '@/components/ebook/book-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 임시 카테고리 데이터
const TEMP_CATEGORIES = [
  { value: 'frontend', label: '프론트엔드' },
  { value: 'backend', label: '백엔드' },
  { value: 'datascience', label: '데이터 과학' },
  { value: 'mobile', label: '모바일' },
  { value: 'devops', label: '데브옵스' },
];

// 임시 도서 데이터
const TEMP_BOOKS = [
  {
    id: '1',
    title: '리액트로 배우는 프론트엔드 개발',
    price: 25000,
    mainImage: {
      id: '101',
      imagePath: Cover1.src,
      order: 0,
    },
    review: { rating: 4.8, count: 120 },
    seller: {
      id: '201',
      nickname: '테크북스',
      profileImagePath: 'https://via.placeholder.com/100/3182ce/ffffff?text=TB',
    },
    relatedCategoryIdList: ['frontend', 'react'],
    wishlistId: 'w1',
  },
  {
    id: '2',
    title: '타입스크립트 실전 프로젝트',
    price: 30000,
    mainImage: {
      id: '102',
      imagePath: Cover2.src,
      order: 0,
    },
    review: { rating: 4.5, count: 85 },
    seller: {
      id: '202',
      nickname: '개발자북스',
      profileImagePath: 'https://via.placeholder.com/100/805ad5/ffffff?text=DB',
    },
    relatedCategoryIdList: ['frontend', 'typescript'],
    wishlistId: 'w2',
  },
  {
    id: '3',
    title: 'Next.js로 구현하는 서버사이드 렌더링',
    price: 28000,
    mainImage: {
      id: '103',
      imagePath: Cover3.src,
      order: 0,
    },
    review: { rating: 4.7, count: 92 },
    seller: {
      id: '203',
      nickname: '프론트엔드 마스터',
      profileImagePath: 'https://via.placeholder.com/100/38a169/ffffff?text=FM',
    },
    relatedCategoryIdList: ['frontend', 'nextjs'],
    wishlistId: 'w3',
  },
  {
    id: '4',
    title: '자바스크립트 디자인 패턴',
    price: 22000,
    mainImage: {
      id: '104',
      imagePath: Cover4.src,
      order: 0,
    },
    review: { rating: 4.3, count: 78 },
    seller: {
      id: '204',
      nickname: '코딩 전문가',
      profileImagePath: 'https://via.placeholder.com/100/ecc94b/ffffff?text=CE',
    },
    relatedCategoryIdList: ['frontend', 'javascript'],
    wishlistId: 'w4',
  },
  {
    id: '5',
    title: '백엔드 개발자를 위한 Node.js',
    price: 32000,
    mainImage: {
      id: '105',
      imagePath: Cover5.src,
      order: 0,
    },
    review: { rating: 4.6, count: 105 },
    seller: {
      id: '205',
      nickname: '서버 개발자',
      profileImagePath: 'https://via.placeholder.com/100/ed8936/ffffff?text=SD',
    },
    relatedCategoryIdList: ['backend', 'nodejs'],
    wishlistId: 'w5',
  },
  {
    id: '6',
    title: '처음 배우는 머신러닝',
    price: 35000,
    mainImage: {
      id: '106',
      imagePath: DummyImg1.src,
      order: 0,
    },
    review: { rating: 4.9, count: 130 },
    seller: {
      id: '206',
      nickname: '인공지능 연구소',
      profileImagePath: 'https://via.placeholder.com/100/667eea/ffffff?text=AI',
    },
    relatedCategoryIdList: ['datascience', 'machinelearning'],
    wishlistId: 'w6',
  },
];

// 히어로 슬라이드 데이터
const HERO_SLIDES = [
  {
    id: 'hero1',
    type: 'book',
    bookId: '1',
    title: '리액트로 배우는 프론트엔드 개발',
    description: '리액트 전문가가 알려주는 실전 프론트엔드 개발 노하우',
    bgColor: 'from-indigo-800 to-blue-900',
    imagePath: Cover1.src,
    tag: '이달의 추천 도서',
    tagColor: 'bg-amber-500/20 text-amber-300',
    actionText: '지금 보러가기',
    actionColor:
      'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
    actionLink: '/book/1',
  },
  {
    id: 'hero2',
    type: 'book',
    bookId: '3',
    title: 'Next.js로 구현하는 서버사이드 렌더링',
    description: '최신 웹 개발 트렌드를 따라잡는 Next.js 완벽 가이드',
    bgColor: 'from-emerald-800 to-green-900',
    imagePath: Cover3.src,
    tag: '베스트셀러',
    tagColor: 'bg-emerald-500/20 text-emerald-300',
    actionText: '구매하기',
    actionColor:
      'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
    actionLink: '/book/3',
  },
  {
    id: 'hero3',
    type: 'promotion',
    title: '신규 가입 회원 30% 할인',
    description: '첫 구매시 모든 전자책에 적용 가능한 특별 할인 혜택',
    bgColor: 'from-purple-800 to-violet-900',
    imagePath: DummyImg2.src,
    tag: '특별 프로모션',
    tagColor: 'bg-purple-500/20 text-purple-300',
    actionText: '회원가입하기',
    actionColor:
      'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    actionLink: '/signup',
    icon: Gift,
  },
  {
    id: 'hero4',
    type: 'collection',
    title: '2023 개발자 추천 도서 모음',
    description: '현업 개발자들이 직접 선정한 필독서 컬렉션',
    bgColor: 'from-rose-800 to-pink-900',
    imagePath: DummyImg3.src,
    tag: '한정 컬렉션',
    tagColor: 'bg-rose-500/20 text-rose-300',
    actionText: '컬렉션 보기',
    actionColor: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',
    actionLink: '/collections/dev2023',
    icon: Zap,
  },
  {
    id: 'hero5',
    type: 'event',
    title: '온라인 출판 작가 모집',
    description: '당신의 지식을 전자책으로 공유하고 수익을 창출하세요',
    bgColor: 'from-amber-800 to-orange-900',
    imagePath: DummyImg4.src,
    tag: '신규 이벤트',
    tagColor: 'bg-amber-500/20 text-amber-300',
    actionText: '참여하기',
    actionColor:
      'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
    actionLink: '/events/publishing',
  },
];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  // 임시 데이터 사용
  const recommendedBooks = TEMP_BOOKS;
  const popularBooks = [...TEMP_BOOKS].sort((a, b) => b.review.rating - a.review.rating);
  const categories = TEMP_CATEGORIES;

  // 히어로 슬라이드에 사용할 데이터
  const heroSlides = HERO_SLIDES;

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextHero();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentHeroIndex]);

  const handlePrevHero = () => {
    if (isSliding) return;

    setIsSliding(true);
    setCurrentHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

    // 슬라이드 애니메이션이 끝난 후 상태 초기화
    setTimeout(() => {
      setIsSliding(false);
    }, 500);
  };

  const handleNextHero = () => {
    if (isSliding) return;

    setIsSliding(true);
    setCurrentHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));

    // 슬라이드 애니메이션이 끝난 후 상태 초기화
    setTimeout(() => {
      setIsSliding(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isSliding || currentHeroIndex === index) return;

    setIsSliding(true);
    setCurrentHeroIndex(index);

    // 슬라이드 애니메이션이 끝난 후 상태 초기화
    setTimeout(() => {
      setIsSliding(false);
    }, 500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 히어로 배너 섹션 */}
      <section className="relative mb-16 overflow-hidden rounded-2xl shadow-2xl">
        {!isLoading && heroSlides.length > 0 ? (
          <>
            <div className="relative h-[450px] md:h-[500px]">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 h-full w-full bg-gradient-to-r ${slide.bgColor} transition-opacity duration-500 ease-in-out ${
                    index === currentHeroIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
                  }`}
                >
                  <div className="absolute inset-0 z-0 opacity-20 blur-sm">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${slide.imagePath})`,
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex h-full flex-col-reverse items-center justify-between p-8 transition-all duration-500 md:flex-row md:p-12">
                    <div className="mt-8 text-center md:mt-0 md:max-w-lg md:text-left">
                      <span
                        className={`mb-3 inline-block rounded-full ${slide.tagColor} px-3 py-1 text-xs font-medium`}
                      >
                        {slide.tag}
                      </span>
                      <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                        {slide.title}
                      </h1>
                      <p className="mb-6 text-lg text-slate-300">{slide.description}</p>
                      <Button
                        className={`${slide.actionColor} transition-all`}
                        size="lg"
                        onClick={() => (window.location.href = slide.actionLink)}
                      >
                        {slide.icon && <slide.icon className="mr-2 h-5 w-5" />}
                        {slide.actionText}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center md:h-[320px] md:w-[320px]">
                      {slide.type === 'book' ? (
                        <img
                          src={slide.imagePath}
                          alt={slide.title}
                          className="h-[220px] w-[170px] transform object-contain drop-shadow-2xl transition-all duration-500 hover:scale-105 md:h-[300px] md:w-[225px]"
                        />
                      ) : (
                        <div className="relative h-[220px] w-[220px] md:h-[300px] md:w-[300px]">
                          <img
                            src={slide.imagePath}
                            alt={slide.title}
                            className="h-full w-full rounded-xl object-cover shadow-2xl"
                          />
                          {slide.icon && (
                            <div className="absolute -bottom-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-90 shadow-lg">
                              <slide.icon className="h-8 w-8 text-slate-900" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 슬라이드 인디케이터 */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform items-center space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentHeroIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* 좌우 화살표 버튼 */}
            <button
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
              onClick={handlePrevHero}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
              onClick={handleNextHero}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        ) : (
          <div className="flex h-[450px] items-center justify-center md:h-[500px]">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
        )}
      </section>

      {/* 추천 도서 섹션 */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">추천 도서</h2>
          </div>
          <Button variant="link" className="text-amber-600 hover:text-amber-700">
            더 보기
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <div className="p-3">
                    <Skeleton className="mb-2 h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="mt-2 h-5 w-1/3" />
                  </div>
                </Card>
              ))
            : recommendedBooks.map((book) => (
                <BookCard key={book.id} bookData={book as EbookView} />
              ))}
        </div>
      </section>

      {/* 인기 도서 순위 섹션 */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-rose-500" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">인기 도서 순위</h2>
          </div>
          <Button variant="link" className="text-rose-600 hover:text-rose-700">
            더 보기
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl font-bold text-slate-400">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-5 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))
            : popularBooks.slice(0, 9).map((book, index) => (
                <div
                  key={book.id}
                  className="group flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-all hover:bg-slate-100"
                  onClick={() => (window.location.href = `/book/${book.id}`)}
                >
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xl font-bold ${
                      index < 3
                        ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="line-clamp-1 font-medium text-slate-900 group-hover:text-slate-700">
                      {book.title}
                    </h3>
                    <p className="text-sm text-slate-500">{book.seller?.nickname}</p>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* 카테고리별 도서 섹션 */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">카테고리별 도서</h2>

        {categories.length > 0 && (
          <Tabs defaultValue={categories[0]?.value}>
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value}>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                          <Skeleton className="aspect-[3/4] w-full" />
                          <div className="p-3">
                            <Skeleton className="mb-2 h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="mt-2 h-5 w-1/3" />
                          </div>
                        </Card>
                      ))
                    : recommendedBooks
                        .filter((book) => book.relatedCategoryIdList.includes(category.value))
                        .slice(0, 5)
                        .map((book) => <BookCard key={book.id} bookData={book as EbookView} />)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>

      {/* 특가 할인 섹션 */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-sm">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="mb-6 text-center md:mb-0 md:max-w-md md:text-left">
            <span className="mb-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
              특별 할인
            </span>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              지금 가입하고 30% 할인받기
            </h2>
            <p className="mb-6 text-slate-600">
              신규 가입 회원에게 드리는 특별한 혜택! 가입 후 첫 구매시 모든 전자책 30% 할인 쿠폰을
              드립니다.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">지금 가입하기</Button>
          </div>
          <div className="relative">
            <div className="flex space-x-4">
              {recommendedBooks.slice(0, 3).map((book, index) => (
                <div
                  key={book.id}
                  className="relative"
                  style={{
                    transform: `rotate(${(index - 1) * 10}deg)`,
                    zIndex: 3 - index,
                  }}
                >
                  {book.mainImage?.imagePath && (
                    <img
                      src={book.mainImage.imagePath}
                      alt={book.title}
                      className="h-[180px] w-[135px] rounded-lg border border-slate-200 object-cover shadow-lg"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg">
              <div className="text-center">
                <div className="text-xs">최대</div>
                <div className="text-xl">30%</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
