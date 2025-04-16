import { cn } from '@/shared/lib/utils';
import React from 'react';

export type LayoutProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  hasSider?: boolean;
};

export type HeaderProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export type ContentProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export type FooterProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export type SiderProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  width?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean, type: 'clickTrigger' | 'responsive') => void;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  theme?: 'light' | 'dark';
  collapsedWidth?: number;
  trigger?: React.ReactNode;
  reverseArrow?: boolean;
};

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, style, children, hasSider, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex min-h-screen flex-col', hasSider && 'flex-row', className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Layout.displayName = 'Layout';

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ className, style, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('bg-background border-border flex h-12 items-center border-b px-4', className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

Header.displayName = 'Header';

const Content = React.forwardRef<HTMLDivElement, ContentProps>(({ className, style, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex-1 p-6', className)} style={style} {...props}>
      {children}
    </div>
  );
});

Content.displayName = 'Content';

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(({ className, style, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('bg-background border-border flex h-16 items-center justify-center border-t px-6', className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

Footer.displayName = 'Footer';

const Sider = React.forwardRef<HTMLDivElement, SiderProps>(
  (
    { className, style, children, width = 200, collapsed = false, collapsedWidth = 80, theme = 'light', ...props },
    ref
  ) => {
    const siderWidth = collapsed ? collapsedWidth : width;

    return (
      <div
        ref={ref}
        className={cn(
          'border-border flex flex-none flex-col border-r transition-all duration-300 ease-in-out',
          theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-background',
          className
        )}
        style={{
          ...style,
          width: typeof siderWidth === 'number' ? `${siderWidth}px` : siderWidth
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Sider.displayName = 'Sider';

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;

export { Content, Footer, Header, Sider };
export default Layout;
