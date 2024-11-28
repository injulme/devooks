import { PdfUploadResponse, PreviewImageListResponse } from './type';

import { AxiosProgressEvent } from 'axios';

import api from '@/lib/api';

export async function GET_pdfs_preview_by_id(pdfId?: string): Promise<PreviewImageListResponse> {
  const { data } = await api.get(`/api/v1/pdfs/${pdfId}/preview`);
  return data;
}

export async function POST_pdfs(pdfData: File, config: any): Promise<PdfUploadResponse> {
  const formData = new FormData();
  formData.append('pdf', pdfData);

  const { data } = await api.post(`/api/v1/pdfs`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
  return data;
}
