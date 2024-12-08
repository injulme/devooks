'use client';

import LoginDialog from './components/LoginDialog';
import NotificationPopover from './components/NotificationPopover';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useAuthStore } from '@/stores/auth-store';
import { useSignupStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

export default function Header() {
  const router = useRouter();

  // const tab = params?.get('tab');
  const tab = 'BEST';

  const registerOpen = useSignupStore((state) => state.open);
  const userInfo = useAuthStore((state) => state);
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
            <NotificationPopover />

            <Button variant="outline">
              <Link href="/book/add">책 등록</Link>
            </Button>

            {userInfo.id ? (
              <Avatar onClick={() => router.push('/mypage')} className="cursor-pointer">
                <AvatarImage
                  src={userInfo.profileImagePath}
                  alt={`${userInfo.nickname} 작가의 프로필 사진`}
                  className="object-cover"
                />
                <AvatarFallback>{userInfo.nickname.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ) : (
              <LoginDialog />
            )}
            {registerOpen && <RegisterDialog />}
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={() => router.push('/mypage')}>
              <Heart className="h-[1.2rem] w-[1.2rem] transition-all" />
              <span className="sr-only">북마크</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Tabs defaultValue={tab || ''}>
            <TabsList>
              {getCategoriesData?.map((category) => {
                return (
                  <TabsTrigger
                    value={category.value}
                    key={category.value}
                    onClick={() => {
                      router.push(`main?tab=${category.value}`);
                    }}
                  >
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <Input placeholder="검색어를 입력해주세요." className="w-[240px] bg-gray-200" />
        </div>
      </div>
    </header>
  );
}
