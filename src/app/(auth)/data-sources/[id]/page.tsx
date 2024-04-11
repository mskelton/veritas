import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { getDataSource } from "@/app/lib/api/dataSources"
import { dataSources, db } from "@/app/lib/db"
import { get } from "@/app/lib/formData"
import { DataSourceForm } from "../DataSourceForm"

export default async function Page({ params }: { params: { id: string } }) {
  const dataSource = await getDataSource(params.id)

  async function update(formData: FormData) {
    "use server"

    await db
      .update(dataSources)
      .set({
        database: get(formData, "database"),
        description: get(formData, "description"),
        host: get(formData, "host"),
        name: get(formData, "name"),
        password: get(formData, "password"),
        port: parseInt(get(formData, "port", "0")),
        type: get(formData, "type") as "mysql" | "postgres",
        username: get(formData, "username"),
      })
      .where(eq(dataSources.id, params.id))

    redirect("/data-sources")
  }

  return <DataSourceForm action={update} defaultValues={dataSource} />
}
