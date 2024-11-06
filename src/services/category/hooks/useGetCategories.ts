import { GET_categories } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery({
    queryKey: [GET_categories.name],
    queryFn: GET_categories,
    select: (data) => {
      return data.categories.map((category) => ({ label: category.name, value: category.id }));
    },
  });
};
