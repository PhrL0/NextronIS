import React from "react"
import { cn } from "@/lib/utils"

export type BadgeProps = {
  count?: React.ReactNode
  showZero?: boolean
  overflowCount?: number
  dot?: boolean
  status?: "success" | "processing" | "default" | "error" | "warning"
  color?: string
  offset?: [number, number]
  size?: "default" | "small"
  text?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const statusColorMap = {
  success: "bg-green-500",
  processing: "bg-blue-500",
  default: "bg-gray-400",
  error: "bg-red-500",
  warning: "bg-amber-500",
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      count,
      showZero = false,
      overflowCount = 99,
      dot = false,
      status,
      color,
      offset,
      size = "default",
      text,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const hasCount = count !== undefined && count !== null && (count !== 0 || showZero)
    const isZero = count === 0 || count === "0"
    const displayCount = (count as number) > overflowCount ? `${overflowCount}+` : count

    const badgeStyle: React.CSSProperties = { ...style }

    if (offset) {
      const [horizontalOffset, verticalOffset] = offset
      badgeStyle.marginTop = verticalOffset
      badgeStyle.marginRight = horizontalOffset
    }

    if (color) {
      badgeStyle.backgroundColor = color
    }

    // Status dot badge
    if (status) {
      return (
        <span ref={ref} className={cn("inline-flex items-center", className)} {...props}>
          <span
            className={cn(
              "inline-block w-2 h-2 rounded-full",
              statusColorMap[status],
              status === "processing" && "animate-pulse",
            )}
          />
          {text && <span className="ml-2">{text}</span>}
        </span>
      )
    }

    // Standalone badge
    if (!children) {
      return hasCount || dot ? (
        <span
          ref={ref}
          className={cn(
            "inline-flex",
            dot
              ? "w-2 h-2 rounded-full bg-red-500"
              : "h-5 min-w-5 px-1.5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center",
            size === "small" && (dot ? "w-1.5 h-1.5" : "h-4 min-w-4 px-1 text-[10px]"),
            isZero && "bg-gray-300",
            className,
          )}
          style={badgeStyle}
          {...props}
        >
          {!dot && displayCount}
        </span>
      ) : null
    }

    // Badge with children
    return (
      <span ref={ref} className="relative inline-block" {...props}>
        {children}
        {(hasCount || dot) && (
          <span
            className={cn(
              "absolute -top-1 -right-1 transform translate-x-1/2 -translate-y-1/2",
              dot
                ? "w-2 h-2 rounded-full bg-red-500"
                : "h-5 min-w-5 px-1.5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center",
              size === "small" && (dot ? "w-1.5 h-1.5" : "h-4 min-w-4 px-1 text-[10px]"),
              isZero && "bg-gray-300",
              className,
            )}
            style={badgeStyle}
          >
            {!dot && displayCount}
          </span>
        )}
      </span>
    )
  },
)

Badge.displayName = "Badge"

export default Badge

