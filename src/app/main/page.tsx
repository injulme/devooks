'use client';

import { Fragment, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { codeToOptions } from '@/lib/utils';

import BookBox from '@/components/main/BookBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { TabTypeCode } from '@/constant/common';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

const mainMenus = codeToOptions(TabTypeCode);
export default function Main() {
  const params = useSearchParams();
  const tab = params.get('tab');
  const [selectTab, setSelectTab] = useState(tab);

  return (
    <Fragment>
      <Tabs defaultValue={mainMenus[0].value} value={selectTab ?? mainMenus[0].value}>
        <TabsList>
          {mainMenus.map((menu) => {
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

        {mainMenus.map((menu) => {
          return (
            <TabsContent value={menu.value} key={menu.value}>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-1">
                {dummy.map((d) => {
                  return (
                    <Link href={{ pathname: `/book/${d}` }} key={d}>
                      <BookBox bookId={d} />
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Fragment>
  );
}
