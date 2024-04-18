/* eslint-disable sort/object-properties */
import { integer, pgTable, text } from "drizzle-orm/pg-core"

export const dataSources = pgTable("data_sources", {
  id: text("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  type: text("type", { enum: ["postgres", "mysql"] }),
  host: text("host"),
  username: text("username"),
  password: text("password"),
  port: integer("port"),
  database: text("database"),
})

export const facts = pgTable("facts", {
  id: text("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  type: text("type", { enum: ["boolean", "count"] }),
  query: text("query"),
})
