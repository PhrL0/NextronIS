import React from 'react';
import { cn } from '@/lib/utils';

export type DividerProps = {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: string | number;
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  plain?: boolean;
  style?: React.CSSProperties;
};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      type = 'horizontal',
      orientation = 'center',
      orientationMargin,
      className,
      children,
      dashed = false,
      plain = false,
      style,
      ...props
    },
    ref
  ) => {
    const orientationCls = {
      left: 'justify-start',
      right: 'justify-end',
      center: 'justify-center'
    };

    const hasChildren = !!children;
    const hasCustomMargin = orientationMargin !== undefined;

    const marginStyle: React.CSSProperties = {};
    if (hasCustomMargin && hasChildren) {
      const marginValue = typeof orientationMargin === 'string' ? orientationMargin : `${orientationMargin}px`;

      if (orientation === 'left') {
        marginStyle.marginLeft = marginValue;
      } else if (orientation === 'right') {
        marginStyle.marginRight = marginValue;
      }
    }

    return type === 'horizontal' ? (
      <div
        ref={ref}
        className={cn(
          'relative my-4 flex items-center',
          hasChildren ? 'border-0' : 'border-t',
          dashed ? 'border-dashed' : 'border-solid',
          'border-border',
          className
        )}
        style={{ ...style, ...marginStyle }}
        {...props}
      >
        {hasChildren && (
          <>
            <div className={cn('flex-grow border-t', dashed ? 'border-dashed' : 'border-solid', 'border-border')} />
            <div
              className={cn(
                'flex px-4',
                orientationCls[orientation],
                plain ? 'text-muted-foreground text-sm' : 'font-medium'
              )}
            >
              {children}
            </div>
            <div className={cn('flex-grow border-t', dashed ? 'border-dashed' : 'border-solid', 'border-border')} />
          </>
        )}
      </div>
    ) : (
      <div
        ref={ref}
        className={cn(
          'relative mx-4 inline-block h-full self-stretch border-l',
          dashed ? 'border-dashed' : 'border-solid',
          'border-border',
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
