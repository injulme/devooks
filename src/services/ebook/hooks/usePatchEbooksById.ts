import { PATCH_ebooks_by_id } from '../api';
import { EbookPatchRequest } from '../type';

import { useMutation } from '@tanstack/react-query';

export const usePatchEbooksById = (ebookId: string | null) => {
  return useMutation({
    mutationKey: [PATCH_ebooks_by_id.name, ebookId],
    mutationFn: (data: EbookPatchRequest) => PATCH_ebooks_by_id(ebookId, data),
  });
};
