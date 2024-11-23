import { POST_description_images } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostDescriptionImages = () => {
  return useMutation({
    mutationKey: [POST_description_images.name],
    mutationFn: POST_description_images,
  });
};
