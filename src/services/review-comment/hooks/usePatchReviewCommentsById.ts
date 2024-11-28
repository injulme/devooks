import { PATCH_review_comments_by_id } from '../api';
import { ReviewCommentPatchRequest } from '../type';

import { useMutation } from '@tanstack/react-query';

export const usePatchReviewCommentsById = (commentId: string | null) => {
  return useMutation({
    mutationKey: [PATCH_review_comments_by_id.name, commentId],
    mutationFn: (data: ReviewCommentPatchRequest) => PATCH_review_comments_by_id(commentId, data),
  });
};
