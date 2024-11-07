import { CategoryListResponse } from './type';

import api from '@/lib/api';

export async function GET_categories(): Promise<CategoryListResponse> {
  const { data } = await api.get(`/api/v1/categories`);

  return data;
}
