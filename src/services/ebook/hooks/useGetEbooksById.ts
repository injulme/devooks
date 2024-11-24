import { GET_ebooks_by_id } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetEbooksById = (ebookId: string | null) => {
  return useQuery({
    queryKey: [GET_ebooks_by_id.name, ebookId],
    queryFn: () => GET_ebooks_by_id(ebookId),
    select: (data) => data,
  });
};
