'use client';

import { MouseEvent, useEffect, useState } from 'react';

import { useCreateWishlist, useDeleteWishlist } from '@/services/wishlist.hooks';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

/** relative에 영향을 받음, group hover에 영향을 받음 */
export default function WishlistButton({
  wishlistId,
  disabled,
  ebookId,
  className,
}: {
  wishlistId?: string | null;
  disabled?: boolean;
  ebookId?: string;
  className?: string;
}) {
  const [_wishlistId, setWishlistId] = useState<string | null | undefined>(wishlistId);
  const {
    mutate: postWishlist,
    data: responsePostWishlist,
    isSuccess: isWishlistSuccess,
  } = useCreateWishlist();

  const { mutate: deleteWishlist, isSuccess: isWishlistDeleteSuccess } = useDeleteWishlist();
  const onHandleWishlist = (event: MouseEvent<HTMLButtonElement>, flag: boolean) => {
    event.stopPropagation();
    event.preventDefault();
    if (!ebookId) return;

    // TODO: 400 error면 로그인 모달 띄우기
    if (flag) {
      if (!_wishlistId) return;
      deleteWishlist(_wishlistId);
    } else {
      postWishlist({ createWishlistRequest: { ebookId } });
    }
  };

  useEffect(() => {
    if (!isWishlistSuccess) return;
    setWishlistId(responsePostWishlist?.data.wishlistId);
  }, [responsePostWishlist, isWishlistSuccess]);

  useEffect(() => {
    if (!isWishlistDeleteSuccess) return;
    setWishlistId(null);
  }, [isWishlistDeleteSuccess]);

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        'absolute right-3 top-2 z-10 rounded-full bg-white/30 p-3 transition-all hover:bg-white/70',
        className,
      )}
      disabled={disabled || !ebookId}
      onClick={(e) => onHandleWishlist(e, !!_wishlistId)}
    >
      {!!_wishlistId ? (
        <Heart size={20} className="fill-red-500 stroke-red-500" />
      ) : (
        <Heart size={20} />
      )}
    </Button>
  );
}
