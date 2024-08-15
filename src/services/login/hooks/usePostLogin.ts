import { postLogin } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostLogin = () => {
  return useMutation({
    mutationKey: [postLogin.name],
    mutationFn: postLogin,
  });
};
