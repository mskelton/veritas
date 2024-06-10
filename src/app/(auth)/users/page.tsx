import Link from "next/link"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/ui/button"
import { getUsers } from "./api"
import { UsersTable } from "./UsersTable"

export default async function Page() {
  const rows = await getUsers()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader
        actions={
          <Button asChild>
            <Link href="/users/new">Add user</Link>
          </Button>
        }
        subtitle="Users who can access Veritas."
        title="Users"
      />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <UsersTable rows={rows} />
          </div>
        </div>
      </div>
    </div>
  )
}
