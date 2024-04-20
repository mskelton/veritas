"use client"

import { useId } from "react"
import { Input } from "./Input"
import { Label } from "./Label"

export interface TextFieldProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "autoComplete" | "autoFocus" | "defaultValue" | "name" | "type" | "value"
  > {
  className?: string
  isMultiline?: boolean
  label: string
  name: string
}

export function TextField({
  className,
  isMultiline = false,
  label,
  ...props
}: TextFieldProps) {
  const id = useId()

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
    <div className={className}>
      <Label className="mb-2" htmlFor={id}>
        {label}
      </Label>

      <Input
        autoComplete="off"
        id={id}
        isMultiline
        onKeyDown={isMultiline ? handleKeyDown : undefined}
        type="text"
        {...props}
      />
    </div>
  )
}
