import { Pagination } from '@/lib/common';

export interface ReviewSummary {
  id: string;
  rating: number;
  content: string;
  ebookId: string;
  writer: {
    memberId: string;
    nickname: string;
    profileImagePath: string;
  };
  writtenDate: string;
  modifiedDate: string;
}

/** 리뷰 목록 조회 */
export interface ReviewsResponse extends Pagination {
  data: ReviewSummary[];
}

/** 리뷰 작성 */
export interface ReviewPostRequest {
  ebookId: string;
  rating: number;
  content: string;
}

/** 리뷰 수정 */
export interface ReviewPatchRequest {
  rating: number;
  content: string;
}
