import { categoryAPI } from './api-instance';

import { useQuery } from '@tanstack/react-query';

/** 카테고리 목록 조회 */
export const useGetCategories = () => {
  return useQuery({
    queryKey: [categoryAPI.getCategories.name],
    queryFn: () => categoryAPI.getCategories(),
    select: ({ data }) => {
      return data.categories.map((category) => ({ label: category.name, value: category.id }));
    },
  });
};
