'use client';

import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';

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
        <div>
          <div className="relative">
            <Avatar className="h-[200px] w-[200px] shadow-xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-1 right-2 rounded-full"
            >
              <MdModeEdit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full">
          <Tabs defaultValue={editMenus[0].value} value={selectTab ?? editMenus[0].value}>
            <TabsList>
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
