"use client"

import { useId } from "react"
import { Label } from "./Label"

export interface TextFieldProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "autoComplete" | "defaultValue" | "name" | "type" | "value"
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
  const Component = isMultiline ? "textarea" : "input"

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

      <Component
        autoComplete="off"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        id={id}
        onKeyDown={isMultiline ? handleKeyDown : undefined}
        type="text"
        {...props}
      />
    </div>
  )
}
