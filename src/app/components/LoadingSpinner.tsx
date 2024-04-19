import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LoadingSpinner({ className, ...props }: LoadingSpinnerProps) {
  return (
    <div className={twMerge("size-full relative", className)} {...props}>
      <svg
        className={clsx(
          "fill-none stroke-current inset-0 absolute origin-center size-full",
          "[stroke-dasharray:calc(100%*2.8)] [stroke-dashoffset:calc(100%*2.25)] [stroke-width:calc(100%/10)] [stroke-linecap:round]",
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
