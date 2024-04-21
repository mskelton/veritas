import { twMerge } from "tailwind-merge"

export interface InputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "autoComplete"
    | "className"
    | "defaultValue"
    | "id"
    | "name"
    | "type"
    | "value"
  > {
  isMultiline?: boolean
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

export function Input({ className, isMultiline, ...props }: InputProps) {
  const Component = isMultiline ? "textarea" : "input"

  return (
    <Component
      className={twMerge(
        "block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-zinc-900 dark:text-gray-100 dark:ring-gray-700 dark:placeholder:text-gray-600 sm:text-sm sm:leading-6",
        className,
      )}
      {...props}
    />
  )
}
