import { useId } from "react"
import { Input } from "./Input"
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

      <Input id={id} type="number" {...props} />
    </div>
  )
}
