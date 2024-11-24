'use client';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';

/** relative에 영향을 받음, group hover에 영향을 받음 */
export default function WishlistButton({
  wishlistId,
  disabled,
}: {
  wishlistId?: string | null;
  disabled?: boolean;
}) {
  // TODO: handler 추가
  return (
    <Button
      type="button"
      variant="ghost"
      className="absolute right-3 top-2 rounded-full bg-white/30 p-3 shadow-sm transition-all group-hover:bg-white/50"
      disabled={disabled}
      onClick={() => {}}
    >
      {wishlistId ? (
        <Heart size={20} className="fill-red-500 stroke-red-500" />
      ) : (
        <Heart size={20} />
      )}
    </Button>
  );
}
