"use server"

import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { db, schema } from "@/lib/db"
import { get } from "@/lib/formData"

export async function updateUser(formData: FormData) {
  await db
    .update(schema.users)
    .set({
      email: get(formData, "email"),
      name: get(formData, "name"),
    })
    .where(eq(schema.users.id, get(formData, "id")))

  revalidateTag("user:all")
  redirect("/users")
}
