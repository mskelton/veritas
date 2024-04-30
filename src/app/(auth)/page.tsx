import { desc } from "drizzle-orm"
import { db, schema } from "../lib/db"
import { FactCard } from "./FactCard"

export function getFacts() {
  return db
    .select({
      description: schema.facts.description,
      id: schema.facts.id,
      name: schema.facts.name,
      query: schema.facts.query,
      type: schema.facts.type,
    })
    .from(schema.facts)
    .orderBy(desc(schema.facts.createdAt))
}

export default async function Home() {
  const facts = await getFacts()

  return (
    <main className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
      {facts.map((fact) => (
        <FactCard key={fact.id} fact={fact} />
      ))}
    </main>
  )
}
