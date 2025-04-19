'use client';

import { ChangeEvent, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSaveDescriptionImages, useSaveMainImage } from '@/services/ebook-image.hooks';
import { useCreateEbook } from '@/services/ebook.hooks';
import { useUploadPdf } from '@/services/pdf.hooks';
import { CreateEbookRequest } from '@leesm0518/devooks-api';
import { BookOpen, Eye, Loader2, Upload, X } from 'lucide-react';

import BookImageCarousel from '@/components/ebook/book-image-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { getFileData } from '@/lib/utils';

import { useCategoryStore } from '@/stores/global-store';

export default function BookAdd() {
  const form = useForm<CreateEbookRequest>({
    defaultValues: {
      pdfId: '',
      title: '',
      relatedCategoryIdList: [],
      descriptionImageIdList: [],
      price: 0,
      introduction: '',
      tableOfContents: '',
    },
  });

  const categories = useCategoryStore((state) => state.categories);
  const [previewOpen, setPreviewOpen] = useState(false);

  const pdfRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const descriptionImagesRef = useRef<HTMLInputElement>(null);

  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const [pdfFileName, setPdfFileName] = useState<string>('');

  const [mainImagePreview, setMainImagePreview] = useState<string[]>([]);
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState<string[]>([]);

  const { mutate: postEbooks, isPending: isSubmitting } = useCreateEbook();

  const {
    mutate: uploadPdf,
    isSuccess: isPdfSuccess,
    data: responsePdfs,
    isPending: isPdfLoading,
  } = useUploadPdf();

  const {
    mutate: postMainImage,
    isSuccess: isMainImageSuccess,
    data: responseMainImage,
    isPending: isMainImageLoading,
  } = useSaveMainImage();

  const {
    mutate: postDescriptionImages,
    isSuccess: isDescriptionImagesSuccess,
    data: responseDescriptionImages,
    isPending: isDescriptionImagesLoading,
  } = useSaveDescriptionImages();

  const onSubmit = (data: CreateEbookRequest) => {
    console.log('submit data by /book/add ', data);
    postEbooks({ createEbookRequest: data });
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
      uploadPdf({ pdf: pdfFile as unknown as string });
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

    postMainImage({ saveMainImageRequest: { image: imageData } });
  };

  // 책 소개 이미지 업로드
  const onHandleIntroductionImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    descriptionImagesRef?.current?.click();
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

    postDescriptionImages({ saveDescriptionImagesRequest: { imageList: imagesData } });
  };

  // 카테고리 이름 가져오기
  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds
      .map((id) => {
        const category = categories.find((c) => c.value === id);
        return category ? category.label : '';
      })
      .filter(Boolean);
  };

  useEffect(() => {
    if (!isPdfSuccess) return;
    form.setValue('pdfId', responsePdfs?.data.pdf.id);
    setPdfPageCount(responsePdfs?.data.pdf.pdfInfo.pageCount);
  }, [isPdfSuccess]);

  useEffect(() => {
    if (!isMainImageSuccess) return;
    form.setValue('mainImageId', responseMainImage?.data.mainImage.id);
  }, [isMainImageSuccess]);

  useEffect(() => {
    if (!isDescriptionImagesSuccess) return;
    const descriptionIds = responseDescriptionImages?.data.descriptionImageList.map(
      (image) => image.id,
    );
    form.setValue('descriptionImageIdList', descriptionIds || []);
  }, [isDescriptionImagesSuccess]);

  // 미리보기 컴포넌트
  const PreviewBookDetail = () => {
    const title = form.watch('title') || '제목을 입력해주세요';
    const price = form.watch('price') || 0;
    const introduction = form.watch('introduction') || '소개글을 입력해주세요';
    const tableOfContents = form.watch('tableOfContents') || '목차를 입력해주세요';
    const categoryIds = form.watch('relatedCategoryIdList') || [];

    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-50"
          onClick={() => setPreviewOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <ScrollArea className="h-[80vh]">
          <div className="p-6">
            <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
              {/* 커버 이미지 */}
              <div className="mb-6 md:mb-0">
                {mainImagePreview.length > 0 ? (
                  <div className="sticky top-6 aspect-[3/4] w-64 overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-md">
                    <img
                      src={mainImagePreview[0]}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="sticky top-6 flex aspect-[3/4] w-64 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-md">
                    <BookOpen className="h-16 w-16 text-slate-300" />
                  </div>
                )}
              </div>

              {/* 책 정보 */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>

                <div className="mt-4 flex flex-wrap gap-2">
                  {getCategoryNames(categoryIds).map((category, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      {price.toLocaleString()}원
                    </span>
                    {pdfPageCount > 0 && (
                      <span className="text-sm text-slate-500">(총 {pdfPageCount}페이지)</span>
                    )}
                  </div>

                  <div className="mt-8">
                    <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                      구매하기
                    </Button>
                    <Button variant="outline" className="mt-2 w-full">
                      장바구니에 추가
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-10" />

            {/* 책 소개 */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">책 소개</h2>
                <div className="mt-4 whitespace-pre-line text-slate-700">{introduction}</div>
              </div>

              {descriptionImagePreviews.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-medium text-slate-900">이미지 자료</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {descriptionImagePreviews.map((image, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-md border border-slate-200"
                      >
                        <img
                          src={image}
                          alt={`${title} 소개 이미지 ${index + 1}`}
                          className="w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold text-slate-900">목차</h2>
                <div className="mt-4 whitespace-pre-line text-slate-700">{tableOfContents}</div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center gap-3">
        <BookOpen className="h-7 w-7 text-slate-900" />
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
          전자책 등록
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* 기본 정보 섹션 */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">기본 정보</h2>

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

                  <div className="pt-2">
                    <h3 className="mb-2 text-sm font-medium">파일 업로드</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="pdfId"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div>
                                <Button
                                  variant="outline"
                                  className="h-24 w-full flex-col gap-2"
                                  onClick={onHandlePdfFile}
                                  disabled={isPdfLoading}
                                >
                                  {isPdfLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                  ) : (
                                    <Upload className="h-5 w-5" />
                                  )}
                                  <span>PDF 파일 업로드</span>
                                  {isPdfSuccess && pdfFileName && (
                                    <span className="mt-1 max-w-full truncate text-xs text-slate-500">
                                      {pdfFileName}
                                    </span>
                                  )}
                                </Button>
                                <Input
                                  type="file"
                                  className="hidden"
                                  ref={pdfRef}
                                  accept=".pdf"
                                  onChange={savePdfFile}
                                />
                                {isPdfSuccess && pdfPageCount > 0 && (
                                  <span className="mt-1 block text-xs text-slate-500">
                                    {pdfPageCount}페이지
                                  </span>
                                )}
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
                            <FormControl>
                              <div>
                                <Button
                                  variant="outline"
                                  className="h-24 w-full flex-col gap-2"
                                  onClick={onHandleMainImage}
                                  disabled={isMainImageLoading}
                                >
                                  {isMainImageLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                  ) : (
                                    <Upload className="h-5 w-5" />
                                  )}
                                  <span>커버 이미지</span>
                                  {mainImagePreview.length > 0 && (
                                    <span className="mt-1 text-xs text-slate-500">업로드 완료</span>
                                  )}
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
                    </div>
                  </div>
                </div>

                {/* 이미지 미리보기 섹션 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">미리보기</h2>
                    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-1.5 text-sm"
                          onClick={() => setPreviewOpen(true)}
                        >
                          <Eye className="h-4 w-4" />
                          게시될 형태로 보기
                        </Button>
                      </DialogTrigger>
                      <DialogPortal>
                        <DialogOverlay className="bg-black/50" />
                        <DialogContent className="max-w-4xl bg-white p-0">
                          <PreviewBookDetail />
                        </DialogContent>
                      </DialogPortal>
                    </Dialog>
                  </div>

                  {mainImagePreview.length > 0 ? (
                    <div className="mx-auto aspect-[3/4] w-48 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                      <img
                        src={mainImagePreview[0]}
                        alt="전자책 커버"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto flex aspect-[3/4] w-48 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                      <span className="text-sm text-slate-400">커버 이미지</span>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="descriptionImageIdList"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
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
                              {isDescriptionImagesLoading && (
                                <Loader2 className="mr-2 w-4 animate-spin" />
                              )}
                              책 소개 이미지 업로드
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

                  {descriptionImagePreviews.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {descriptionImagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="h-16 w-16 overflow-hidden rounded-md border border-slate-200"
                        >
                          <img
                            src={preview}
                            alt={`소개 이미지 ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 소개 및 목차 섹션 */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-lg font-medium">상세 정보</h2>

                <FormField
                  control={form.control}
                  name="introduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        책 소개글 <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="책 소개글을 입력해 주세요."
                          className="min-h-32"
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
                        목차 <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="목차를 입력해 주세요."
                          className="min-h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="h-12 w-32 bg-slate-900 text-white hover:bg-slate-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              등록하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
