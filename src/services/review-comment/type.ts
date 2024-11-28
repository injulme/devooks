import { Pagination } from '@/lib/common';

export interface ReviewCommentSummary {}

/** 리뷰 댓글 목록 조회 */
export interface ReviewCommentResponse extends Pagination {
  data: ReviewCommentSummary[];
}

/** 리뷰 댓글 작성 */
export interface ReviewCommentPostRequest {
  ebookId: string;
  rating: number;
  content: string;
}

/** 리뷰 댓글 수정 */
export interface ReviewCommentPatchRequest {
  rating: number;
  content: string;
}
