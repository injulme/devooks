'use client';

import { ChangeEvent, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { usePostDescriptionImages } from '@/services/ebook/hooks/usePostDescriptionImages';
import { usePostEbooks } from '@/services/ebook/hooks/usePostEbooks';
import { usePostMainImage } from '@/services/ebook/hooks/usePostMainImage';
import { EbookPostRequest } from '@/services/ebook/type';
import { usePostPdfs } from '@/services/pdf/hooks/usePostPdfs';
import { Loader2 } from 'lucide-react';

import BookDetailCard from '@/components/ebook/book-detail-card';
import BookImageCarousel from '@/components/ebook/book-image-carousel';
import { Button } from '@/components/ui/button';
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

import { BookDetailTabType, BookDetailTabTypeCode } from '@/constant/common';

import { codeToArray } from '@/lib/utils';

import { useCategoryStore } from '@/stores/global-store';

const bookTabs = codeToArray(BookDetailTabTypeCode).slice(0, -2);

// TODO: editor 연동
export default function BookAdd() {
  const form = useForm<EbookPostRequest>();
  const [selectTab, setSelectTab] = useState<BookDetailTabType>('INTRODUCTION');
  const categories = useCategoryStore((state) => state.categories);

  const pdfRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const descriptionImagesRef = useRef<HTMLInputElement>(null);

  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const [pdfFileName, setPdfFileName] = useState<string>('');

  const [mainImagePreview, setMainImagePreview] = useState<string[]>([]);
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState<string[]>([]);

  const { mutate: postEbooks } = usePostEbooks();

  // TODO: progress bar 추가
  const {
    mutate: postPdfs,
    isSuccess: isPdfSuccess,
    data: responsePdfs,
    progress,
    isPending: isPdfLoading,
  } = usePostPdfs();

  const {
    mutate: postMainImage,
    isSuccess: isMainImageSuccess,
    data: responseMainImage,
    isPending: isMainImageLoading,
  } = usePostMainImage();
  const {
    mutate: postDescriptionImages,
    isSuccess: isDescriptionImagesSuccess,
    data: responseDescriptionImages,
    isPending: isDescriptionImagesLoading,
  } = usePostDescriptionImages();

  const onSubmit = (data: EbookPostRequest) => {
    console.log('submit data by /book/add ', data);

    postEbooks(data);
  };

  // 전자책 업로드 (PDF 파일 업로드)
  const onHandlePdfFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    pdfRef?.current?.click();
  };
  // PDF 서버로 업로드
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
  const saveMainImgFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files?.length <= 0) return;
    const mainImageFile = files?.[0];
    if (!mainImageFile) return;
    const imageData = await getFileData(mainImageFile, setMainImagePreview);

    postMainImage({ image: imageData });
  };

  // 책 소개 이미지 업로드
  const onHandleIntroductionImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    descriptionImagesRef?.current?.click();
  };

  const getFileData = (file: File, callbackPreview: SetStateAction<any>): Promise<any> => {
    return new Promise((resolve, reject) => {
      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        alert('파일 형식이 맞지 않습니다. JPG, PNG 파일을 업로드해주세요.');
        reject('Invalid file type');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (!reader.result) {
            reject('Failed to read file');
            return;
          }

          callbackPreview((prev: any) => [...prev, reader.result as string]);

          const base64Raw = (reader.result as string).split(',')[1]; // Base64 데이터 추출
          const extension = file.name.split('.').pop(); // 파일 확장자 추출
          const byteSize = file.size; // 파일 크기 (바이트 단위)

          const imageData = {
            base64Raw,
            extension: extension?.toUpperCase(),
            byteSize,
          };
          resolve(imageData);
        };
        reader.onerror = () => {
          reject('Error reading file');
        };
      }
    });
  };

  const saveDescriptionImgFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files?.length <= 0) return;
    const descriptionImages = files;
    if (!descriptionImages) return;

    const imagesData = await Promise.all(
      Object.values(descriptionImages).map(async (file) => {
        const fileData = await getFileData(file, setDescriptionImagePreviews);
        return fileData;
      }),
    );

    postDescriptionImages({ imageList: imagesData });
  };

  useEffect(() => {
    if (!isPdfSuccess) return;
    // PDF 업로드 성공 시, form에 pdfId 값 세팅
    form.setValue('pdfId', responsePdfs?.pdf.id);
    setPdfPageCount(responsePdfs?.pdf.pdfInfo.pageCount);
  }, [isPdfSuccess]);

  useEffect(() => {
    if (!isMainImageSuccess) return;
    // 메인 이미지 업로드 성공 시, form에 mainImageId 값 세팅
    form.setValue('mainImageId', responseMainImage?.mainImage.id);
  }, [isMainImageSuccess]);

  useEffect(() => {
    if (!isDescriptionImagesSuccess) return;
    // 설명 이미지 업로드 성공 시, form에 mainImageId 값 세팅
    const descriptionIds = responseDescriptionImages?.descriptionImageList.map((image) => image.id);
    form.setValue('descriptionImageIdList', descriptionIds);
  }, [isDescriptionImagesSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="mb-2 scroll-m-20 text-2xl font-semibold tracking-tight lg:mb-4 lg:text-3xl">
          전자책 등록
        </h1>
        <section className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <BookImageCarousel
              mainImagePreview={mainImagePreview}
              descriptionImagePreviews={descriptionImagePreviews}
              className="mb-4"
            />

            <BookDetailCard
              pageCount={pdfPageCount}
              price={form.watch('price')}
              relatedCategoryIdList={form.watch('relatedCategoryIdList')}
            />
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
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={onHandleMainImage}
                          disabled={isMainImageLoading}
                        >
                          {isMainImageLoading && <Loader2 className="w-4 animate-spin" />}
                          메인 이미지 업로드
                        </Button>
                        <Input
                          type="file"
                          className="hidden"
                          ref={mainImageRef}
                          accept="image/*"
                          onChange={saveMainImgFile}
                        />
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
                          disabled={isDescriptionImagesLoading}
                        >
                          {isDescriptionImagesLoading && <Loader2 className="w-4 animate-spin" />}책
                          소개 이미지 업로드
                        </Button>
                        <Input
                          type="file"
                          multiple
                          className="hidden"
                          ref={descriptionImagesRef}
                          accept="image/*"
                          onChange={saveDescriptionImgFile}
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
                        options={categories}
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
