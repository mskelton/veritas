/* eslint-disable sort/object-properties */
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const dataSources = sqliteTable("data_sources", {
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

export const facts = sqliteTable("facts", {
  id: text("id"),
})
