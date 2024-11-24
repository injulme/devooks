import { POST_signup } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostSignup = () => {
  return useMutation({
    mutationKey: [POST_signup.name],
    mutationFn: POST_signup,
  });
};
