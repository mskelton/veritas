"use server"

import { desc, eq } from "drizzle-orm"
import { revalidateTag, unstable_cache } from "next/cache"
import { db, schema } from "@/lib/db"

export const getDataSources = unstable_cache(
  () => {
    return db
      .select({
        host: schema.dataSources.host,
        id: schema.dataSources.id,
        name: schema.dataSources.name,
        type: schema.dataSources.type,
        username: schema.dataSources.username,
      })
      .from(schema.dataSources)
      .orderBy(desc(schema.dataSources.createdAt))
  },
  ["dataSource:all"],
  { tags: ["dataSource:all"] },
)

export const deleteDataSource = async (id: string) => {
  await db.delete(schema.dataSources).where(eq(schema.dataSources.id, id))
  revalidateTag("dataSource:all")
}
