import { eq } from "drizzle-orm"
import { dataSources, db } from "../db"

export async function getDataSource(id: string) {
  const rows = await db
    .select({
      database: dataSources.database,
      description: dataSources.description,
      host: dataSources.host,
      id: dataSources.id,
      name: dataSources.name,
      password: dataSources.password,
      port: dataSources.port,
      type: dataSources.type,
      username: dataSources.username,
    })
    .from(dataSources)
    .where(eq(dataSources.id, id))

  return rows[0]
}
