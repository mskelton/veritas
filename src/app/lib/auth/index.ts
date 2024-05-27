import { and, eq } from "drizzle-orm"
import { object, string, ZodError } from "zod"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db, schema } from "../db"
import { hash } from "../encryption"

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
})

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = signInSchema.parse(credentials)
          const hashedPassword = hash(password)

          const users = await db
            .select({
              email: schema.users.email,
              password: schema.users.password,
            })
            .from(schema.users)
            .where(
              and(
                eq(schema.users.email, email),
                eq(schema.users.password, hashedPassword),
              ),
            )
            .limit(1)

          const user = users[0]
          if (!users) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.")
          }

          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }

          throw error
        }
      },
      credentials: {
        email: {},
        password: {},
      },
    }),
  ],
})
