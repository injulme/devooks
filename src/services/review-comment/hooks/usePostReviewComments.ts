import { POST_review_comments } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostReviewComments = () => {
  return useMutation({
    mutationKey: [POST_review_comments.name],
    mutationFn: POST_review_comments,
  });
};
