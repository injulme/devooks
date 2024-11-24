'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import UserInfo from '@/app/mypage/_components/UserInfo';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/auth-store';

const mypageMenus = [
  { label: '판매중인 책', value: 'MY_BOOK' },
  { label: '구매한 책', value: 'PURCHASE_HISTORY' },
  { label: '판매 관리', value: 'SALES_MANAGEMENT' },
  { label: '찜 목록', value: 'WISHLIST' },
];

export default function MyPage() {
  const [selectTab, setSelectTab] = useState('MY_BOOK');
  const DynamicComponent = dynamic(() => import(`@/app/mypage/_components/${selectTab}`), {
    loading: () => <div>loading...</div>,
  });
  const userId = useAuthStore((state) => state.id);
  return (
    <section>
      <UserInfo userId={userId}/>

      <Tabs
        defaultValue={mypageMenus[0].value}
        value={selectTab ?? mypageMenus[0].value}
        className="my-4 px-12"
      >
        <TabsList>
          {mypageMenus.map((menu) => {
            return (
              <TabsTrigger
                value={menu.value}
                key={menu.value}
                onClick={() => setSelectTab(menu.value)}
              >
                {menu.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {mypageMenus.map((menu) => {
          return (
            <TabsContent value={menu.value} key={menu.value} className="mx-8 my-4">
              <DynamicComponent />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
