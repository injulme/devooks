'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';

const avatarProfileVariants = cva('', {
  variants: {
    size: {
      xs: 'h-4 w-4' /* 1rem | 16px */,
      sm: 'h-6 w-6' /* 1.5rem | 24px */,
      md: 'h-8 w-8' /* 2rem | 32px */,
      lg: 'h-16 w-16' /* 4rem | 64px */,
      xl: 'h-28 w-28' /* 7rem | 112px */,
      '2xl': 'h-44 w-44' /* 11rem | 176px */,
    },
    defaultVariants: {
      size: 'md',
    },
  },
});

interface AvatarProfileProps extends VariantProps<typeof avatarProfileVariants> {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  src?: string;
  fallback?: string | null;
  className?: string;
}

export default function AvatarProfile({
  size,
  src,
  fallback,
  className,
  ...props
}: AvatarProfileProps) {
  return (
    <Avatar className={cn(avatarProfileVariants({ size }), className)} {...props}>
      <AvatarImage src={src} className="object-cover" alt={`${fallback}님의 프로필`} />
      <AvatarFallback className={cn(size && size > 'sm' ? 'text-base' : 'text-sm')}>
        {fallback?.substring(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
}
