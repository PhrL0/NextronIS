'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const avatarVariants = cva('inline-flex items-center justify-center overflow-hidden rounded-full', {
  variants: {
    size: {
      small: 'h-8 w-8 text-xs',
      default: 'h-10 w-10 text-sm',
      large: 'h-12 w-12 text-base',
      xlarge: 'h-16 w-16 text-lg'
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md'
    }
  },
  defaultVariants: {
    size: 'default',
    shape: 'circle'
  }
});

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, src, alt, icon, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    const handleError = () => {
      setError(true);
    };

    return (
      <div ref={ref} className={cn(avatarVariants({ size, shape }), className)} {...props}>
        {!error && src ? (
          <img
            src={src || '/placeholder.svg'}
            alt={alt || 'avatar'}
            className="h-full w-full object-cover"
            onError={handleError}
          />
        ) : icon ? (
          icon
        ) : (
          <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
            {alt ? alt.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
