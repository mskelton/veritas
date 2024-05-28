"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import React, { createContext, useContext, useId, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/ui/label"

type FormState = {
  errors?: Record<string, string[] | undefined>
}

type FormContextValue = {
  formId: string
  state?: FormState
}

const FormContext = createContext<FormContextValue>(null!)

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  state?: FormState
}

function Form({ state, ...props }: FormProps) {
  const formId = useId()
  const ctx = useMemo(() => ({ formId, state }), [formId, state])

  return (
    <FormContext.Provider value={ctx}>
      <form autoComplete="off" {...props} />
    </FormContext.Provider>
  )
}

function useFormField() {
  const { state } = useContext(FormContext)
  const { id, name } = useContext(FormItemContext)

  return {
    error: state?.errors?.[name],
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
  }
}

type FormItemContextValue = {
  id: string
  name: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

type FormItemProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, name, ...props }, ref) => {
    const id = React.useId()
    const ctx = useMemo(() => ({ id, name }), [id, name])

    return (
      <FormItemContext.Provider value={ctx}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formDescriptionId, formItemId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      id={formItemId}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return children ? (
    <p
      ref={ref}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      id={formDescriptionId}
      {...props}
    >
      {children}
    </p>
  ) : null
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.[0]) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      id={formMessageId}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
