import { DELETE_review_by_id } from '../api';

import { useMutation } from '@tanstack/react-query';

export const useDeleteReviewById = () => {
  return useMutation({
    mutationKey: [DELETE_review_by_id.name],
    mutationFn: DELETE_review_by_id,
  });
};
