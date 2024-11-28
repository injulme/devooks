import { GET_reviews } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetReviews = (ebookId: string | null) => {
  return useQuery({
    queryKey: [GET_reviews.name, ebookId],
    queryFn: () => GET_reviews(ebookId),
    select: (data) => data,
    enabled: !!ebookId,
  });
};
