"use server"

import { db, schema } from "@/app/lib/db"
import { SerializableError } from "@/app/lib/errors"
import { runQuery } from "@/app/lib/query"
import { buildDataSourceURL } from "@/app/lib/query/url"

function getDataSources() {
  return db
    .select({
      database: schema.dataSources.database,
      host: schema.dataSources.host,
      id: schema.dataSources.id,
      name: schema.dataSources.name,
      password: schema.dataSources.password,
      port: schema.dataSources.port,
      type: schema.dataSources.type,
      username: schema.dataSources.username,
    })
    .from(schema.dataSources)
}

export type RunQueryResult = {
  dataSource: Pick<
    Awaited<ReturnType<typeof getDataSources>>[number],
    "id" | "name"
  >
  value: number | boolean
}

export type RunQueryFormState = {
  error?: SerializableError
  results?: RunQueryResult[]
}

export async function runQueryAction(
  _: RunQueryFormState,
  formData: FormData,
): Promise<RunQueryFormState> {
  const dataSources = await getDataSources()

  try {
    // TODO
    const type = "boolean"
    const query = formData.get("query") as string
    const results = await Promise.all(
      dataSources.map(async (dataSource) => {
        const results = await runQuery({
          query,
          url: buildDataSourceURL(dataSource),
        })

        const count = parseInt(results[0]?.count ?? "0")

        return {
          dataSource: {
            id: dataSource.id,
            name: dataSource.name,
          },
          value: type === "boolean" ? !!count : count,
        }
      }),
    )

    return { results }
  } catch (e) {
    return {
      error:
        e instanceof Error
          ? { message: e.message, stack: e.stack }
          : { message: "Internal server error" },
    }
  }
}
