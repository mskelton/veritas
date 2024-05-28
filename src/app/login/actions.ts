"use server"

import { z } from "zod"

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
})

export async function login(_: any, formData: FormData) {
  const fields = loginSchema.safeParse(Object.fromEntries(formData))

  if (!fields.success) {
    return { errors: fields.error.flatten().fieldErrors }
  }

  console.log("hi")
  return {}
}
