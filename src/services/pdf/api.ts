import { PdfUploadResponse, PreviewImageListResponse } from './type';

import api from '@/lib/api';

export async function GET_pdfs_preview_by_id(pdfId: string): Promise<PreviewImageListResponse> {
  const { data } = await api.get(`/api/v1/pdfs/${pdfId}/preview`);
  return data;
}

// TODO: multipart/form-data로 변경
export async function POST_pdfs(pdfData: string): Promise<PdfUploadResponse> {
  const { data } = await api.post(`/api/v1/pdfs`, pdfData);
  return data;
}
