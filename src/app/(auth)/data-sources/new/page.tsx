import { redirect } from "next/navigation"
import { db, schema } from "@/app/lib/db"
import { get } from "@/app/lib/formData"
import { DataSourceForm } from "../DataSourceForm"

export default function Page() {
  async function create(formData: FormData) {
    "use server"

    await db.insert(schema.dataSources).values({
      database: get(formData, "database"),
      description: get(formData, "description"),
      host: get(formData, "host"),
      id: crypto.randomUUID(),
      name: get(formData, "name"),
      password: get(formData, "password"),
      port: parseInt(get(formData, "port", "0")),
      type: get(formData, "type") as "mysql" | "postgres",
      username: get(formData, "username"),
    })

    redirect("/data-sources")
  }

  return <DataSourceForm action={create} />
}
