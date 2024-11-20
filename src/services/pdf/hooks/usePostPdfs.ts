import { POST_pdfs } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostPdfs = () => {
  return useMutation({
    mutationKey: [POST_pdfs.name],
    mutationFn: POST_pdfs,
  });
};
