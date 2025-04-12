'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const tagVariants = cva('inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset', {
  variants: {
    variant: {
      default: 'bg-secondary text-secondary-foreground ring-secondary',
      primary: 'bg-primary/10 text-primary ring-primary/20',
      success: 'bg-green-50 text-green-700 ring-green-600/20',
      warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
      danger: 'bg-red-50 text-red-700 ring-red-600/20',
      info: 'bg-blue-50 text-blue-700 ring-blue-600/20'
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
      lg: 'text-base'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  closable?: boolean;
  icon?: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, closable, icon, onClose, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(tagVariants({ variant, size }), className)} {...props}>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {closable && (
          <button
            type="button"
            className="hover:bg-muted/50 ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
