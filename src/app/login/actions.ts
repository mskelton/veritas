"use server"

import { and, eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { db, schema } from "@/lib/db"
import { hash } from "@/lib/encryption"

const twoWeeks = 1000 * 60 * 60 * 24 * 14
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

  const { email, password } = fields.data
  const hashedPassword = hash(password)

  const users = await db
    .select({
      email: schema.users.email,
      id: schema.users.id,
      password: schema.users.password,
    })
    .from(schema.users)
    .where(
      and(
        eq(schema.users.email, email),
        // eq(schema.users.password, hashedPassword),
      ),
    )
    .limit(1)

  console.log(users, hashedPassword)

  const user = users[0]
  if (!user) {
    throw new Error("User not found")
  }

  // Create a session
  const session_id = crypto.randomUUID()
  await db.insert(schema.sessions).values({
    expiresAt: new Date(Date.now() + twoWeeks),
    id: session_id,
    userId: user.id,
  })

  // Set the session cookie
  cookies().set("session", session_id)
  redirect("/")
}
