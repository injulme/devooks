'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import UserInfo from '@/components/mypage/UserInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mypageMenus = [
  { label: '책', value: 'MY_BOOK' },
  { label: '받은 리뷰', value: 'REVIEWS' },
  { label: '구매 내역', value: 'PURCHASE_HISTORY' },
  { label: '판매 관리', value: 'SALES_MANAGEMENT' },
];

export default function MyPage() {
  const [selectTab, setSelectTab] = useState('PURCHASE_HISTORY');
  const DynamicComponent = dynamic(() => import(`@/components/mypage/${selectTab}`), {
    loading: () => <div>loading...</div>,
  });

  return (
    <section>
      <UserInfo />

      <Tabs
        defaultValue={mypageMenus[0].value}
        className="w-full"
        value={selectTab ?? mypageMenus[0].value}
      >
        <TabsList className="h-[56px]">
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
            <TabsContent value={menu.value} key={menu.value}>
              <DynamicComponent />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
