'use client';

import React, { useEffect, useRef, useState } from 'react';

export type AffixProps = {
  offsetTop?: number;
  offsetBottom?: number;
  target?: () => Window | HTMLElement;
  onChange?: (affixed: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(
  ({ offsetTop, offsetBottom, target = () => window, onChange, className, style, children, ...props }, ref) => {
    const [affixed, setAffixed] = useState(false);
    const [position, setPosition] = useState<React.CSSProperties>({});
    const placeholderRef = useRef<HTMLDivElement>(null);
    const fixedNodeRef = useRef<HTMLDivElement>(null);
    const prevAffixed = useRef(affixed);

    useEffect(() => {
      const targetNode = target();

      const getOffset = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();

        if (targetNode === window) {
          return {
            top: rect.top,
            bottom: document.documentElement.clientHeight - rect.bottom
          };
        }

        const targetRect = (targetNode as HTMLElement).getBoundingClientRect();
        return {
          top: rect.top - targetRect.top,
          bottom: targetRect.bottom - rect.bottom
        };
      };

      const handleScroll = () => {
        if (!placeholderRef.current || !fixedNodeRef.current) return;

        const { top, bottom } = getOffset(placeholderRef.current);

        if (offsetTop !== undefined && top <= offsetTop) {
          const width = placeholderRef.current.offsetWidth;
          const height = placeholderRef.current.offsetHeight;

          setAffixed(true);
          setPosition({
            position: 'fixed',
            top: offsetTop,
            width,
            height
          });
        } else if (offsetBottom !== undefined && bottom <= offsetBottom) {
          const width = placeholderRef.current.offsetWidth;
          const height = placeholderRef.current.offsetHeight;

          setAffixed(true);
          setPosition({
            position: 'fixed',
            bottom: offsetBottom,
            width,
            height
          });
        } else {
          setAffixed(false);
          setPosition({});
        }
      };

      targetNode.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      // Initial check
      handleScroll();

      return () => {
        targetNode.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }, [offsetBottom, offsetTop, target]);

    useEffect(() => {
      if (prevAffixed.current !== affixed && onChange) {
        onChange(affixed);
      }
      prevAffixed.current = affixed;
    }, [affixed, onChange]);

    return (
      <div ref={placeholderRef} {...props}>
        {affixed && <div style={{ width: position.width, height: position.height }} />}
        <div
          ref={fixedNodeRef}
          className={className}
          style={{
            ...style,
            ...position
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Affix.displayName = 'Affix';

export default Affix;
