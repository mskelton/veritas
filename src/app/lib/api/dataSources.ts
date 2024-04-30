import { eq } from "drizzle-orm"
import { db, schema } from "../db"

export async function getDataSource(id: string) {
  const rows = await db
    .select({
      database: schema.dataSources.database,
      description: schema.dataSources.description,
      host: schema.dataSources.host,
      id: schema.dataSources.id,
      name: schema.dataSources.name,
      port: schema.dataSources.port,
      type: schema.dataSources.type,
      username: schema.dataSources.username,
    })
    .from(schema.dataSources)
    .where(eq(schema.dataSources.id, id))

  return rows[0]
}
