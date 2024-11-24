import { POST_wishlist } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostWishlist = () => {
  return useMutation({
    mutationKey: [POST_wishlist.name],
    mutationFn: POST_wishlist,
  });
};
