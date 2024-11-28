'use client';

import Comment from './comment';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetReviews } from '@/services/review/hooks/useGetReviews';
import { usePostReviews } from '@/services/review/hooks/usePostReviews';
import { ReviewPostRequest } from '@/services/review/type';
import { ArrowDownWideNarrow } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Ratings from '@/components/ui/ratings';
import { Textarea } from '@/components/ui/textarea';

export default function Review({ ebookId }: { ebookId: string }) {
  const form = useForm<ReviewPostRequest>({
    defaultValues: {
      rating: 0,
      content: '',
      ebookId: ebookId,
    },
  });

  const { data: reviews } = useGetReviews(ebookId);
  const {
    mutate: postReviews,
    error: errorReviews,
    isSuccess: isReviewPostSuccess,
    isError: isReviewPostError,
  } = usePostReviews();

  const onSubmit = (data: ReviewPostRequest) => {
    console.log('on submit review :: ', data);
    postReviews(data);
  };

  useEffect(() => {
    if (!isReviewPostSuccess) return;

    form.reset();
  }, [isReviewPostSuccess]);
  useEffect(() => {
    if (!isReviewPostError) return;
    // TODO: 403 error :  전차잭 구매 후 작성해주세요
    // console.log('errors :: ', errorReviews.response?.data.message);
  }, [isReviewPostError]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h6 className="text-lg font-bold">리뷰</h6>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="secondary" className="flex items-center gap-1">
              <ArrowDownWideNarrow size={16} />
              좋아요 순
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>최신순</DropdownMenuItem>
            <DropdownMenuItem>인기순</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 space-y-2 rounded-md bg-slate-100 p-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <div className="flex space-x-1">
                        <span className="text-sm text-gray-800">별점</span>
                        <Ratings
                          {...field}
                          variant="yellow"
                          asInput
                          onValueChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="로그인 후 리뷰를 작성해주세요. 😊"
                        // className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-end">
              <Button size="sm" variant="default" type="submit">
                등록
              </Button>
            </div>
          </div>
        </form>
      </Form>

      {reviews && reviews.data.length > 0 ? (
        reviews.data.map((review) => {
          return <Comment key={review.id} review={review} />;
        })
      ) : (
        <span className="text-sm font-semibold text-gray-800">등록된 리뷰가 없습니다.</span>
      )}
    </div>
  );
}
