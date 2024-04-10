import { twMerge } from "tailwind-merge"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "rounded-md px-3 py-2 text-sm font-semibold leading-6 transition-colors",
        variant === "primary" &&
          "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        variant === "secondary" && "text-gray-900 hover:bg-gray-100",
        className,
      )}
      type="button"
      {...props}
    />
  )
}
