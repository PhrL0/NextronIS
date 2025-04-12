import { cn } from '@/lib/utils';
import React from 'react';

export type ColProps = {
  span?: number;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
  xs?:
    | number
    | {
        span?: number;
        offset?: number;
        order?: number;
        pull?: number;
        push?: number;
      };
  sm?:
    | number
    | {
        span?: number;
        offset?: number;
        order?: number;
        pull?: number;
        push?: number;
      };
  md?:
    | number
    | {
        span?: number;
        offset?: number;
        order?: number;
        pull?: number;
        push?: number;
      };
  lg?:
    | number
    | {
        span?: number;
        offset?: number;
        order?: number;
        pull?: number;
        push?: number;
      };
  xl?:
    | number
    | {
        span?: number;
        offset?: number;
        order?: number;
        pull?: number;
        push?: number;
      };
  xxl?:
    | number
    | {
        span?: number;
        offset?: number;
        order?: number;
        pull?: number;
        push?: number;
      };
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  gutter?: number | [number, number];
};

export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  ({ span, offset, order, pull, push, xs, sm, md, lg, xl, xxl, className, style, children, gutter, ...props }, ref) => {
    const colStyle: React.CSSProperties = { ...style };

    // Handle gutter
    if (gutter) {
      let horizontalGutter = 0;
      let verticalGutter = 0;

      if (typeof gutter === 'number') {
        horizontalGutter = gutter / 2;
      } else if (Array.isArray(gutter)) {
        horizontalGutter = gutter[0] / 2;
        verticalGutter = gutter[1] / 2;
      }

      if (horizontalGutter > 0) {
        colStyle.paddingLeft = horizontalGutter;
        colStyle.paddingRight = horizontalGutter;
      }

      if (verticalGutter > 0) {
        colStyle.paddingTop = verticalGutter;
        colStyle.paddingBottom = verticalGutter;
      }
    }

    // Generate responsive classes
    const classes = [];

    // Base span
    if (span) {
      // Use percentage-based width for more precise grid
      classes.push(`w-[${(span / 24) * 100}%]`);
    } else {
      // Default to full width if no span is provided
      classes.push('w-full');
    }

    // Offset
    if (offset) {
      classes.push(`ml-[${(offset / 24) * 100}%]`);
    }

    // Order
    if (order) {
      classes.push(`order-${order}`);
    }

    // Pull and Push (using relative positioning)
    if (pull) {
      colStyle.position = 'relative';
      colStyle.right = `${(pull / 24) * 100}%`;
    }

    if (push) {
      colStyle.position = 'relative';
      colStyle.left = `${(push / 24) * 100}%`;
    }

    // Responsive classes
    if (typeof xs === 'number') {
      classes.push(`xs:w-[${(xs / 24) * 100}%]`);
    } else if (xs && typeof xs === 'object') {
      if (xs.span) classes.push(`xs:w-[${(xs.span / 24) * 100}%]`);
      if (xs.offset) classes.push(`xs:ml-[${(xs.offset / 24) * 100}%]`);
      if (xs.order) classes.push(`xs:order-${xs.order}`);
    }

    if (typeof sm === 'number') {
      classes.push(`sm:w-[${(sm / 24) * 100}%]`);
    } else if (sm && typeof sm === 'object') {
      if (sm.span) classes.push(`sm:w-[${(sm.span / 24) * 100}%]`);
      if (sm.offset) classes.push(`sm:ml-[${(sm.offset / 24) * 100}%]`);
      if (sm.order) classes.push(`sm:order-${sm.order}`);
    }

    if (typeof md === 'number') {
      classes.push(`md:w-[${(md / 24) * 100}%]`);
    } else if (md && typeof md === 'object') {
      if (md.span) classes.push(`md:w-[${(md.span / 24) * 100}%]`);
      if (md.offset) classes.push(`md:ml-[${(md.offset / 24) * 100}%]`);
      if (md.order) classes.push(`md:order-${md.order}`);
    }

    if (typeof lg === 'number') {
      classes.push(`lg:w-[${(lg / 24) * 100}%]`);
    } else if (lg && typeof lg === 'object') {
      if (lg.span) classes.push(`lg:w-[${(lg.span / 24) * 100}%]`);
      if (lg.offset) classes.push(`lg:ml-[${(lg.offset / 24) * 100}%]`);
      if (lg.order) classes.push(`lg:order-${lg.order}`);
    }

    if (typeof xl === 'number') {
      classes.push(`xl:w-[${(xl / 24) * 100}%]`);
    } else if (xl && typeof xl === 'object') {
      if (xl.span) classes.push(`xl:w-[${(xl.span / 24) * 100}%]`);
      if (xl.offset) classes.push(`xl:ml-[${(xl.offset / 24) * 100}%]`);
      if (xl.order) classes.push(`xl:order-${xl.order}`);
    }

    if (typeof xxl === 'number') {
      classes.push(`2xl:w-[${(xxl / 24) * 100}%]`);
    } else if (xxl && typeof xxl === 'object') {
      if (xxl.span) classes.push(`2xl:w-[${(xxl.span / 24) * 100}%]`);
      if (xxl.offset) classes.push(`2xl:ml-[${(xxl.offset / 24) * 100}%]`);
      if (xxl.order) classes.push(`2xl:order-${xxl.order}`);
    }

    return (
      <div ref={ref} className={cn(classes.join(' '), className)} style={colStyle} {...props}>
        {children}
      </div>
    );
  }
);

Col.displayName = 'Col';

export default Col;
