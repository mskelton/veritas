import { client, db, schema } from "../src/app/lib/db"
import { encrypt } from "../src/app/lib/encryption"

await db.insert(schema.dataSources).values({
  database: "test-postgres-a",
  description: "Test Postgres A",
  host: "localhost",
  id: crypto.randomUUID(),
  name: "Test A",
  password: encrypt("password-a"),
  port: 5433,
  type: "postgres",
  username: "test-a",
})

await db.insert(schema.dataSources).values({
  database: "test-postgres-b",
  description: "Test Postgres B",
  host: "localhost",
  id: crypto.randomUUID(),
  name: "Test B",
  password: encrypt("password-b"),
  port: 5434,
  type: "postgres",
  username: "test-b",
})

await db.insert(schema.facts).values({
  id: crypto.randomUUID(),
  name: "Has Authors",
  query: "select * from authors",
  type: "boolean",
})

await db.insert(schema.facts).values({
  id: crypto.randomUUID(),
  name: "Authors starting with 'M'",
  query: "select * from authors\nwhere name like 'M%'",
  type: "count",
})

await client.end()
