'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { codeToOptions } from '@/lib/utils';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { TabTypeCode } from '@/constant/common';

const mainMenus = codeToOptions(TabTypeCode);
export default function Main() {
  const params = useSearchParams();
  const tab = params.get('tab');
  const [selectTab, setSelectTab] = useState(tab);

  return (
    <section>
      <Tabs
        defaultValue={mainMenus[0].value}
        className="w-full"
        value={selectTab ?? mainMenus[0].value}
      >
        <TabsList  className="h-[56px]">
          {mainMenus.map((menu) => {
            return (
              <TabsTrigger value={menu.value} key={menu.value} onClick={() => setSelectTab(menu.value)}>
                {menu.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {mainMenus.map((menu) => {
          return (
            <TabsContent value={menu.value} key={menu.value}>
              {menu.label}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
