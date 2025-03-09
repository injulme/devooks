import { GET_wishlist } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetWishlist = (page: number, count: number) => {
  return useQuery({
    queryKey: [GET_wishlist.name, page, count],
    queryFn: () => GET_wishlist(page, count),
    select: (data) => data,
  });
};
