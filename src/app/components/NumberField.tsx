import { useId } from "react"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"

export interface NumberFieldProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "autoComplete" | "defaultValue" | "name" | "value"
  > {
  className?: string
  description?: string
  label: string
  name: string
}

export function NumberField({
  className,
  description,
  label,
  ...props
}: NumberFieldProps) {
  const id = useId()

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          autoComplete="off"
          id={id}
          pattern="[0-9]+"
          type="text"
          {...props}
        />
      </FormControl>

      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
