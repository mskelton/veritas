import { acquire } from "./connections"

type RunQueryOptions = {
  url: string
}

export function runQuery(query: string, { url }: RunQueryOptions) {
  const sql = acquire(url)

  return sql.unsafe(query)
}
