import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LoadingSpinner({ className, ...props }: LoadingSpinnerProps) {
  return (
    <div className={twMerge("relative size-6", className)} {...props}>
      <svg
        className={clsx(
          "absolute inset-0 size-full origin-center fill-none stroke-current",
          "[stroke-dasharray:calc(100%*2.8)] [stroke-dashoffset:calc(100%*2.25)] [stroke-linecap:round] [stroke-width:calc(100%/10)]",
          "animate-[loading-spinner_.86s_cubic-bezier(.4,.15,.6,.85)_infinite]",
        )}
        focusable="false"
        viewBox="0 0 30 30"
      >
        <circle cx="15" cy="15" r="13.5" />
      </svg>
    </div>
  )
}
