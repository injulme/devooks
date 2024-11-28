import { GET_review_comments } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetReviewComments = () => {
  return useQuery({
    queryKey: [GET_review_comments.name],
    queryFn: GET_review_comments,
    select: (data) => data,
  });
};
