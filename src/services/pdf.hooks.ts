import { pdfAPI } from './api-instance';

import { PdfApiUploadPdfRequest } from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** PDF 파일 업로드 */
export const useUploadPdf = () => {
  return useMutation({
    mutationKey: [pdfAPI.uploadPdf.name],
    mutationFn: (data: PdfApiUploadPdfRequest) => pdfAPI.uploadPdf(data),
  });
};

/** 미리보기 사진 목록 조회 */
export const useGetPreviewImages = (pdfId: string) => {
  return useQuery({
    queryKey: [pdfAPI.getPreviewImageList.name, pdfId],
    queryFn: () => pdfAPI.getPreviewImageList({ pdfId }),
    select: ({ data }) => data,
    enabled: !!pdfId,
  });
};
