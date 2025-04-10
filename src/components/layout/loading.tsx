import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";

interface LoadingProps extends React.ComponentProps<"div"> {
  variant?: "single" | "medium" | "detailed";
  spinVariant?: "circle" | "lines";
}
export const Loading = ({
  variant = "single",
  spinVariant = "circle",
  title,
  color,
  className,
  ...props
}: LoadingProps) => {
  const loaderSize = variant == "single" ? 24 : variant == "medium" ? 48 : 64;
  const spin =
    spinVariant === "circle" ? (
      <Loader2
        className={cn("animate-spin", `stroke-${color}`)}
        size={loaderSize}
      />
    ) : (
      <Loader
        className={cn("animate-spin", `stroke-${color}`)}
        size={loaderSize}
      />
    );

  if (variant === "single")
    return (
      <div
        className={cn(
          "size-full flex flex-col flex-1 justify-center items-center",
          className
        )}
        {...props}
      >
        {spin}
        {title ? (
          <p className={cn("text-xs text-center mt-2", `text-${color}`)}>
            {title}
          </p>
        ) : null}
      </div>
    );
  if (variant === "medium")
    return (
      <div className="size-full flex justify-center items-center">
        <div
          className={cn(
            "w-max h-min p-4 aspect-square flex flex-col justify-center items-center",
            className
          )}
          {...props}
        >
          {spin}
          {title && (
            <p className={cn("text-center mt-2", `text-${color}`)}>{title}</p>
          )}
        </div>
      </div>
    );
};
