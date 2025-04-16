'use client';

import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

const drawerVariants = cva('fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out', {
  variants: {
    placement: {
      left: 'inset-y-0 left-0 h-full transform -translate-x-full data-[state=open]:translate-x-0',
      right: 'inset-y-0 right-0 h-full transform translate-x-full data-[state=open]:translate-x-0',
      top: 'inset-x-0 top-0 w-full transform -translate-y-full data-[state=open]:translate-y-0',
      bottom: 'inset-x-0 bottom-0 w-full transform translate-y-full data-[state=open]:translate-y-0'
    },
    size: {
      default: 'w-[300px]',
      sm: 'w-[250px]',
      lg: 'w-[400px]',
      xl: 'w-[600px]',
      full: 'w-screen'
    }
  },
  defaultVariants: {
    placement: 'right',
    size: 'default'
  }
});

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof drawerVariants> {
  open?: boolean;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  zIndex?: number;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      className,
      children,
      placement,
      size,
      open = false,
      onClose,
      closeOnOutsideClick = true,
      closeOnEsc = true,
      title,
      footer,
      mask = true,
      maskClosable = true,
      keyboard = true,
      zIndex = 1000,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(open);

    React.useEffect(() => {
      setIsOpen(open);
    }, [open]);

    React.useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (keyboard && closeOnEsc && e.key === 'Escape') {
          setIsOpen(false);
          onClose?.();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = '';
      };
    }, [isOpen, onClose, closeOnEsc, keyboard]);

    const handleMaskClick = () => {
      if (maskClosable) {
        setIsOpen(false);
        onClose?.();
      }
    };

    const handleDrawerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const isHorizontal = placement === 'left' || placement === 'right';
    const sizeClass = isHorizontal ? size : undefined;

    return (
      <>
        {isOpen && mask && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={handleMaskClick} style={{ zIndex: zIndex - 1 }} />
        )}
        <div
          ref={ref}
          className={cn(drawerVariants({ placement, size: sizeClass }), className)}
          data-state={isOpen ? 'open' : 'closed'}
          onClick={handleDrawerClick}
          style={{ zIndex }}
          {...props}
        >
          {title && (
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="text-lg font-medium">{title}</div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
                className="hover:bg-muted rounded-full p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          <div className="p-6">{children}</div>
          {footer && <div className="border-t px-6 py-4">{footer}</div>}
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
