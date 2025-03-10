import { ebookImageAPI } from './api-instance';

import {
  EbookImageApiSaveDescriptionImagesRequest,
  EbookImageApiSaveMainImageRequest,
} from '@leesm0518/devooks-api';
import { useMutation } from '@tanstack/react-query';

// 전자책 대표 이미지 저장
export const useSaveMainImage = () => {
  return useMutation({
    mutationKey: [ebookImageAPI.saveMainImage.name],
    mutationFn: (data: EbookImageApiSaveMainImageRequest) => ebookImageAPI.saveMainImage(data),
  });
};

// 전자책 설명 이미지 저장
export const useSaveDescriptionImages = () => {
  return useMutation({
    mutationKey: [ebookImageAPI.saveDescriptionImages.name],
    mutationFn: (data: EbookImageApiSaveDescriptionImagesRequest) =>
      ebookImageAPI.saveDescriptionImages(data),
  });
};
