import { WishlistGetResponse, WishlistPostRequest, WishlistPostResponse } from './type';

import api from '@/lib/api';

/** 찜 목록 조회 */
export async function GET_wishlist(page: number, count: number): Promise<WishlistGetResponse> {
  const { data } = await api.get(`/api/v1/wishlist?page=${page}&count=${count}`);
  return data;
}

/** 찜 등록 */
export async function POST_wishlist(params: WishlistPostRequest): Promise<WishlistPostResponse> {
  const { data } = await api.post(`/api/v1/wishlist`, params);
  return data;
}

/** 찜 삭제 */
export async function DELETE_wishlist_by_id(wishlistId: string | null): Promise<void> {
  const { data } = await api.delete(`/api/v1/wishlist/${wishlistId}`);
  return data;
}
