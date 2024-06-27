'use client';

import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { codeToOptions } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { BookCategoryType, BookCategoryTypeCode } from '@/constant/common';

import Comment from './Comment';

const tabs = codeToOptions(BookCategoryTypeCode);

export default function ReviewInquiry() {
  const [selectTab, setSelectTab] = useState('REVIEW');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false);
  return (
    <section>
      <Card className="flex flex-col gap-4 bg-slate-300 text-slate-800 shadow">
        <div className="mx-auto my-8 w-[360px]">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">리뷰</span>
            <div className="flex gap-1">
              <FaStar size={28} />
              <FaStar size={28} />
              <FaStar size={28} />
              <FaStar size={28} />
              <FaRegStar size={28} />
            </div>
            <span>4.0 (1297)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold">문의</span>
            <span>132개</span>
          </div>
        </div>
      </Card>
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

          {tabs.map(({ label, value }: { label: string; value: BookCategoryType }) => {
            return (
              <TabsContent value={value} key={value}>
                {label}
                <Comment tag={value} />
              </TabsContent>
            );
          })}
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">글쓰기</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start">
            <DropdownMenuItem
              className="flex flex-col items-start"
              onClick={() => setIsReviewDialogOpen(true)}
            >
              <div className="text-lg font-semibold">리뷰</div>
              <p className="text-sm text-muted-foreground">
                전자책을 구매한 이후에 리뷰를 남겨보세요.
              </p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex flex-col items-start"
              onClick={() => setIsInquiryDialogOpen(true)}
            >
              <div className="text-lg font-semibold">문의</div>
              <p className="text-sm text-muted-foreground">
                전자책을 구매하기 전에 문의를 남겨보세요.
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>리뷰</DialogTitle>
          </DialogHeader>
          <Label>평점</Label>
          <div className="flex gap-1">
            <FaStar size={28} />
            <FaStar size={28} />
            <FaStar size={28} />
            <FaStar size={28} />
            <FaRegStar size={28} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="review_content">내용</Label>
            <Input id="review_content" type="text" />
          </div>
          <DialogFooter className="justify-center sm:justify-center">
            <Button type="submit">등록하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isInquiryDialogOpen} onOpenChange={setIsInquiryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>문의</DialogTitle>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="review_content">내용</Label>
            <Input id="review_content" type="text" />
          </div>
          <DialogFooter className="justify-center sm:justify-center">
            <Button type="submit">등록하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
