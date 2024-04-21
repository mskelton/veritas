import Link from "next/link"
import { PageHeader } from "@/app/components/PageHeader"
import { ColumnDef, Table } from "@/app/components/Table"
import { db, schema } from "@/app/lib/db"

function getDataSources() {
  return db
    .select({
      host: schema.dataSources.host,
      id: schema.dataSources.id,
      name: schema.dataSources.name,
      type: schema.dataSources.type,
      username: schema.dataSources.username,
    })
    .from(schema.dataSources)
}

type DataSource = Awaited<ReturnType<typeof getDataSources>>[number]

const columnDefs: ColumnDef<DataSource>[] = [
  {
    emphasize: true,
    key: "name",
    title: "Name",
  },
  {
    key: "type",
    render: ({ value }) => (value === "postgres" ? "PostgreSQL" : "MySQL"),
    title: "Type",
  },
  {
    key: "host",
    title: "Host",
  },
  {
    key: "username",
    title: "Username",
  },
  {
    align: "right",
    emphasize: true,
    hideTitle: true,
    key: "actions",
    render: ({ row }) => (
      <Link
        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
        href={`/data-sources/${row.id}`}
      >
        Edit
        <span className="sr-only">, {row.name}</span>
      </Link>
    ),
    title: "Actions",
  },
]

export default async function Page() {
  const rows = await getDataSources()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader
        actions={
          <Link
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/data-sources/new"
          >
            Add data source
          </Link>
        }
        subtitle="A list of connected data sources you can assert facts against."
        title="Data Sources"
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
