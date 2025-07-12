import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,box-shadow,background-color,transform] disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer transform rounded-br-3xl rounded-tl-3xl',
  {
    variants: {
      variant: {
        default: 'bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 focus-visible:ring-emerald-500',
        destructive: 'bg-red-500 text-white shadow-sm hover:bg-red-600 focus-visible:ring-red-500',
        outline:
          'border border-emerald-500 bg-transparent text-emerald-500 shadow-sm hover:bg-emerald-50/10 focus-visible:ring-emerald-500',
        secondary: 'bg-emerald-100/5 text-emerald-700 shadow-sm hover:bg-emerald-200/25 focus-visible:ring-emerald-500',
        ghost: 'text-emerald-600 hover:bg-emerald-50/10 hover:text-emerald-700',
        link: 'text-emerald-600 underline-offset-4 hover:underline hover:text-emerald-700'
      },
      size: {
        default: 'h-8 px-6 py-2',
        sm: 'h-8 px-4',
        lg: 'h-12 px-8',
        icon: 'size-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      <span className="flex transform items-center justify-center gap-2 transition-transform [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        {children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };
