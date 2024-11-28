import { POST_reviews } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostReviews = () => {
  return useMutation({
    mutationKey: [POST_reviews.name],
    mutationFn: POST_reviews,
  });
};
