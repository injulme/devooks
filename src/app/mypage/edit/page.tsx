'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const editMenus = [
  { label: '프로필 정보', value: 'PROFILE' },
  { label: '계좌 정보', value: 'ACCOUNT' },
  { label: '회원 탈퇴', value: 'WITHDRAWAL' },
];
export default function MyPageEdit() {
  const [selectTab, setSelectTab] = useState(editMenus[0].value);
  const DynamicComponent = dynamic(() => import(`@/components/mypage/edit/${selectTab}`), {
    loading: () => <div>loading...</div>,
  });

  return (
    <section className="mx-[120px] mt-[80px]">
      <div className="flex gap-16">
        <div className="flex flex-col items-center gap-6">
          <Avatar className="h-[200px] w-[200px] shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button>프로필 변경</Button>
        </div>
        <div className="w-full">
          <Tabs
            defaultValue={editMenus[0].value}
            value={selectTab ?? editMenus[0].value}
          >
            <TabsList >
              {editMenus.map((menu) => {
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

            {editMenus.map((menu) => {
              return (
                <TabsContent value={menu.value} key={menu.value}>
                  <DynamicComponent />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
