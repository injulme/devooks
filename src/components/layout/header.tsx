'use client';

import LoginDialog from './components/LoginDialog';
import NotificationPopover from './components/NotificationPopover';
import RegisterDialog from './components/RegisterDialog';

import { forwardRef, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useGetCategories } from '@/services/category.hooks';
import { BookOpen, Heart, Menu, Search, ShoppingCart } from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconInput } from '@/components/ui/icon-input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import { useAuthStore } from '@/stores/auth-store';
import { useSignupStore } from '@/stores/auth-store';
import { useCategoryStore } from '@/stores/global-store';

export default function Header() {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params?.get('tab');

  const registerOpen = useSignupStore((state) => state.open);
  const userInfo = useAuthStore((state) => state);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const { data: getCategoriesData } = useGetCategories();

  useEffect(() => {
    if (!getCategoriesData || getCategoriesData.length === 0) return;
    updateCategory({ categories: getCategoriesData });
  }, [getCategoriesData]);

  return (
    <header className="sticky top-0 z-[99] border-b border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-center px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-slate-900 dark:text-white" />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                readit
              </span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  <Menu className="h-4 w-4" />
                  <span>카테고리</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-[100] w-48" sideOffset={8}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push('/main?tab=ALL')}
                >
                  전체
                </DropdownMenuItem>

                {getCategoriesData?.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    className="cursor-pointer"
                    onClick={() => router.push(`/main?tab=${category.value}`)}
                  >
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mx-6 max-w-md flex-1">
            <IconInput
              placeholder="찾으시는 PDF가 있으신가요?"
              icon={Search}
              className="border-gray-200 focus-within:border-slate-400 dark:border-slate-700 dark:focus-within:border-slate-500"
              iconProps={{ behavior: 'append', className: 'stroke-slate-400' }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            {/* PDF 등록 버튼 */}
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Link href="/book/add">PDF 등록</Link>
            </Button>

            {/* 장바구니 */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => router.push('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">장바구니</span>
            </Button>

            {/* 찜 */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => router.push('/mypage')}
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">북마크</span>
            </Button>

            {/* 알림 */}
            <NotificationPopover />

            {/* 다크모드 */}
            <ThemeToggle />

            {/* 로그인 */}
            {userInfo.id ? (
              <Avatar
                onClick={() => router.push('/mypage')}
                className="cursor-pointer border border-gray-200 dark:border-slate-700"
              >
                <AvatarImage
                  src={userInfo.profileImagePath}
                  alt={`${userInfo.nickname} 작가의 프로필 사진`}
                  className="object-cover"
                />
                <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {userInfo.nickname?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <LoginDialog />
            )}
            {registerOpen && <RegisterDialog />}
          </div>
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
              'block select-none space-y-1 rounded-md p-3 leading-none text-zinc-200 no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white',
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
