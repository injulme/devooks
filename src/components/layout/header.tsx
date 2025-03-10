'use client';

import LoginDialog from './components/LoginDialog';
import NotificationPopover from './components/NotificationPopover';
import RegisterDialog from './components/RegisterDialog';

import { forwardRef, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useGetCategories } from '@/services/category.hooks';
import { Heart, Search } from 'lucide-react';

import Logo from '@/assets/images/devooks_logo.png';

import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconInput } from '@/components/ui/icon-input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

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
    <header className="sticky top-0 z-[99] bg-white shadow dark:bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-2 px-6 pt-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} alt="devooks 로고" height={32} />
          </Link>
          <div className="flex items-center gap-2">
            {/* 책 등록 */}
            <Button variant="ghost">
              <Link href="/book/add">책 등록</Link>
            </Button>

            {/* 찜 */}
            <Button variant="ghost" size="icon" onClick={() => router.push('/mypage')}>
              <Heart className="h-[1.2rem] w-[1.2rem] transition-all" />
              <span className="sr-only">북마크</span>
            </Button>

            {/* 알림 */}
            <NotificationPopover />

            {/* 다크모드 */}
            <ThemeToggle />

            {/* 로그인 */}
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
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Tabs defaultValue={tab || ''} className="max-lg:hidden">
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
          <NavigationMenu className="lg:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>카테고리</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[144px]">
                    {getCategoriesData?.map((category) => (
                      <ListItem
                        key={category.value}
                        title={category.label}
                        href={`main?tab=${category.value}`}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <IconInput
            placeholder="검색어를 입력해주세요."
            icon={Search}
            iconProps={{ behavior: 'append', className: 'stroke-slate-600' }}
          />
        </div>
      </div>
    </header>
  );
}
const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm leading-none">{title}</div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';
