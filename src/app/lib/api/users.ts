import { eq } from "drizzle-orm"
import { db, schema } from "../db"

export async function getUser(id: string) {
  const rows = await db
    .select({
      email: schema.users.email,
      id: schema.users.id,
      name: schema.users.name,
    })
    .from(schema.users)
    .where(eq(schema.users.id, id))

  return rows[0]
}
