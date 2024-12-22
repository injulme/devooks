import { PATCH_review_comments_by_id } from '../api';
import { ReviewCommentPatchRequest } from '../type';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiError } from '@/lib/api-error';

export const usePatchReviewCommentsById = (
  commentId: string | null,
  queryKey: (string | boolean | null)[],
) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, ReviewCommentPatchRequest>({
    mutationKey: [PATCH_review_comments_by_id.name, commentId],
    mutationFn: (data: ReviewCommentPatchRequest) => PATCH_review_comments_by_id(commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};
