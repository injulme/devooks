import { ReviewPatchRequest, ReviewPostRequest, ReviewsResponse } from './type';

import api from '@/lib/api';

/** 리뷰 목록 조회 */
export async function GET_reviews(ebookId: string | null): Promise<ReviewsResponse> {
  const { data } = await api.get(`/api/v1/reviews?ebookId=${ebookId}&page=1&count=1`);
  return data;
}

/** 리뷰 작성 */
export async function POST_reviews(params: ReviewPostRequest): Promise<void> {
  const { data } = await api.post(`/api/v1/reviews`, params);
  return data;
}

/** 리뷰 삭제 */
export async function DELETE_review_by_id(reviewId: string | null): Promise<void> {
  const { data } = await api.delete(`/api/v1/reviews/${reviewId}`);
  return data;
}

/** 리뷰 수정 */
export async function PATCH_review_by_id(
  reviewId: string | null,
  params: ReviewPatchRequest,
): Promise<void> {
  const { data } = await api.patch(`/api/v1/reviews/${reviewId}`, params);
  return data;
}
