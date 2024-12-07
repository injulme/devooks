'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';

export default function AvatarProfile({
  size = 32,
  src,
  fallback,
  className,
  ...props
}: {
  size: number;
  src?: string;
  fallback?: string | null;
  className?: string;
}) {
  return (
    <Avatar className={cn(`h-[${size}px] w-[${size}px]`, className)} {...props}>
      <AvatarImage src={src} className="object-cover" alt={`${fallback}님의 프로필`} />
      <AvatarFallback className={cn(size > 24 ? 'text-base' : 'text-sm')}>
        {fallback?.substring(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
}
