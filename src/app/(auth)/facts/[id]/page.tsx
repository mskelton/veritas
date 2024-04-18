import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { getFact } from "@/app/lib/api/facts"
import { db, schema } from "@/app/lib/db"
import { get } from "@/app/lib/formData"
import { FactForm } from "../FactForm"

export default async function Page({ params }: { params: { id: string } }) {
  const fact = await getFact(params.id)

  async function update(formData: FormData) {
    "use server"

    await db
      .update(schema.facts)
      .set({
        description: get(formData, "description"),
        name: get(formData, "name"),
        query: get(formData, "query"),
        type: get(formData, "type") as "boolean" | "count",
      })
      .where(eq(schema.facts.id, params.id))

    redirect("/facts")
  }

  return <FactForm action={update} defaultValues={fact} />
}
