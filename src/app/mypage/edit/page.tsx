'use client';

import Account from '../_components/edit/ACCOUNT';
import Profile from '../_components/edit/PROFILE';

import { useState } from 'react';

import { PencilLine } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const editMenus = [
  { label: '프로필', value: 'PROFILE' },
  { label: '출금계좌', value: 'ACCOUNT' },
];
export default function MyPageEdit() {
  const [selectTab, setSelectTab] = useState(editMenus[0].value);

  return (
    <section className="mx-[100px] my-10">
      <div className="flex gap-16">
        <div>
          <div className="relative">
            <Avatar className="h-[180px] w-[180px] shadow-xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-1 right-2 rounded-full"
            >
              <PencilLine className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full">
          <Tabs defaultValue={editMenus[0].value} value={selectTab || editMenus[0].value}>
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

            <TabsContent value={'PROFILE'}>
              <Profile />
            </TabsContent>
            <TabsContent value={'ACCOUNT'}>
              <Account />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
