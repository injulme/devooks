'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useGetCategories } from '@/services/category.hooks';

import Logo from '@/assets/images/devooks_logo.png';

import LoginDialog from '@/components/layout/components/LoginDialog';
import RegisterDialog from '@/components/layout/components/RegisterDialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useSignupStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

export default function Header() {
  const registerOpen = useSignupStore((state) => state.open);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const { data: getCategoriesData } = useGetCategories();

  useEffect(() => {
    if (!getCategoriesData || getCategoriesData.length === 0) return;
    updateCategory({ categories: getCategoriesData });
  }, [getCategoriesData]);

  return (
    <header className="top-0 z-50 bg-white shadow dark:bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-4 px-12 py-3">
        <div className="flex items-center justify-between gap-2">
          <Link href="/">
            <Image src={Logo} alt="devooks 로고" height={32} />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Link href="/book/add">책 등록</Link>
            </Button>

            <LoginDialog />
            {registerOpen && <RegisterDialog />}
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>categories</div>
          <Input placeholder="검색어를 입력해주세요." className="w-[240px] bg-gray-200" />
        </div>
      </div>
    </header>
  );
}
