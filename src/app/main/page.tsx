'use client';

import { Fragment, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import BookBox from '@/app/main/_components/BookBox';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { TabTypeCode } from '@/constant/common';

import { codeToArray } from '@/lib/utils';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

const mainMenus = codeToArray(TabTypeCode);

export default function Main() {
  const params = useSearchParams();
  const tab = params?.get('tab');
  const [selectTab, setSelectTab] = useState(tab || mainMenus[0].value);

  return (
    <Fragment>
      <Tabs defaultValue={mainMenus[0].value} value={selectTab}>
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
                    <Link href={`/book/${d}`} key={d}>
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
