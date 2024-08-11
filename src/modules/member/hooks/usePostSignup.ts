import { postSignup } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostSignup = () => {
  return useMutation({
    mutationKey: [postSignup.name],
    mutationFn: postSignup,
  });
};
