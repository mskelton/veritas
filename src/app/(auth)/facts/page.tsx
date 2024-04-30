import Link from "next/link"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/ui/button"
import { getFacts } from "./api"
import { FactsTable } from "./FactsTable"

export default async function Page() {
  const rows = await getFacts()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader
        actions={
          <Button asChild>
            <Link href="/facts/new">New Fact</Link>
          </Button>
        }
        subtitle="A list of facts that can be used for analysis."
        title="Facts"
      />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <FactsTable rows={rows} />
          </div>
        </div>
      </div>
    </div>
  )
}
