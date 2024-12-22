import { DELETE_review_comments_by_id } from '../api';

import { useMutation } from '@tanstack/react-query';

import { ApiError } from '@/lib/api-error';

export const useDeleteReviewCommentsById = () => {
  return useMutation<void, ApiError, string | null>({
    mutationKey: [DELETE_review_comments_by_id.name],
    mutationFn: DELETE_review_comments_by_id,
  });
};
