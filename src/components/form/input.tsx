import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-2 py-1 text-xs',
        lg: 'h-12 px-4 py-3 text-base'
      },
      variant: {
        default: 'border-input',
        filled: 'border-transparent bg-muted/80 hover:bg-muted',
        outline: 'border-2'
      },
      status: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
        warning: 'border-amber-500 focus-visible:ring-amber-500'
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      status: 'default'
    }
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'>,
    VariantProps<typeof inputVariants> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      variant,
      status,
      prefix,
      suffix,
      allowClear,
      onClear,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(value || '');
    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
      setInputValue(value || '');
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setInputValue('');
      onClear?.();

      // Create a synthetic event to trigger onChange
      const syntheticEvent = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Determine the actual input type
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Password visibility toggle
    const passwordToggle =
      type === 'password' ? (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-muted-foreground hover:text-foreground flex items-center justify-center"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      ) : null;

    // Clear button
    const clearButton =
      allowClear && inputValue && !disabled ? (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground flex items-center justify-center"
          tabIndex={-1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      ) : null;

    // Combine suffix with password toggle and clear button
    const combinedSuffix = (
      <>
        {suffix}
        {passwordToggle}
        {clearButton}
      </>
    );

    return (
      <div
        className={cn('relative flex items-center rounded-md', disabled && 'cursor-not-allowed opacity-50', className)}
      >
        {prefix && (
          <div className="text-muted-foreground absolute left-3 flex h-full items-center justify-center">{prefix}</div>
        )}
        <input
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            inputVariants({ size, variant, status }),
            prefix && 'pl-9',
            (suffix || passwordToggle || clearButton) && 'pr-9'
          )}
          ref={ref}
          {...props}
        />
        {(suffix || passwordToggle || clearButton) && (
          <div className="text-muted-foreground absolute right-3 flex h-full items-center justify-center gap-1">
            {combinedSuffix}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
