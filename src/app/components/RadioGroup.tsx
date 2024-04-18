import { useId } from "react"
import { Label } from "./Label"

export interface RadioGroupProps<T extends string> {
  className?: string
  defaultValue?: NoInfer<T>
  description: string
  label: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  options: { label: string; value: T }[]
  value?: NoInfer<T>
}

export function RadioGroup<T extends string>({
  className,
  defaultValue,
  description,
  label,
  name,
  onChange,
  options,
  value,
}: RadioGroupProps<T>) {
  const groupId = useId()

  return (
    <div className={className}>
      <Label>{label}</Label>
      <p className="text-xs text-gray-500">{description}</p>

      <fieldset className="mt-4">
        <legend className="sr-only">{label}</legend>
        <div className="space-y-2">
          {options.map((option) => {
            const id = `${groupId}-${option.value}`

            return (
              <div key={option.value} className="flex items-center">
                <input
                  checked={value ? option.value === value : undefined}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  defaultChecked={option.value === defaultValue}
                  id={id}
                  name={name}
                  onChange={onChange}
                  type="radio"
                  value={option.value}
                />

                <label
                  className="ml-3 block text-sm leading-6 text-gray-900"
                  htmlFor={id}
                >
                  {option.label}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
