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

export function runQuery({ query, url }: RunQueryOptions) {
  const sql = acquire(url)
  const compiled = buildFactQuery(query)

  return sql.unsafe(compiled)
}
