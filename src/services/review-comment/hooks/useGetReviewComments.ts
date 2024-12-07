import { GET_review_comments } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetReviewComments = (reviewId: string | null, open: boolean) => {
  console.log('open ', !!reviewId && open);
  return useQuery({
    queryKey: [GET_review_comments.name, reviewId, open],
    queryFn: () => GET_review_comments(reviewId),
    select: (data) => data,
    enabled: !!reviewId && open,
  });
};
