import React from "react"
import { cn } from "@/lib/utils"

export type FlexProps = {
  vertical?: boolean
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  align?: "start" | "end" | "center" | "baseline" | "stretch"
  gap?: "small" | "middle" | "large" | number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const gapSizeMap = {
  small: "gap-2",
  middle: "gap-4",
  large: "gap-8",
}

const justifyMap = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

const alignMap = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
}

const wrapMap = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      vertical = false,
      wrap = "nowrap",
      justify = "start",
      align = "start",
      gap = "small",
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const gapClass = typeof gap === "number" ? `gap-[${gap}px]` : gapSizeMap[gap] || gapSizeMap.small

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          vertical ? "flex-col" : "flex-row",
          wrapMap[wrap],
          justifyMap[justify],
          alignMap[align],
          gapClass,
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Flex.displayName = "Flex"

export default Flex

