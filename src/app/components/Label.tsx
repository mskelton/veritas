import { twMerge } from "tailwind-merge"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={twMerge(
        "block text-sm font-medium leading-6 text-gray-900",
        className,
      )}
      {...props}
    />
  )
}
