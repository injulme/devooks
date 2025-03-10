'use client';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useCreateReviewComment,
  useDeleteReviewComment,
  useGetReviewComments,
  useModifyReviewComment,
} from '@/services/review-comment.hooks';
import {
  ReviewCommentPatchRequest,
  ReviewCommentPostRequest,
} from '@/services/review-comment/type';
import { ReviewSummary } from '@/services/review/type';
import dayjs from 'dayjs';
import { MessageSquareMore } from 'lucide-react';

import AvatarProfile from '@/components/avatar-profile/avatar-profile';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Ratings from '@/components/ui/ratings';
import { Textarea } from '@/components/ui/textarea';

export default function Comment({ review }: { review: ReviewSummary }) {
  const [open, setOpen] = useState<boolean>(false);

  const { data: reviewComments, queryKey } = useGetReviewComments(review.id, open);
  const { mutate: create, isSuccess: isCreateSuccess } = useCreateReviewComment();

  const form = useForm<ReviewCommentPostRequest>({
    defaultValues: {
      content: '',
      reviewId: review.id,
    },
  });

  const editForm = useForm<ReviewCommentPostRequest>({
    defaultValues: {
      content: '',
      reviewId: review.id,
    },
  });

  const [commentId, setCommentId] = useState<string>('');
  const {
    mutate: updateById,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = useModifyReviewComment(commentId);

  const {
    mutate: deleteById,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteReviewComment();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onEdit = (id: string) => {
    setCommentId(id);
    setIsEditMode(true);
  };

  const onSubmit = (data: ReviewCommentPostRequest) => {
    create(data);
  };

  const onUpdateSubmit = (data: ReviewCommentPatchRequest) => {
    updateById(data);
  };

  useEffect(() => {
    if (!isCreateSuccess) return;
    form.reset();
  }, [isCreateSuccess]);

  useEffect(() => {
    if (!isUpdateError) return;
    if (updateError.response?.status === 400) {
      return alert('작성자만 수정 가능합니다.');
    }
  }, [isUpdateError]);

  useEffect(() => {
    if (!isUpdateSuccess) return;
    setIsEditMode(false);
    return alert('수정되었습니다.');
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (!isDeleteError) return;
    if (deleteError.response?.status === 400) {
      return alert('작성자만 삭제 가능합니다.');
    }
  }, [isDeleteError]);

  useEffect(() => {
    if (!isDeleteSuccess) return;
    return alert('삭제되었습니다.');
  }, [isDeleteSuccess]);

  return (
    <Fragment>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex flex-col py-4 first-of-type:border-t-2">
          <div className="flex items-center gap-3">
            <AvatarProfile
              size="md"
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
                <div className="mb-4 rounded-sm bg-slate-100 p-3" key={comment.id}>
                  <div className="flex items-center gap-3">
                    <AvatarProfile
                      size="sm"
                      src={comment.writer.profileImagePath}
                      fallback={comment.writer.nickname}
                    />
                    <div className="flex w-full justify-between gap-1">
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        {comment.writer.nickname} <div className="h-3 w-[1px] bg-gray-300" />
                        {dayjs(comment.modifiedDate).format('YYYY.MM.DD HH:mm:ss')}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span
                          className="cursor-pointer hover:text-gray-800 hover:underline"
                          onClick={() => onEdit(comment.id)}
                        >
                          수정
                        </span>
                        <div className="h-3 w-[1px] bg-gray-300" />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <span className="cursor-pointer hover:text-gray-800 hover:underline">
                              삭제
                            </span>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>작성한 답글을 삭제하시겠습니까?</AlertDialogTitle>
                              <AlertDialogDescription>
                                작성한 답글을 삭제 시 복구되지 않습니다.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => deleteById(comment.id)}
                              >
                                삭제
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                  {isEditMode && commentId === comment.id ? (
                    <Form {...editForm}>
                      <form onSubmit={editForm.handleSubmit(onUpdateSubmit)}>
                        <div className="space-y-2 rounded-md bg-slate-100 p-3">
                          <FormField
                            control={editForm.control}
                            name="content"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="답글을 작성해주세요. 😊"
                                      defaultValue={comment.content}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                          <div className="flex justify-end">
                            <Button size="sm" variant="default" type="submit">
                              수정
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <p className="text-sm leading-5 text-gray-800">{comment.content}</p>
                  )}
                </div>
              );
            })
          ) : (
            <span className="text-sm font-semibold text-gray-800">등록된 답글이 없습니다.</span>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Fragment>
  );
}
