'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetReviewComments } from '@/services/review-comment/hooks/useGetReviewComments';
import { usePostReviewComments } from '@/services/review-comment/hooks/usePostReviewComments';
import { ReviewCommentPostRequest } from '@/services/review-comment/type';
import { ReviewSummary } from '@/services/review/type';
import dayjs from 'dayjs';
import { MessageSquareMore } from 'lucide-react';

import AvatarProfile from '@/components/avatar-profile/avatar-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Ratings from '@/components/ui/ratings';
import { Textarea } from '@/components/ui/textarea';

export default function Comment({ review }: { review: ReviewSummary }) {
  const [open, setOpen] = useState<boolean>(false);

  const { data: reviewComments } = useGetReviewComments(review.id, open);
  const { mutate: postReviewComments, isSuccess: isReviewCommentPostSuccess } =
    usePostReviewComments();

  const form = useForm<ReviewCommentPostRequest>({
    defaultValues: {
      content: '',
      reviewId: review.id,
    },
  });

  const onSubmit = (data: ReviewCommentPostRequest) => {
    postReviewComments(data);
  };

  useEffect(() => {
    if (!isReviewCommentPostSuccess) return;
    form.reset();
  }, [isReviewCommentPostSuccess]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex flex-col py-4 first-of-type:border-t-2">
        <div className="flex items-center gap-3">
          <AvatarProfile
            size={32}
            src={review.writer.profileImagePath}
            fallback={review.writer.nickname}
          />
          <div className="flex w-full justify-between gap-1">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              {review.writer.nickname} <div className="h-3 w-[1px] bg-gray-300" />
              {dayjs(review.modifiedDate).format('YYYY.MM.DD HH:mm:ss')}
            </span>
            <Ratings size={16} value={review.rating} variant="yellow" />
          </div>
        </div>
        <p className="mt-1 text-sm leading-5 text-gray-800">{review.content}</p>
        <div className="flex justify-end">
          <CollapsibleTrigger>
            <Button variant="link" size="sm">
              <MessageSquareMore size={20} strokeWidth={1.5} className="mr-1 scale-x-[-1]" />
              {review.commentCount}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-2 rounded-md bg-slate-100 p-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} placeholder="로그인 후 답글을 작성해주세요. 😊" />
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
        {reviewComments && reviewComments?.data.length > 0 ? (
          reviewComments?.data.map((comment) => {
            return (
              <div className="mb-4 rounded-sm bg-slate-100 p-4" key={comment.id}>
                <div className="flex items-center gap-3">
                  <AvatarProfile
                    size={24}
                    src={comment.writer.profileImagePath}
                    fallback={comment.writer.nickname}
                  />
                  <div className="flex w-full justify-between gap-1">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      {comment.writer.nickname} <div className="h-3 w-[1px] bg-gray-300" />
                      {dayjs(comment.modifiedDate).format('YYYY.MM.DD HH:mm:ss')}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-5 text-gray-800">{comment.content}</p>
              </div>
            );
          })
        ) : (
          <span className="text-sm font-semibold text-gray-800">등록된 답글이 없습니다.</span>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
