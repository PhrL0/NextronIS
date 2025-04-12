import { cn } from '@/lib/utils';
import { Loader, Loader2 } from 'lucide-react';

interface LoadingProps extends React.ComponentProps<'div'> {
  variant?: 'single' | 'medium' | 'detailed';
  spinVariant?: 'circle' | 'lines';
}
export const Loading = ({
  variant = 'single',
  spinVariant = 'circle',
  title,
  color,
  className,
  ...props
}: LoadingProps) => {
  const loaderSize = variant == 'single' ? 24 : variant == 'medium' ? 48 : 64;
  const spin =
    spinVariant === 'circle' ? (
      <Loader2 className={cn('animate-spin', `stroke-${color}`)} size={loaderSize} />
    ) : (
      <Loader className={cn('animate-spin', `stroke-${color}`)} size={loaderSize} />
    );

  if (variant === 'single')
    return (
      <div className={cn('flex size-full flex-1 flex-col items-center justify-center', className)} {...props}>
        {spin}
        {title ? <p className={cn('mt-2 text-center text-xs', `text-${color}`)}>{title}</p> : null}
      </div>
    );
  if (variant === 'medium')
    return (
      <div className="flex size-full items-center justify-center">
        <div
          className={cn('flex aspect-square h-min w-max flex-col items-center justify-center p-4', className)}
          {...props}
        >
          {spin}
          {title && <p className={cn('mt-2 text-center', `text-${color}`)}>{title}</p>}
        </div>
      </div>
    );
};
