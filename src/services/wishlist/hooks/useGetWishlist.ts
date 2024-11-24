import { GET_wishlist } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetWishlist = () => {
  return useQuery({
    queryKey: [GET_wishlist.name],
    queryFn: GET_wishlist,
    select: (data) => data,
  });
};
