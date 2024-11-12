'use client';

import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useGetCategories } from '@/services/category/hooks/useGetCategories';
import { Heart } from 'lucide-react';

import Logo from '@/assets/images/devooks_logo.png';

import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAuthStore } from '@/stores/auth-store';
import { useSignupStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

export default function Header() {
  const router = useRouter();
  const registerOpen = useSignupStore((state) => state.open);
  const userId = useAuthStore((state) => state.id);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const { data: getCategoriesData } = useGetCategories();

  useEffect(() => {
    if (!getCategoriesData || getCategoriesData.length === 0) return;
    updateCategory({ categories: getCategoriesData });
  }, [getCategoriesData]);

  return (
    <header className="sticky top-0 z-[99] bg-white shadow dark:bg-background sm:bg-red-300 md:bg-yellow-300 lg:bg-green-300 xl:bg-blue-300">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-4 px-12 py-3">
        <div className="flex items-center justify-between gap-2">
          <Link href="/">
            <Image src={Logo} alt="devooks 로고" height={32} />
          </Link>
          <div className="hidden sm:block">sm</div>
          <div className="hidden md:block">md</div>
          <div className="hidden lg:block">lg</div>
          <div className="hidden xl:block">xl</div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Link href="/book/add">책 등록</Link>
            </Button>

            {userId ? (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <LoginDialog />
            )}
            {registerOpen && <RegisterDialog />}
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={() => router.push('/mypage')}>
              <Heart className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCategoriesData?.map((category) => <div key={category.value}>{category.label}</div>)}
          </div>
          <Input placeholder="검색어를 입력해주세요." className="w-[240px] bg-gray-200" />
        </div>
      </div>
    </header>
  );
}
