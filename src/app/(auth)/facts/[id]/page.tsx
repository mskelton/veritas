import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { getFact } from "@/lib/api/facts"
import { db, schema } from "@/lib/db"
import { FactType } from "@/lib/db/schema"
import { get } from "@/lib/formData"
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
        type: get(formData, "type") as FactType,
      })
      .where(eq(schema.facts.id, params.id))

    revalidateTag("fact:all")
    redirect("/facts")
  }

  return <FactForm action={update} defaultValues={fact} />
}
