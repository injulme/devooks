import { PATCH_review_by_id } from '../api';
import { ReviewPatchRequest } from '../type';

import { useMutation } from '@tanstack/react-query';

export const usePatchReviewById = (reviewId: string | null) => {
  return useMutation({
    mutationKey: [PATCH_review_by_id.name, reviewId],
    mutationFn: (data: ReviewPatchRequest) => PATCH_review_by_id(reviewId, data),
  });
};
