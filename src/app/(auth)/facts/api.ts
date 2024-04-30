"use server"

import { desc, eq } from "drizzle-orm"
import { revalidateTag, unstable_cache } from "next/cache"
import { db, schema } from "@/lib/db"

export const getFacts = unstable_cache(
  () => {
    return db
      .select({
        description: schema.facts.description,
        id: schema.facts.id,
        name: schema.facts.name,
        query: schema.facts.query,
        type: schema.facts.type,
      })
      .from(schema.facts)
      .orderBy(desc(schema.facts.createdAt))
  },
  ["fact:all"],
  { tags: ["fact:all"] },
)

export const deleteFact = async (id: string) => {
  await db.delete(schema.facts).where(eq(schema.facts.id, id))
  revalidateTag("fact:all")
}
