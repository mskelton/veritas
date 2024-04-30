"use server"

import { db, schema } from "@/lib/db"
import { SerializableError } from "@/lib/errors"
import { buildDataSourceURL } from "@/lib/query/url"
import { FactType } from "../db/schema"
import { decrypt } from "../encryption"
import { acquire } from "./connections"

type RunQueryOptions = {
  query: string
  url: string
}

function buildFactQuery(query: string) {
  return `
with sub as (
  ${query}
)
select count(1) as count
from sub
  `.trim()
}

function run({ query, url }: RunQueryOptions) {
  const sql = acquire(url)
  const compiled = buildFactQuery(query)

  return sql.unsafe(compiled)
}

async function getDataSources() {
  const dataSources = await db
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

  return dataSources.map((dataSource) => ({
    ...dataSource,
    password: decrypt(dataSource.password),
  }))
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

export async function runQuery(type: FactType, query: string) {
  const dataSources = await getDataSources()

  const results = await Promise.all(
    dataSources.map(async (dataSource) => {
      const results = await run({
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
}

export async function runQueryAction(
  _: RunQueryFormState,
  formData: FormData,
): Promise<RunQueryFormState> {
  try {
    return runQuery(
      formData.get("type") as FactType,
      formData.get("query") as string,
    )
  } catch (e) {
    return {
      error:
        e instanceof Error
          ? { message: e.message, stack: e.stack }
          : { message: "Internal server error" },
    }
  }
}
