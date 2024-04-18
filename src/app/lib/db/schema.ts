/* eslint-disable sort/object-properties */
import { integer, pgTable, text } from "drizzle-orm/pg-core"

export const dataSources = pgTable("data_sources", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type", { enum: ["postgres", "mysql"] }).notNull(),
  host: text("host").notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  port: integer("port").notNull(),
  database: text("database").notNull(),
})

export const facts = pgTable("facts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type", { enum: ["boolean", "count"] }).notNull(),
  query: text("query").notNull(),
})
