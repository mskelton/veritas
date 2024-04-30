import postgres from "postgres"

declare let globalThis: {
  connections?: Map<string, postgres.Sql>
}

let connections: Map<string, postgres.Sql>

if (process.env.NODE_ENV !== "production") {
  if (!globalThis.connections) {
    globalThis.connections = new Map()
  }

  connections = globalThis.connections
} else {
  connections = new Map()
}

const options: postgres.Options<Record<string, never>> = {
  max: 1,
}

export function acquire(url: string) {
  if (!connections.has(url)) {
    connections.set(url, postgres(url, options))
  }

  return connections.get(url)!
}
