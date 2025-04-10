import { cn } from "@/lib/utils";
import React from "react";

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
  onCollapse?: (
    collapsed: boolean,
    type: "clickTrigger" | "responsive"
  ) => void;
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  theme?: "light" | "dark";
  collapsedWidth?: number;
  trigger?: React.ReactNode;
  reverseArrow?: boolean;
};

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, style, children, hasSider, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col min-h-screen",
          hasSider && "flex-row",
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Layout.displayName = "Layout";

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center h-12 px-4 bg-background border-b border-border",
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Header.displayName = "Header";

const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 p-6", className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Content";

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center h-16 px-6 bg-background border-t border-border",
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Footer.displayName = "Footer";

const Sider = React.forwardRef<HTMLDivElement, SiderProps>(
  (
    {
      className,
      style,
      children,
      width = 200,
      collapsed = false,
      collapsedWidth = 80,
      theme = "light",
      ...props
    },
    ref
  ) => {
    const siderWidth = collapsed ? collapsedWidth : width;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col flex-none border-r border-border transition-all duration-300 ease-in-out",
          theme === "dark" ? "bg-slate-800 text-white" : "bg-background",
          className
        )}
        style={{
          ...style,
          width:
            typeof siderWidth === "number" ? `${siderWidth}px` : siderWidth,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Sider.displayName = "Sider";

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;

export { Content, Footer, Header, Sider };
export default Layout;
