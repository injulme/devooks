import { Pagination } from '@/lib/common';

export interface ReviewCommentSummary {
  id: string;
  content: string;
  reviewId: string;
  writer: {
    memberId: string;
    nickname: string;
    profileImagePath: string;
  };
  writtenDate: string;
  modifiedDate: string;
}

/** 리뷰 댓글 목록 조회 */
export interface ReviewCommentResponse extends Pagination {
  data: ReviewCommentSummary[];
}

/** 리뷰 댓글 작성 */
export interface ReviewCommentPostRequest {
  reviewId: string;
  content: string;
}

/** 리뷰 댓글 수정 */
export interface ReviewCommentPatchRequest {
  content: string;
}
