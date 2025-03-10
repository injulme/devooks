import { reviewAPI } from './api-instance';

import { ReviewApiCreateReviewRequest, ReviewApiModifyReviewRequest } from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 리뷰 목록 조회 */
export const useGetReviews = (ebookId: string) => {
  return useQuery({
    queryKey: [reviewAPI.getReviews.name, ebookId],
    queryFn: () => reviewAPI.getReviews({ ebookId, page: 1, count: 10 }),
    select: ({ data }) => data,
  });
};

/** 리뷰 등록 */
export const useCreateReview = () => {
  return useMutation({
    mutationKey: [reviewAPI.createReview.name],
    mutationFn: (data: ReviewApiCreateReviewRequest) => reviewAPI.createReview(data),
  });
};

/** 리뷰 수정 */
export const useModifyReview = (reviewId: string) => {
  return useMutation({
    mutationKey: [reviewAPI.modifyReview.name, reviewId],
    mutationFn: (data: ReviewApiModifyReviewRequest) => reviewAPI.modifyReview(data),
  });
};

/** 리뷰 삭제 */
export const useDeleteReview = () => {
  return useMutation({
    mutationKey: [reviewAPI.deleteReview.name],
    mutationFn: (reviewId: string) => reviewAPI.deleteReview({ reviewId }),
  });
};
