import { useId } from "react"
import { Label } from "./Label"

export interface NumberFieldProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "autoComplete" | "defaultValue" | "name" | "value"
  > {
  className?: string
  label: string
  name: string
}

export function NumberField({ className, label, ...props }: NumberFieldProps) {
  const id = useId()

  return (
    <div className={className}>
      <Label className="mb-2" htmlFor={id}>
        {label}
      </Label>

      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        id={id}
        type="number"
        {...props}
      />
    </div>
  )
}
