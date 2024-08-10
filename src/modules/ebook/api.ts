import { EbookListGetResponse } from './type';

import api from '@/lib/api';

export async function getEbooks(): Promise<EbookListGetResponse> {
  return await api({
    method: 'get',
    url: `/api/v1/ebooks?page=1&count=1`,
  });
}
