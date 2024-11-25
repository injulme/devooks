import { EbookListGetSummary } from '../ebook/type';

import { Pagination } from '@/lib/common';

/** 찜 목록 조회 */
export interface WishlistGetResponse extends Pagination {
  data: EbookListGetSummary[];
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
