'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import UserInfo from '@/components/mypage/UserInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mypageMenus = [
  { label: '등록 내역', value: 'MY_BOOK' },
  { label: '구매 내역', value: 'PURCHASE_HISTORY' },
  { label: '판매 관리', value: 'SALES_MANAGEMENT' },
];

export default function MyPage() {
  const [selectTab, setSelectTab] = useState('MY_BOOK');
  const DynamicComponent = dynamic(() => import(`@/components/mypage/${selectTab}`), {
    loading: () => <div>loading...</div>,
  });

  return (
    <section>
      <UserInfo />

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
