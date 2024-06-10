"use server"

import { desc, eq } from "drizzle-orm"
import { revalidateTag, unstable_cache } from "next/cache"
import { db, schema } from "@/lib/db"

export const getUsers = unstable_cache(
  () => {
    return db
      .select({
        email: schema.users.email,
        id: schema.users.id,
        name: schema.users.name,
      })
      .from(schema.users)
      .orderBy(desc(schema.users.createdAt))
  },
  ["user:all"],
  { tags: ["user:all"] },
)

export const deleteUser = async (id: string) => {
  await db.delete(schema.users).where(eq(schema.users.id, id))
  revalidateTag("user:all")
}
