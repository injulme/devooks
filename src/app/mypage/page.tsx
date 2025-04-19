'use client';

import MyBook from './_components/MY_BOOK';
import PurchaseHistory from './_components/PURCHASE_HISTORY';
import SalesManagement from './_components/SALES_MANAGEMENT';
import Wishlist from './_components/WISHLIST';

import { useRouter, useSearchParams } from 'next/navigation';

import { BarChart2, BookMarked, BookOpen, ShoppingBag } from 'lucide-react';

import UserInfo from '@/app/mypage/_components/UserInfo';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useAuthStore } from '@/stores/auth-store';

const MENU_ENUM = {
  MY_BOOK: 'my_book',
  PURCHASE_HISTORY: 'purchase_history',
  SALES_MANAGEMENT: 'sales_management',
  WISHLIST: 'wishlist',
} as const;

const mypageMenus = [
  { label: '판매중인 책', value: MENU_ENUM.MY_BOOK, icon: <BookOpen className="mr-2 h-4 w-4" /> },
  {
    label: '구매한 책',
    value: MENU_ENUM.PURCHASE_HISTORY,
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
  },
  {
    label: '판매 관리',
    value: MENU_ENUM.SALES_MANAGEMENT,
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
  },
  { label: '찜 목록', value: MENU_ENUM.WISHLIST, icon: <BookMarked className="mr-2 h-4 w-4" /> },
];

export default function MyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = useAuthStore((state) => state.id);

  const tab = searchParams.get('tab');

  const onTabClick = (value: string) => {
    router.push(`/mypage?tab=${value}`);
  };

  return (
    <section className="min-h-screen bg-slate-50 pb-12">
      <div className="mx-auto max-w-6xl">
        <UserInfo userId={userId ?? ''} />

        <div className="mx-4 mt-8 rounded-xl bg-white p-6 shadow-md">
          <h1 className="mb-6 px-2 font-serif text-2xl font-bold text-slate-800">나의 서재</h1>

          <Tabs
            defaultValue={mypageMenus[0].value}
            value={tab ?? mypageMenus[0].value}
            className="w-full"
          >
            <TabsList className="mb-6 grid w-full grid-cols-4 gap-2 bg-slate-100 p-1">
              {mypageMenus.map((menu) => {
                return (
                  <TabsTrigger
                    value={menu.value}
                    key={menu.value}
                    onClick={() => onTabClick(menu.value)}
                    className="flex items-center justify-center py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                  >
                    {menu.icon}
                    {menu.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={MENU_ENUM.MY_BOOK} className="my-4">
              <MyBook />
            </TabsContent>
            <TabsContent value={MENU_ENUM.PURCHASE_HISTORY} className="my-4">
              <PurchaseHistory />
            </TabsContent>
            <TabsContent value={MENU_ENUM.SALES_MANAGEMENT} className="my-4">
              <SalesManagement />
            </TabsContent>
            <TabsContent value={MENU_ENUM.WISHLIST} className="my-4">
              <Wishlist />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
