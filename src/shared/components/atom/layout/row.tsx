'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';

export type RowProps = {
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  gutter?:
    | number
    | [number, number]
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      };
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const alignMap = {
  top: 'items-start',
  middle: 'items-center',
  bottom: 'items-end',
  stretch: 'items-stretch'
};

const justifyMap = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  'space-around': 'justify-around',
  'space-between': 'justify-between'
};

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ align = 'top', justify = 'start', gutter = 0, wrap = true, className, style, children, ...props }, ref) => {
    // Calculate gutters
    let horizontalGutter = 0;
    let verticalGutter = 0;

    if (typeof gutter === 'number') {
      horizontalGutter = gutter;
      verticalGutter = gutter;
    } else if (Array.isArray(gutter)) {
      horizontalGutter = gutter[0] || 0;
      verticalGutter = gutter[1] || 0;
    }

    // Create style with negative margins to compensate for Col padding
    const rowStyle: React.CSSProperties = {
      ...style,
      marginLeft: horizontalGutter > 0 ? -horizontalGutter / 2 : undefined,
      marginRight: horizontalGutter > 0 ? -horizontalGutter / 2 : undefined,
      rowGap: verticalGutter > 0 ? verticalGutter : undefined
    };

    // Clone children to pass gutter information
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          gutter: [horizontalGutter, verticalGutter]
        });
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full',
          wrap ? 'flex-wrap' : 'flex-nowrap',
          alignMap[align],
          justifyMap[justify],
          className
        )}
        style={rowStyle}
        {...props}
      >
        {childrenWithProps}
      </div>
    );
  }
);

Row.displayName = 'Row';

export default Row;
