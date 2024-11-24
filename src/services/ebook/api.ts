import {
  EbookDescriptionImagesRequest,
  EbookDescriptionImagesResponse,
  EbookGetResponse,
  EbookListGetResponse,
  EbookMainImageRequest,
  EbookMainImageResponse,
  EbookPatchRequest,
  EbookPostRequest,
} from './type';

import api from '@/lib/api';

/** 전자책 목록 조회 */
export async function GET_ebooks(): Promise<EbookListGetResponse> {
  const { data } = await api.get(`/api/v1/ebooks?page=1&count=1`);
  return data;
}

/** 전자책 등록 */
export async function POST_ebooks(params: EbookPostRequest): Promise<void> {
  const { data } = await api.post(`/api/v1/ebooks`, params);
  return data;
}

/** 전자책 상세 조회 */
export async function GET_ebooks_by_id(ebookId: string | null): Promise<EbookGetResponse> {
  const { data } = await api.get(`/api/v1/ebooks/${ebookId}`);
  return data;
}

/** 전자책 삭제 */
export async function DELETE_ebooks_by_id(ebookId: string | null): Promise<void> {
  const { data } = await api.delete(`/api/v1/ebooks/${ebookId}`);
  return data;
}

/** 전자책 수정 */
export async function PATCH_ebooks_by_id(
  ebookId: string | null,
  params: EbookPatchRequest,
): Promise<void> {
  const { data } = await api.patch(`/api/v1/ebooks/${ebookId}`, params);
  return data;
}

/** 전자책 메인 사진 저장 */
export async function POST_main_image(
  imageData: EbookMainImageRequest,
): Promise<EbookMainImageResponse> {
  const { data } = await api.post(`/api/v1/ebooks/main-image`, imageData);
  return data;
}

/** 전자책 설명 사진 저장 */
export async function POST_description_images(
  imageData: EbookDescriptionImagesRequest,
): Promise<EbookDescriptionImagesResponse> {
  const { data } = await api.post(`/api/v1/ebooks/description-images`, imageData);
  return data;
}
