import Link from "next/link"
import { PageHeader } from "@/app/components/PageHeader"
import { ColumnDef, Table } from "@/app/components/Table"
import { db, schema } from "@/app/lib/db"

function getFacts() {
  return db
    .select({
      description: schema.facts.description,
      id: schema.facts.id,
      name: schema.facts.name,
      query: schema.facts.query,
      type: schema.facts.type,
    })
    .from(schema.facts)
}

type Fact = Awaited<ReturnType<typeof getFacts>>[number]

const columnDefs: ColumnDef<Fact>[] = [
  {
    emphasize: true,
    key: "name",
    title: "Name",
  },
  {
    key: "type",
    render: ({ value }) => (value === "boolean" ? "Yes/No" : "Count"),
    title: "Type",
  },
  {
    emphasize: true,
    key: "description",
    title: "Description",
  },
  {
    align: "right",
    emphasize: true,
    hideTitle: true,
    key: "actions",
    render: ({ row }) => (
      <Link
        className="text-indigo-600 hover:text-indigo-900"
        href={`/facts/${row.id}`}
      >
        Edit
        <span className="sr-only">, {row.name}</span>
      </Link>
    ),
    title: "Actions",
  },
]

export default async function Page() {
  const rows = await getFacts()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader
        actions={
          <Link
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/facts/new"
          >
            Add fact
          </Link>
        }
        subtitle="A list of facts that can be used for analysis."
        title="Facts"
      />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Table columnDefs={columnDefs} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  )
}
