import { POST_ebooks } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostEbooks = () => {
  return useMutation({
    mutationKey: [POST_ebooks.name],
    mutationFn: POST_ebooks,
  });
};
