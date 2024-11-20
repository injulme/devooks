import { EbookListGetResponse } from './type';

import api from '@/lib/api';

export async function getEbooks(): Promise<EbookListGetResponse> {
  const { data } = await api.get(`/api/v1/ebooks?page=1&count=1`);
  return data;
}
