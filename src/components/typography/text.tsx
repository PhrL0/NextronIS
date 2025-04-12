import React from 'react';
import { cn } from '@/lib/utils';

export type TextProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  code?: boolean;
  copyable?: boolean;
  delete?: boolean;
  disabled?: boolean;
  ellipsis?: boolean | { rows?: number; expandable?: boolean; suffix?: string };
  keyboard?: boolean;
  mark?: boolean;
  strong?: boolean;
  italic?: boolean;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  underline?: boolean;
};

const typeMap = {
  secondary: 'text-muted-foreground',
  success: 'text-green-600',
  warning: 'text-amber-600',
  danger: 'text-red-600'
};

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      className,
      style,
      children,
      code = false,
      delete: del = false,
      disabled = false,
      ellipsis = false,
      keyboard = false,
      mark = false,
      strong = false,
      italic = false,
      type,
      underline = false,
      ...props
    },
    ref
  ) => {
    const ellipsisStyles: React.CSSProperties = {};
    const ellipsisClasses = [];

    if (ellipsis) {
      ellipsisClasses.push('truncate');

      if (typeof ellipsis === 'object' && ellipsis.rows && ellipsis.rows > 1) {
        ellipsisClasses.push('line-clamp-2');
        ellipsisStyles.WebkitLineClamp = ellipsis.rows;
        ellipsisStyles.display = '-webkit-box';
        ellipsisStyles.WebkitBoxOrient = 'vertical';
        ellipsisStyles.overflow = 'hidden';
      }
    }

    let content = children;

    if (code) {
      content = <code className="bg-muted rounded px-1 py-0.5 text-sm">{content}</code>;
    }

    if (mark) {
      content = <mark className="bg-yellow-200 px-1">{content}</mark>;
    }

    if (del) {
      content = <del>{content}</del>;
    }

    if (keyboard) {
      content = <kbd className="bg-muted rounded border px-1.5 py-0.5 text-xs">{content}</kbd>;
    }

    if (underline) {
      content = <u>{content}</u>;
    }

    return (
      <span
        ref={ref}
        className={cn(
          type && typeMap[type],
          disabled && 'text-muted-foreground cursor-not-allowed',
          strong && 'font-bold',
          italic && 'italic',
          ...ellipsisClasses,
          className
        )}
        style={{ ...style, ...ellipsisStyles }}
        {...props}
      >
        {content}
      </span>
    );
  }
);

Text.displayName = 'Text';

export default Text;
