import { GET_review_comments } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetReviewComments = (reviewId: string | null, open: boolean) => {
  const queryKey = [GET_review_comments.name, reviewId, open];
  const response = useQuery({
    queryKey: queryKey,
    queryFn: () => GET_review_comments(reviewId),
    select: (data) => data,
    enabled: !!reviewId && open,
  });
  return { ...response, queryKey };
};
