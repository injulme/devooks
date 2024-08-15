import { getEbooks } from '../api';
import { EbookListGetResponse } from '../type';

import { useQuery } from '@tanstack/react-query';

import { ApiError } from '@/lib/api-error';

export const useGetEbooks = () => {
  return useQuery({
    queryKey: [getEbooks.name],
    queryFn: getEbooks,
    select: (data) => data,
  });
};
