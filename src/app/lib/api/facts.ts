import { eq } from "drizzle-orm"
import { db, schema } from "../db"

export async function getFact(id: string) {
  const rows = await db
    .select({
      description: schema.facts.description,
      id: schema.facts.id,
      name: schema.facts.name,
      query: schema.facts.query,
      type: schema.facts.type,
    })
    .from(schema.facts)
    .where(eq(schema.facts.id, id))

  return rows[0]
}
