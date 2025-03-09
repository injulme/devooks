'use client';

import MyBook from './_components/MY_BOOK';
import PurchaseHistory from './_components/PURCHASE_HISTORY';
import SalesManagement from './_components/SALES_MANAGEMENT';
import Wishlist from './_components/WISHLIST';

import { useRouter, useSearchParams } from 'next/navigation';

import UserInfo from '@/app/mypage/_components/UserInfo';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useAuthStore } from '@/stores/auth-store';

const MENU_ENUM = {
  MY_BOOK: 'my_book',
  PURCHASE_HISTORY: 'purchase_history',
  SALES_MANAGEMENT: 'sales_management',
  WISHLIST: 'wishlist',
} as const;

// TODO: mypage tab dynamic -> router로 변경까지 했음
// TODO: 찜목록에 페이지네이션 적용해야됨

const mypageMenus = [
  { label: '판매중인 책', value: MENU_ENUM.MY_BOOK },
  { label: '구매한 책', value: MENU_ENUM.PURCHASE_HISTORY },
  { label: '판매 관리', value: MENU_ENUM.SALES_MANAGEMENT },
  { label: '찜 목록', value: MENU_ENUM.WISHLIST },
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
    <section>
      <UserInfo userId={userId} />

      <Tabs
        defaultValue={mypageMenus[0].value}
        value={tab ?? mypageMenus[0].value}
        className="px-12"
      >
        <TabsList>
          {mypageMenus.map((menu) => {
            return (
              <TabsTrigger
                value={menu.value}
                key={menu.value}
                onClick={() => onTabClick(menu.value)}
              >
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
    </section>
  );
}
