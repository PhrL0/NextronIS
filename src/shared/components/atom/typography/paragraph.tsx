import { cn } from '@/shared/lib/utils';
import React from 'react';

export type ParagraphProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  code?: boolean;
  copyable?: boolean;
  delete?: boolean;
  disabled?: boolean;
  ellipsis?: boolean | { rows?: number; expandable?: boolean; suffix?: string };
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

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      className,
      style,
      children,
      code = false,
      delete: del = false,
      disabled = false,
      ellipsis = false,
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
      if (typeof ellipsis === 'object' && ellipsis.rows && ellipsis.rows > 1) {
        ellipsisClasses.push(`line-clamp-${ellipsis.rows}`);
        ellipsisStyles.WebkitLineClamp = ellipsis.rows;
        ellipsisStyles.display = '-webkit-box';
        ellipsisStyles.WebkitBoxOrient = 'vertical';
        ellipsisStyles.overflow = 'hidden';
      } else {
        ellipsisClasses.push('truncate');
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

    if (underline) {
      content = <u>{content}</u>;
    }

    return (
      <p
        ref={ref}
        className={cn(
          'mb-4',
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
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
