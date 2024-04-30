"use server"

import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { db, schema } from "@/lib/db"
import { encrypt } from "@/lib/encryption"
import { get } from "@/lib/formData"

export async function updateDataSource(formData: FormData) {
  const password = get(formData, "password")

  await db
    .update(schema.dataSources)
    .set({
      database: get(formData, "database"),
      description: get(formData, "description"),
      host: get(formData, "host"),
      name: get(formData, "name"),
      password: password ? encrypt(password) : undefined,
      port: parseInt(get(formData, "port", "0")),
      type: get(formData, "type") as "mysql" | "postgres",
      username: get(formData, "username"),
    })
    .where(eq(schema.dataSources.id, get(formData, "id")))

  revalidateTag("dataSource:all")
  redirect("/data-sources")
}
