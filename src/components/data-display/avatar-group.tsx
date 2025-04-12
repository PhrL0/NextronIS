import React from 'react';
import { cn } from '@/lib/utils';
import Avatar, { type AvatarProps } from './avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  maxCount?: number;
  maxPopoverPlacement?: 'top' | 'bottom';
  maxStyle?: React.CSSProperties;
  size?: AvatarProps['size'];
  shape?: AvatarProps['shape'];
  children?: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, maxCount = 5, maxPopoverPlacement = 'top', maxStyle, size, shape, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const numChildren = childrenArray.length;
    const displayCount = maxCount > 0 ? Math.min(maxCount, numChildren) : numChildren;
    const restCount = numChildren - displayCount;

    const displayChildren = childrenArray.slice(0, displayCount);

    // Apply size and shape to all Avatar children
    const clonedChildren = displayChildren.map((child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          size,
          shape,
          className: cn('border-2 border-background -ml-2', index === 0 && 'ml-0', child.props.className),
          key: `avatar-${index}`
        });
      }
      return child;
    });

    return (
      <div ref={ref} className={cn('flex items-center', className)} {...props}>
        {clonedChildren}
        {restCount > 0 && (
          <Avatar size={size} shape={shape} className="border-background -ml-2 border-2" style={maxStyle}>
            <span>+{restCount}</span>
          </Avatar>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
