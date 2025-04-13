'use client';

import type React from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

export type MeterVariant = 'solid' | 'outline' | 'gradient';
export type MeterSize = 'sm' | 'md' | 'lg';
export type MeterDisplayFormat = 'percentage' | 'value' | 'both' | 'none';

export type MeterProps = {
  /**
   * Minimum value of the meter
   * @default 0
   */
  min?: number;
  /**
   * Maximum value of the meter
   * @default 100
   */
  max?: number;
  /**
   * Current value to display
   */
  currentValue: number;
  /**
   * Icon to display with the meter
   */
  icon?: React.ReactNode;
  /**
   * Whether to display the meter vertically (true) or horizontally (false)
   * @default false
   */
  vertical?: boolean;
  /**
   * Optional label to display
   */
  label?: string;
  /**
   * Optional className for additional styling
   */
  className?: string;
  /**
   * Visual style variant
   * @default "solid"
   */
  variant?: MeterVariant;
  /**
   * Size of the meter
   * @default "md"
   */
  size?: MeterSize;
  /**
   * Custom color for the meter fill
   * If provided, overrides the automatic color based on percentage
   */
  color?: string;
  /**
   * Custom background color for the meter track
   */
  trackColor?: string;
  /**
   * How to display the value
   * @default "value"
   */
  displayFormat?: MeterDisplayFormat;
  /**
   * Whether to animate the meter on value change
   * @default true
   */
  animate?: boolean;
  /**
   * Whether to show threshold markers on the meter
   * @default false
   */
  showThresholdMarkers?: boolean;
};

export const Meter = ({
  min = 0,
  max = 100,
  currentValue,
  icon,
  vertical = false,
  label,
  className,
  variant = 'solid',
  size = 'md',
  color,
  trackColor,
  displayFormat = 'value',
  animate = true,
  showThresholdMarkers = false
}: MeterProps) => {
  const [percentage, setPercentage] = useState(0);

  // Calculate color based on percentage
  const meterColor = useMemo(() => {
    if (color) return color;

    if (percentage > 90) return 'bg-red-500';
    if (percentage > 75) return 'bg-orange-500';
    if (percentage > 50) return 'bg-yellow-400';
    if (percentage > 25) return 'bg-green-500';
    return 'bg-blue-500';
  }, [percentage, color]);

  // Calculate percentage when currentValue or max changes
  useEffect(() => {
    const calculatedPercentage = Math.max(0, Math.min(100, ((currentValue - min) / (max - min)) * 100));
    setPercentage(calculatedPercentage);
  }, [currentValue, max, min]);

  // Format for screen readers
  const ariaValueText = `${currentValue} of ${max} (${percentage.toFixed(0)}%)`;

  // Format displayed value
  const formattedValue = useMemo(() => {
    switch (displayFormat) {
      case 'percentage':
        return `${percentage.toFixed(0)}%`;
      case 'value':
        return `${currentValue}`;
      case 'both':
        return `${currentValue} (${percentage.toFixed(0)}%)`;
      case 'none':
        return null;
      default:
        return `${currentValue}`;
    }
  }, [currentValue, percentage, displayFormat]);

  // Tooltip content
  const tooltipContent = label
    ? `${label}: ${currentValue} / ${max} (${percentage.toFixed(0)}%)`
    : `${currentValue} / ${max} (${percentage.toFixed(0)}%)`;

  // Size classes - FIXED: corrected width/height for vertical/horizontal orientation
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return vertical
          ? { container: 'gap-2', meter: 'w-3 min-h-20 h-full', icon: 'h-4 w-4', text: 'text-xs' }
          : { container: 'gap-2', meter: 'h-3 min-w-20 w-full', icon: 'h-4 w-4', text: 'text-xs' };
      case 'md':
        return vertical
          ? { container: 'gap-3', meter: 'w-4 min-h-28 h-full', icon: 'h-5 w-5', text: 'text-xs' }
          : { container: 'gap-3', meter: 'h-4 min-w-28 w-full', icon: 'h-5 w-5', text: 'text-xs' };
      case 'lg':
        return vertical
          ? { container: 'gap-4', meter: 'w-5 min-h-36 h-full', icon: 'h-6 w-6', text: 'text-sm' }
          : { container: 'gap-4', meter: 'h-5 min-w-36 w-full', icon: 'h-6 w-6', text: 'text-sm' };
      default:
        return vertical
          ? { container: 'gap-3', meter: 'w-4 min-h-28 h-full', icon: 'h-5 w-5', text: 'text-xs' }
          : { container: 'gap-3', meter: 'h-4 min-w-28 w-full', icon: 'h-5 w-5', text: 'text-xs' };
    }
  };

  const sizeClasses = getSizeClasses();

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'outline':
        return 'border-2 border-neutral-300 dark:border-neutral-700 bg-transparent';
      case 'gradient':
        return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'solid':
      default:
        return meterColor;
    }
  };

  const variantClasses = getVariantClasses();

  // Animation classes
  const animationClasses = animate ? 'transition-all duration-300' : '';

  // Track color
  const trackColorClass = trackColor || 'bg-neutral-200 dark:bg-neutral-800';

  // Render threshold markers
  const renderThresholdMarkers = () => {
    if (!showThresholdMarkers) return null;

    const thresholds = [90, 75, 50, 25];

    return thresholds.map((threshold, index) => {
      const position = `${threshold}%`;

      return (
        <div
          key={index}
          className="absolute z-10 h-1 w-1 rounded-full border border-neutral-400 bg-white"
          style={
            vertical
              ? { bottom: position, left: '50%', transform: 'translateX(-50%)' }
              : { left: position, top: '50%', transform: 'translateY(-50%)' }
          }
        />
      );
    });
  };

  // Render meter component
  const renderMeter = () => (
    <div
      className={cn('relative overflow-hidden rounded-full', trackColorClass, sizeClasses.meter)}
      role="progressbar"
      aria-valuenow={currentValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={ariaValueText}
    >
      <div
        className={cn('absolute rounded-full', variantClasses, animationClasses)}
        style={
          vertical
            ? { height: `${percentage}%`, width: '100%', bottom: 0, left: 0 }
            : { width: `${percentage}%`, height: '100%', left: 0, top: 0 }
        }
      />
      {renderThresholdMarkers()}
    </div>
  );

  // Render value display
  const renderValue = () => {
    if (displayFormat === 'none') return null;

    return (
      <p className={cn('w-6 text-center font-semibold text-neutral-500 dark:text-neutral-400', sizeClasses.text)}>
        {formattedValue}
      </p>
    );
  };

  // Render icon
  const renderIcon = () => {
    if (!icon) return null;

    return <div className={cn('flex items-center justify-center', sizeClasses.icon)}>{icon}</div>;
  };

  // Wrap content in tooltip
  const wrapInTooltip = (content: React.ReactNode) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  // Render vertical or horizontal layout
  if (vertical) {
    return wrapInTooltip(
      <div className={cn('flex h-full flex-col items-center justify-center', sizeClasses.container, className)}>
        {renderValue()}
        {renderMeter()}
        {renderIcon()}
      </div>
    );
  }

  return wrapInTooltip(
    <div className={cn('flex h-full items-center justify-center', sizeClasses.container, className)}>
      {renderIcon()}
      {renderMeter()}
      {renderValue()}
    </div>
  );
};
