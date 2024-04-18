import { eq } from "drizzle-orm"
import { db, facts } from "../db"

export async function getFact(id: string) {
  const rows = await db
    .select({
      description: facts.description,
      id: facts.id,
      name: facts.name,
      query: facts.query,
      type: facts.type,
    })
    .from(facts)
    .where(eq(facts.id, id))

  return rows[0]
}
