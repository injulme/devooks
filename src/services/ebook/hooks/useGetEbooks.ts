import { GET_ebooks } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetEbooks = () => {
  return useQuery({
    queryKey: [GET_ebooks.name],
    queryFn: GET_ebooks,
    select: (data) => data,
  });
};
