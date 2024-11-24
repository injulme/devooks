import { Pagination } from '@/lib/common';

export interface WishlistSummary {
  id: string;
  memberId: string;
  ebookId: string;
}

/** 찜 목록 조회 */
export interface WishlistGetResponse extends Pagination {
  data: WishlistSummary[];
}

/** 찜 등록 */
export interface WishlistPostRequest {
  ebookId: string;
}

export interface WishlistPostResponse {
  wishlistId: string;
  memberId: string;
  ebookId: string;
  createdDate: string;
}
