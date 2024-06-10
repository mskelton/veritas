"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import crypto from "node:crypto"
import { db, schema } from "@/lib/db"
import { hash } from "@/lib/encryption"
import { get } from "@/lib/formData"

export async function createUser(formData: FormData) {
  await db.insert(schema.users).values({
    email: get(formData, "email"),
    id: crypto.randomUUID(),
    name: get(formData, "name"),
    password: hash(get(formData, "password")),
  })

  revalidateTag("user:all")
  redirect("/users")
}
