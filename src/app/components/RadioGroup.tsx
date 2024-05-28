"use client"

import clsx from "clsx"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form"
import { RadioGroup as BaseRadioGroup, RadioGroupItem } from "@/ui/radio-group"

export interface RadioGroupProps<T extends string> {
  className?: string
  defaultValue?: NoInfer<T>
  description?: string
  label: string
  name: string
  onChange?: (value: T) => void
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
  return (
    <FormItem className={clsx("space-y-3", className)} name={name}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <BaseRadioGroup
          className="flex flex-col space-y-1"
          defaultValue={defaultValue}
          name={name}
          onValueChange={onChange}
          value={value}
        >
          {options.map((option) => (
            <FormItem
              key={option.value}
              className="flex items-center space-x-3 space-y-0"
              name={name}
            >
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>

              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
        </BaseRadioGroup>
      </FormControl>

      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
