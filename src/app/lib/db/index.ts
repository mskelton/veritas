import "server-only"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

declare let globalThis: {
  client?: ReturnType<typeof postgres>
}

export let client: ReturnType<typeof postgres>

if (process.env.NODE_ENV !== "production") {
  if (!globalThis.client) {
    globalThis.client = postgres(process.env.DATABASE_URL!)
  }

  client = globalThis.client
} else {
  client = postgres(process.env.DATABASE_URL!)
}

export const db = drizzle(client)

export * as schema from "./schema"
