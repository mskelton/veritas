import { useId } from "react"

export interface TextFieldProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "autoComplete" | "defaultValue" | "name" | "type" | "value"
  > {
  className?: string
  label: string
  multiline?: boolean
  name: string
}

export function TextField({
  className,
  label,
  multiline = false,
  ...props
}: TextFieldProps) {
  const id = useId()
  const Component = multiline ? "textarea" : "input"

  return (
    <div className={className}>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="mt-2">
        <Component
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id={id}
          type="text"
          {...props}
        />
      </div>
    </div>
  )
}
