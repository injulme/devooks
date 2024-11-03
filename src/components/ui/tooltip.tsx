'use client';

import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-popover text-popover-foreground',
        success: 'bg-teal-500 text-muted border-teal-500',
        info: 'bg-cyan-500 text-muted border-cyan-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
const tooltipArrowVariants = cva('', {
  variants: {
    fill: {
      default: 'fill-border',
      success: 'fill-teal-500',
      info: 'fill-cyan-500',
    },
  },
  defaultVariants: {
    fill: 'default',
  },
});

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ variant, className }), className)}
    {...props}
  >
    {props.children}
    <TooltipPrimitive.Arrow className={tooltipArrowVariants({ fill: variant })} />
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
