import { ReviewCommentPatchRequest, ReviewCommentPostRequest, ReviewCommentResponse } from './type';

import api from '@/lib/api';

/** 리뷰 댓글 목록 조회 */
export async function GET_review_comments(): Promise<ReviewCommentResponse> {
  const { data } = await api.get(`/api/v1/reviews-comments?page=1&count=1`);
  return data;
}

/** 리뷰 댓글 작성 */
export async function POST_review_comments(params: ReviewCommentPostRequest): Promise<void> {
  const { data } = await api.post(`/api/v1/reviews-comments`, params);
  return data;
}

/** 리뷰 댓글 삭제 */
export async function DELETE_review_comments_by_id(commentId: string | null): Promise<void> {
  const { data } = await api.delete(`/api/v1/review-comments/${commentId}`);
  return data;
}

/** 리뷰 댓글 수정 */
export async function PATCH_review_comments_by_id(
  commentId: string | null,
  params: ReviewCommentPatchRequest,
): Promise<void> {
  const { data } = await api.patch(`/api/v1/reviews-comments/${commentId}`, params);
  return data;
}
