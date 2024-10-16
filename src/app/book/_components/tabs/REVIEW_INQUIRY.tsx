'use client';

import Comment from './Comment';

import { SyntheticEvent, useState } from 'react';

import InquiryDialog from '@/app/book/_components/reviewDialog/InquiryDialog';
import ReviewDialog from '@/app/book/_components/reviewDialog/ReviewDialog';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BookCategoryType, BookCategoryTypeCode } from '@/constant/common';

import { codeToArray } from '@/lib/utils';

const tabs = codeToArray(BookCategoryTypeCode);

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

export default function ReviewInquiry() {
  const [selectTab, setSelectTab] = useState('REVIEW');

  return (
    <section>
      <div className="mt-4 flex justify-between">
        <Tabs defaultValue={tabs[0].value} value={selectTab ?? tabs[0].value}>
          <TabsList>
            {tabs.map((menu) => {
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

          {tabs.map(({ value }: { value: BookCategoryType }) => {
            return (
              <TabsContent value={value} key={value} className="space-y-4">
                {dummy.map((i) => {
                  return <Comment key={i} />;
                })}
              </TabsContent>
            );
          })}
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">글쓰기</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start">
            <ReviewDialog
              triggerComponent={
                <DropdownMenuItem
                  className="flex flex-col items-start"
                  onSelect={(e: SyntheticEvent<HTMLDivElement>) => e.preventDefault()}
                >
                  <div className="text-lg font-semibold">리뷰</div>
                  <p className="text-sm text-muted-foreground">
                    전자책을 구매한 이후에 리뷰를 남겨보세요.
                  </p>
                </DropdownMenuItem>
              }
            />
            <DropdownMenuSeparator />
            <InquiryDialog
              triggerComponent={
                <DropdownMenuItem
                  className="flex flex-col items-start"
                  onSelect={(e: SyntheticEvent<HTMLDivElement>) => e.preventDefault()}
                >
                  <div className="text-lg font-semibold">문의</div>
                  <p className="text-sm text-muted-foreground">
                    전자책을 구매하기 전에 문의를 남겨보세요.
                  </p>
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
