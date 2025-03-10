import { reviewCommentAPI } from './api-instance';

import {
  ReviewCommentApiCreateReviewCommentRequest,
  ReviewCommentApiModifyReviewCommentRequest,
} from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 리뷰 댓글 목록 조회 */
export const useGetReviewComments = (reviewId: string) => {
  return useQuery({
    queryKey: [reviewCommentAPI.getReviewComments.name, reviewId],
    queryFn: () => reviewCommentAPI.getReviewComments({ reviewId, page: 1, count: 10 }),
    select: ({ data }) => data,
  });
};

/** 리뷰 댓글 등록 */
export const useCreateReviewComment = () => {
  return useMutation({
    mutationKey: [reviewCommentAPI.createReviewComment.name],
    mutationFn: (data: ReviewCommentApiCreateReviewCommentRequest) =>
      reviewCommentAPI.createReviewComment(data),
  });
};

/** 리뷰 댓글 수정 */
export const useModifyReviewComment = (commantId: string) => {
  return useMutation({
    mutationKey: [reviewCommentAPI.modifyReviewComment.name, commantId],
    mutationFn: (data: ReviewCommentApiModifyReviewCommentRequest) =>
      reviewCommentAPI.modifyReviewComment(data),
  });
};

/** 리뷰 댓글 삭제 */
export const useDeleteReviewComment = () => {
  return useMutation({
    mutationKey: [reviewCommentAPI.deleteReviewComment.name],
    mutationFn: (commentId: string) => reviewCommentAPI.deleteReviewComment({ commentId }),
  });
};
