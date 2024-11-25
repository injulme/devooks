import { POST_ebooks } from '../api';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

export const usePostEbooks = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [POST_ebooks.name],
    mutationFn: POST_ebooks,
    onSuccess: (data) => {
      return router.push(`/book/${data.ebook.id}`);
    },
  });
};
