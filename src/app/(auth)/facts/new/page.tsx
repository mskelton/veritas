import { redirect } from "next/navigation"
import { db, schema } from "@/app/lib/db"
import { get } from "@/app/lib/formData"
import { FactForm } from "../FactForm"

export default function Page() {
  async function create(formData: FormData) {
    "use server"

    await db.insert(schema.facts).values({
      description: get(formData, "description"),
      id: crypto.randomUUID(),
      name: get(formData, "name"),
      query: get(formData, "query"),
      type: get(formData, "type") as "boolean" | "count",
    })

    redirect("/facts")
  }

  return <FactForm action={create} />
}
