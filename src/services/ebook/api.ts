import {
  EbookDescriptionImagesRequest,
  EbookDescriptionImagesResponse,
  EbookListGetResponse,
  EbookMainImageRequest,
  EbookMainImageResponse,
} from './type';

import api from '@/lib/api';

export async function getEbooks(): Promise<EbookListGetResponse> {
  const { data } = await api.get(`/api/v1/ebooks?page=1&count=1`);
  return data;
}

export async function POST_main_image(
  imageData: EbookMainImageRequest,
): Promise<EbookMainImageResponse> {
  const { data } = await api.post(`/api/v1/ebooks/main-image`, imageData);
  return data;
}

export async function POST_description_images(
  imageData: EbookDescriptionImagesRequest,
): Promise<EbookDescriptionImagesResponse> {
  const { data } = await api.post(`/api/v1/ebooks/description-images`, imageData);
  return data;
}
