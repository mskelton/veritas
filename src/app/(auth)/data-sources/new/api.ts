"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import crypto from "node:crypto"
import { db, schema } from "@/lib/db"
import { encrypt } from "@/lib/encryption"
import { get } from "@/lib/formData"

export async function createDataSource(formData: FormData) {
  await db.insert(schema.dataSources).values({
    database: get(formData, "database"),
    description: get(formData, "description"),
    host: get(formData, "host"),
    id: crypto.randomUUID(),
    name: get(formData, "name"),
    password: encrypt(get(formData, "password")),
    port: parseInt(get(formData, "port", "0")),
    type: get(formData, "type") as "mysql" | "postgres",
    username: get(formData, "username"),
  })

  revalidateTag("dataSource:all")
  redirect("/data-sources")
}
