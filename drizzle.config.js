/** @type {import("drizzle-kit").Config} */
const config = {
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  driver: "pg",
  schema: "./src/app/lib/db/schema.ts",
}

export default config
