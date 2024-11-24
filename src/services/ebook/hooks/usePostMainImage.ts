import { POST_main_image } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostMainImage = () => {
  return useMutation({
    mutationKey: [POST_main_image.name],
    mutationFn: POST_main_image,
  });
};
