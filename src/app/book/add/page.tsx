'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillPicture } from 'react-icons/ai';

import { EbookPostRequest } from '@/services/ebook/type';
import { usePostPdfs } from '@/services/pdf/hooks/usePostPdfs';
import dayjs from 'dayjs';
import { Heart, Loader2, Star } from 'lucide-react';

import BookDetailCard from '@/app/book/_components/book-detail-card';

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

const bookTabs = codeToArray(BookDetailTabTypeCode).slice(0, -2);

export default function BookAdd() {
  const form = useForm<EbookPostRequest>();
  const pdfRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const introductionImageRef = useRef<HTMLInputElement>(null);
  const [selectTab, setSelectTab] = useState<BookDetailTabType>('INTRODUCTION');
  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const [pdfFileName, setPdfFileName] = useState<string>('');

  // TODO: progress bar 추가
  const {
    mutate: postPdfs,
    isSuccess: isPdfSuccess,
    data: responsePdfs,
    progress,
    isPending: isPdfLoading,
  } = usePostPdfs();

  const onSubmit = (data: EbookPostRequest) => {
    // console.log('submit data by /book/add ', data);
  };

  // 전자책 업로드 (PDF 파일 업로드)
  const onHandlePdfFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    pdfRef?.current?.click();
  };
  // PDF 업로드
  const savePdfFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files?.length <= 0) return;

    const pdfFile = files?.[0];
    if (!pdfFile) return;
    setPdfFileName(pdfFile.name);
    const fileType = pdfFile.type;
    if (fileType !== 'application/pdf') {
      return alert('파일 형식이 맞지 않습니다. PDF 파일을 업로드해주세요.');
    } else {
      postPdfs(pdfFile);
    }
  };

  // 메인 이미지 업로드
  const onHandleMainImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mainImageRef?.current?.click();
  };
  // 책 소개 이미지 업로드
  const onHandleIntroductionImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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

  useEffect(() => {
    if (!isPdfSuccess) return;

    form.setValue('pdfId', responsePdfs?.pdf.id);
    setPdfPageCount(responsePdfs?.pdf.pdfInfo.pageCount);
  }, [isPdfSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight lg:mb-4 lg:text-3xl">
          전자책 등록
        </h1>
        <section className="grid grid-cols-5 gap-4">
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

            <BookDetailCard pageCount={pdfPageCount} />
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
          <div className="col-span-2 flex flex-col gap-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="pdfId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      전자책 업로드 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={onHandlePdfFile}
                          disabled={isPdfLoading}
                        >
                          {isPdfLoading && <Loader2 className="w-4 animate-spin" />}
                          PDF 파일 업로드
                        </Button>
                        <Input
                          type="file"
                          className="hidden"
                          ref={pdfRef}
                          accept=".pdf"
                          onChange={savePdfFile}
                        />
                        <div className="mt-2 flex flex-col">
                          <span className="text-xs text-gray-600">
                            업로드 완료 시, 페이지 수가 자동으로 입력됩니다.
                          </span>
                          {!isPdfLoading && isPdfSuccess && (
                            <span className="text-xs text-muted-foreground text-sky-500">
                              업로드가 완료되었습니다. <br />
                              등록된 파일명 : <b>{pdfFileName}</b>
                            </span>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mainImageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      메인 이미지 업로드 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Button variant="outline" className="w-full" onClick={onHandleMainImage}>
                          메인 이미지 업로드
                        </Button>
                        <Input type="file" className="hidden" ref={mainImageRef} accept="image/*" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptionImageIdList"
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      전자책 이름 <span className="text-red-500">*</span>
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
                name="relatedCategoryIdList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      카테고리 <span className="text-red-500">*</span>
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      금액 <span className="text-red-500">*</span>
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
                        책 소개글 <span className="text-red-500">*</span>
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
                        목차 <span className="text-red-500">*</span>
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
        </section>
      </form>
    </Form>
  );
}
