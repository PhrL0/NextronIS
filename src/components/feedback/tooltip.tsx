'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  title: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
  className?: string;
  overlayClassName?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = 'top',
  children,
  className,
  overlayClassName,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const childRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  let enterTimer: ReturnType<typeof setTimeout> | null = null;
  let leaveTimer: ReturnType<typeof setTimeout> | null = null;

  const placementStyles = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  const arrowStyles = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-current border-l-transparent border-r-transparent border-b-transparent',
    bottom:
      'top-[-6px] left-1/2 transform -translate-x-1/2 border-b-current border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-l-current border-t-transparent border-b-transparent border-r-transparent',
    right:
      'left-[-6px] top-1/2 transform -translate-y-1/2 border-r-current border-t-transparent border-b-transparent border-l-transparent'
  };

  const handleMouseEnter = () => {
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      leaveTimer = null;
    }

    enterTimer = setTimeout(() => {
      if (childRef.current) {
        const rect = childRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        });
        setVisible(true);
      }
    }, mouseEnterDelay * 1000);
  };

  const handleMouseLeave = () => {
    if (enterTimer) {
      clearTimeout(enterTimer);
      enterTimer = null;
    }

    leaveTimer = setTimeout(() => {
      setVisible(false);
    }, mouseLeaveDelay * 1000);
  };

  // Clone the child element to add event handlers
  const child = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...children.props
  });

  return (
    <>
      {child}
      {visible && (
        <div
          ref={tooltipRef}
          className={cn('fixed z-50 max-w-xs', placementStyles[placement], className)}
          style={{
            top: position.top,
            left: position.left
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={cn(
              'bg-popover text-popover-foreground relative rounded-md px-3 py-1.5 text-sm shadow-md',
              overlayClassName
            )}
          >
            {title}
            <span className={cn('absolute h-0 w-0 border-4', arrowStyles[placement])} />
          </div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
