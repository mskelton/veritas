import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { db, schema } from "@/lib/db"
import { FactType } from "@/lib/db/schema"
import { get } from "@/lib/formData"
import { FactForm } from "../FactForm"

export default function Page() {
  async function create(formData: FormData) {
    "use server"

    await db.insert(schema.facts).values({
      description: get(formData, "description"),
      id: crypto.randomUUID(),
      name: get(formData, "name"),
      query: get(formData, "query"),
      type: get(formData, "type") as FactType,
    })

    revalidateTag("fact:all")
    redirect("/facts")
  }

  return <FactForm action={create} />
}
