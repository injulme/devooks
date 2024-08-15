'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillPicture } from 'react-icons/ai';

import dayjs from 'dayjs';

import Heart from '@/assets/icons/heart.svg';
import Star from '@/assets/icons/star.svg';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { BookDetailTabType, BookDetailTabTypeCode, CategoryTypeCode } from '@/constant/common';

import { codeToArray } from '@/lib/utils';

const categoryList = codeToArray(CategoryTypeCode);

const bookTabs = codeToArray(BookDetailTabTypeCode).slice(0, -1);

type BookSummary = {
  pdfFile: File;
  pageTotalCount: number;
  name: string;
  category: string[];
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
  const [selectTab, setSelectTab] = useState<BookDetailTabType>('INTRODUCTION');

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

  const [mainImagePreview, setMainImagePreview] = useState<string>();
  const [introductionImagePreviews, setIntroductionImagePreviews] = useState<string[]>([]);
  const saveImgFile = () => {
    if (!mainImageRef.current?.files) return;

    const file = mainImageRef?.current?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMainImagePreview(reader.result as string);
    };
  };

  const onHandleIntroductionImagePreview = () => {
    if (!introductionImageRef.current?.files) return;

    const files = introductionImageRef?.current?.files;
    Object.values(files).map((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setIntroductionImagePreviews((prev) => [...prev, reader.result as string]);
      };
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid grid-cols-5 gap-4">
          <div className="col-span-2 flex flex-col gap-8">
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl">
              전자책 등록
            </h1>
            <div className="space-y-4">
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
                        <Input
                          type="file"
                          className="hidden"
                          ref={mainImageRef}
                          accept="image/*"
                          onChange={saveImgFile}
                        />
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
                        <Input
                          type="file"
                          multiple
                          className="hidden"
                          ref={introductionImageRef}
                          accept="image/*"
                          onChange={onHandleIntroductionImagePreview}
                        />
                      </div>
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
                      <MultiSelect
                        options={categoryList}
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? []}
                        placeholder="카테고리를 선택해주세요"
                        variant="inverted"
                        animation={2}
                        maxCount={5}
                        modalPopover
                        {...field}
                      />
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
                name="introduction"
                render={({ field }) => {
                  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setSelectTab('INTRODUCTION');
                    form.setValue('introduction', e.target.value);
                    return e;
                  };
                  return (
                    <FormItem>
                      <FormLabel>
                        책 소개글 <span className="text-red-600">(필수)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="책 소개글을 입력해 주세요."
                          className="resize-none"
                          onChange={onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="tableOfContents"
                render={({ field }) => {
                  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setSelectTab('TABLE_OF_CONTENTS');
                    form.setValue('tableOfContents', e.target.value);

                    return e;
                  };
                  return (
                    <FormItem>
                      <FormLabel>
                        목차 <span className="text-red-600">(필수)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="목차를 입력해 주세요."
                          className="resize-none"
                          onChange={onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button className="w-full">등록하기</Button>
            </div>
          </div>
          <div className="col-span-3">
            {mainImagePreview ? (
              <img
                src={mainImagePreview}
                className="mb-4 h-[430px] w-full rounded bg-no-repeat object-cover"
              />
            ) : (
              <div className="mb-4 flex h-[430px] w-full items-center justify-center rounded border">
                <AiFillPicture size={140} className="bg-no-repeat object-cover text-gray-300" />
              </div>
            )}
            <Carousel opts={{ loop: true }} className="mb-4">
              <CarouselContent>
                {introductionImagePreviews.length > 0
                  ? introductionImagePreviews.map((image, index) => {
                      return (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                          <div className="h-[230px] rounded border">
                            <img
                              src={image}
                              alt={`cover_${index}`}
                              className="h-full w-full rounded bg-no-repeat object-cover"
                            />
                          </div>
                        </CarouselItem>
                      );
                    })
                  : [0, 1, 2].map((i) => {
                      return (
                        <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                          <div className="flex h-[230px] items-center justify-center rounded border">
                            <AiFillPicture
                              size={80}
                              className="bg-no-repeat object-cover text-gray-300"
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
              </CarouselContent>
              <CarouselPrevious className="left-[32px]" />
              <CarouselNext className="right-[32px]" />
            </Carousel>

            <Card className="p-6 shadow-lg">
              <div className="flex justify-between text-sm text-zinc-700">
                <span className="mb-4 flex items-center gap-1">
                  <Heart /> 00
                </span>
                <span>{dayjs().format('YYYY-MM-DD')}</span>
              </div>
              <p className="text-sm text-zinc-500">
                {form.watch('category').map((cate) => `#${cate} `)}
              </p>
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {form.watch('name')}
              </h2>
              <div className="text-md flex items-center gap-1 text-zinc-800">
                <Star /> 0.0 (0)
              </div>
              <div className="mt-12 flex flex-col gap-2">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {Intl.NumberFormat().format(form.watch('amount') ?? 0)}원{' '}
                  <span className="text-sm font-medium text-muted-foreground">(VAT 포함)</span>
                </h4>
                <p className="text-gray-800">
                  {Intl.NumberFormat().format(form.watch('pageTotalCount') ?? 0)} 페이지
                </p>
              </div>
            </Card>
            <Tabs
              className="mt-12"
              defaultValue={bookTabs[0].value}
              value={selectTab ?? bookTabs[0].value}
            >
              <TabsList>
                {bookTabs.map((menu) => {
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

              {bookTabs.map((menu) => {
                return (
                  <TabsContent value={menu.value} key={menu.value}>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      {menu.value === 'INTRODUCTION'
                        ? form.watch('introduction')
                        : form.watch('tableOfContents')}
                    </p>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
      </form>
    </Form>
  );
}
