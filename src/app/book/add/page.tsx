'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type BookSummary = {
  pdfFile: File;
  pageTotalCount: number;
  name: string;
  category: string;
  amount: number;
  mainImage: File;
  introductionImage: File;
  introduction: string;
  tableOfContents: string;
};
export default function BookAdd() {
  const form = useForm<BookSummary>();
  const pdfRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const introductionImageRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: BookSummary) => {
    console.log('submit data by /book/add ', data);
  };
  const onHandlePdfFile = () => {
    pdfRef?.current?.click();
  };
  const onHandleMainImage = () => {
    mainImageRef?.current?.click();
  };
  const onHandleIntroductionImage = () => {
    introductionImageRef?.current?.click();
  };

  return (
    <section className="grid grid-cols-5 gap-4">
      <div className="col-span-2 flex flex-col gap-8">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl">
          전자책 등록
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    전자책 업로드 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Button variant="outline" className="w-full" onClick={onHandlePdfFile}>
                        PDF 파일 업로드
                      </Button>
                      <Input type="file" className="hidden" ref={pdfRef} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pageTotalCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    페이지 수 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="페이지 수를 입력해 주세요." type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    전자책 이름 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력해 주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    카테고리 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="카테고리를 입력해 주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    금액 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="금액을 입력해 주세요." type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    메인 이미지 업로드 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Button variant="outline" className="w-full" onClick={onHandleMainImage}>
                        메인 이미지 업로드
                      </Button>
                      <Input type="file" className="hidden" ref={mainImageRef} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="introductionImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    책소개 이미지 <span className="text-stone-600">(선택)</span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={onHandleIntroductionImage}
                      >
                        책 소개 이미지 업로드
                      </Button>
                      <Input type="file" className="hidden" ref={introductionImageRef} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    책 소개글 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="책 소개글을 입력해 주세요."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tableOfContents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    목차 <span className="text-red-600">(필수)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="목차를 입력해 주세요."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">등록하기</Button>
          </form>
        </Form>
      </div>
      <div className="col-span-3">box</div>
    </section>
  );
}
