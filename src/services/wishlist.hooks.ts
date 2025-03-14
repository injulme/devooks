import { wishlistAPI } from './api-instance';

import { WishlistApiCreateWishlistRequest } from '@leesm0518/devooks-api';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 찜 목록 조회 */
export const useGetWishlist = ({ page, count }: { page: number; count: number }) => {
  return useQuery({
    queryKey: [wishlistAPI.getWishlist.name, page, count],
    queryFn: () => wishlistAPI.getWishlist({ page, count }),
    select: ({ data }) => data,
  });
};

/** 찜 등록 */
export const useCreateWishlist = () => {
  return useMutation({
    mutationKey: [wishlistAPI.createWishlist.name],
    mutationFn: (data: WishlistApiCreateWishlistRequest) => wishlistAPI.createWishlist(data),
  });
};

/** 찜 취소 */
export const useDeleteWishlist = () => {
  return useMutation({
    mutationKey: [wishlistAPI.deleteWishlist.name],
    mutationFn: (wishlistId: string) => wishlistAPI.deleteWishlist({ wishlistId }),
  });
};
