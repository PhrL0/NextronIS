import React from "react"
import { cn } from "@/lib/utils"

export type SpaceProps = {
  align?: "start" | "end" | "center" | "baseline"
  direction?: "vertical" | "horizontal"
  size?: "small" | "middle" | "large" | number | [number, number]
  wrap?: boolean
  split?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  (
    { align, direction = "horizontal", size = "small", wrap = false, split, className, style, children, ...props },
    ref,
  ) => {
    const childNodes = React.Children.toArray(children).filter((child) => child !== null && child !== undefined)

    if (childNodes.length === 0) {
      return null
    }

    const mergedAlign = direction === "horizontal" && align === undefined ? "center" : align
    const marginDirection = direction === "vertical" ? "mb" : "mr"

    let horizontalSize: number
    let verticalSize: number

    if (typeof size === "string") {
      horizontalSize = spaceSize[size]
      verticalSize = spaceSize[size]
    } else if (typeof size === "number") {
      horizontalSize = size
      verticalSize = size
    } else {
      ;[horizontalSize, verticalSize] = size
    }

    const itemClassName = cn(
      direction === "vertical" ? `${marginDirection}-${verticalSize}` : `${marginDirection}-${horizontalSize}`,
    )

    const nodes = childNodes.map((child: any, i) => {
      const key = (child && child.key) || `space-item-${i}`

      let splitNode = null
      if (split && i < childNodes.length - 1) {
        splitNode = (
          <span className={cn(`${marginDirection}-${horizontalSize}`)} key={`split-${key}`}>
            {split}
          </span>
        )
      }

      return (
        <React.Fragment key={key}>
          <div className={i !== childNodes.length - 1 ? itemClassName : undefined}>{child}</div>
          {splitNode}
        </React.Fragment>
      )
    })

    const spaceClassNames = cn(
      "flex",
      {
        "flex-col": direction === "vertical",
        "items-start": mergedAlign === "start",
        "items-end": mergedAlign === "end",
        "items-center": mergedAlign === "center",
        "items-baseline": mergedAlign === "baseline",
        "flex-wrap": wrap,
      },
      className,
    )

    return (
      <div
        ref={ref}
        className={spaceClassNames}
        style={{
          ...style,
          gap: direction === "vertical" ? `${verticalSize}px` : `${horizontalSize}px`,
        }}
        {...props}
      >
        {nodes}
      </div>
    )
  },
)

Space.displayName = "Space"

export default Space

