/** @type { import("drizzle-kit").Config } */
const config = {
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  driver: "libsql",
  schema: "./src/app/lib/db/schema.ts",
}

export default config
