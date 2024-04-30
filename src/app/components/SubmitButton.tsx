"use client"

import React from "react"
import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "@/ui/button"

export interface SubmitButtonProps extends ButtonProps {}

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return <Button isLoading={pending} type="submit" {...props} />
}
