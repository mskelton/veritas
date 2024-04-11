import { twMerge } from "tailwind-merge"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: "primary" | "secondary"
}

export function Button({
  children,
  className,
  isLoading: _,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        variant === "primary" &&
          "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500",
        variant === "secondary" && "text-gray-900 hover:bg-gray-100",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
