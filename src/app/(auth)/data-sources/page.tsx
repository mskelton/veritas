import Link from "next/link"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/ui/button"
import { getDataSources } from "./api"
import { DataSourcesTable } from "./DataSourcesTable"

export default async function Page() {
  const rows = await getDataSources()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader
        actions={
          <Button asChild>
            <Link href="/data-sources/new">Add data source</Link>
          </Button>
        }
        subtitle="A list of connected data sources you can assert facts against."
        title="Data Sources"
      />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <DataSourcesTable rows={rows} />
          </div>
        </div>
      </div>
    </div>
  )
}
