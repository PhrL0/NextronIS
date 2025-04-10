import React from "react"
import { cn } from "@/lib/utils"

export type TitleProps = {
  level?: 1 | 2 | 3 | 4 | 5
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  code?: boolean
  copyable?: boolean
  delete?: boolean
  disabled?: boolean
  ellipsis?: boolean | { rows?: number; expandable?: boolean; suffix?: string }
  mark?: boolean
  italic?: boolean
  type?: "secondary" | "success" | "warning" | "danger"
  underline?: boolean
}

const levelMap = {
  1: "text-4xl font-bold",
  2: "text-3xl font-bold",
  3: "text-2xl font-bold",
  4: "text-xl font-semibold",
  5: "text-lg font-semibold",
}

const typeMap = {
  secondary: "text-muted-foreground",
  success: "text-green-600",
  warning: "text-amber-600",
  danger: "text-red-600",
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      level = 1,
      className,
      style,
      children,
      code = false,
      delete: del = false,
      disabled = false,
      ellipsis = false,
      mark = false,
      italic = false,
      type,
      underline = false,
      ...props
    },
    ref,
  ) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements

    const ellipsisStyles: React.CSSProperties = {}
    const ellipsisClasses = []

    if (ellipsis) {
      ellipsisClasses.push("truncate")

      if (typeof ellipsis === "object" && ellipsis.rows && ellipsis.rows > 1) {
        ellipsisClasses.push("line-clamp-2")
        ellipsisStyles.WebkitLineClamp = ellipsis.rows
        ellipsisStyles.display = "-webkit-box"
        ellipsisStyles.WebkitBoxOrient = "vertical"
        ellipsisStyles.overflow = "hidden"
      }
    }

    let content = children

    if (code) {
      content = <code>{content}</code>
    }

    if (mark) {
      content = <mark className="bg-yellow-200 px-1">{content}</mark>
    }

    if (del) {
      content = <del>{content}</del>
    }

    if (underline) {
      content = <u>{content}</u>
    }

    return (
      <Component
        ref={ref}
        className={cn(
          levelMap[level],
          type && typeMap[type],
          disabled && "text-muted-foreground cursor-not-allowed",
          italic && "italic",
          ...ellipsisClasses,
          className,
        )}
        style={{ ...style, ...ellipsisStyles }}
        {...props}
      >
        {content}
      </Component>
    )
  },
)

Title.displayName = "Title"

export default Title

