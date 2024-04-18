import postgres from "postgres"

const connections = new Map<string, postgres.Sql>()

export function acquire(url: string) {
  if (!connections.has(url)) {
    connections.set(
      url,
      postgres(url, {
        max: 1,
      }),
    )
  }

  return connections.get(url)!
}
