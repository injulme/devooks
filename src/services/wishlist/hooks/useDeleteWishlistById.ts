import { DELETE_wishlist_by_id } from '../api';

import { useMutation } from '@tanstack/react-query';

export const useDeleteWishlistById = () => {
  return useMutation({
    mutationKey: [DELETE_wishlist_by_id.name],
    mutationFn: DELETE_wishlist_by_id,
  });
};
