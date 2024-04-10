import { useId } from "react"

export interface RadioGroupProps {
  className?: string
  description: string
  label: string
  name: string
  options: { label: string; value: string }[]
}

export default function RadioGroup({
  className,
  description,
  label,
  name,
  options,
}: RadioGroupProps) {
  const groupId = useId()

  return (
    <div className={className}>
      <label className="text-sm font-semibold text-gray-900">{label}</label>
      <p className="text-xs text-gray-500">{description}</p>

      <fieldset className="mt-4">
        <legend className="sr-only">{label}</legend>
        <div className="space-y-2">
          {options.map((option) => {
            const id = `${groupId}-${option.value}`

            return (
              <div key={option.value} className="flex items-center">
                <input
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  id={id}
                  name={name}
                  type="radio"
                />

                <label
                  className="ml-3 block text-sm font-medium leading-6 text-gray-900"
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
