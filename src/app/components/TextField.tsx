"use client"

import { useId } from "react"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"

export interface TextFieldProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, `on${string}`>
  > {
  className?: string
  description?: string
  isMultiline?: boolean
  label: string
  name: string
  rows?: number
}

export function TextField({
  className,
  description,
  isMultiline = false,
  label,
  ...props
}: TextFieldProps) {
  const id = useId()
  const Component = isMultiline ? Textarea : Input

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    // Submit on Ctrl+Enter or Cmd+Enter
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <FormItem className={className} name={props.name}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Component
          autoComplete="off"
          id={id}
          onKeyDown={isMultiline ? handleKeyDown : undefined}
          type="text"
          {...props}
        />
      </FormControl>

      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
