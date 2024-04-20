"use client"

import { useFormState } from "react-dom"
import { Label } from "@/app/components/Label"
import { PageHeader } from "@/app/components/PageHeader"
import { SubmitButton } from "@/app/components/SubmitButton"
import { Table } from "@/app/components/Table"
import { ColumnDef } from "@/app/components/Table"
import { TextField } from "@/app/components/TextField"
import { QueryError } from "./QueryError"
import { runQueryAction, RunQueryResult } from "./runQuery"

const columnDefs: ColumnDef<RunQueryResult>[] = [
  {
    emphasize: true,
    key: "dataSource.name",
    title: "Data Source",
  },
  {
    key: "value",
    render: ({ value }) =>
      value === true ? (
        <span className="text-green-500">Yes</span>
      ) : value === false ? (
        <span className="text-red-500">No</span>
      ) : (
        (value as number)
      ),
    title: "Result",
  },
]

export default function Page() {
  const [state, formAction] = useFormState(runQueryAction, {})

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader
        subtitle="Test and develop queries to build your facts."
        title="Query Playground"
      />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <form action={formAction} className="mb-4">
              <TextField
                defaultValue="select * from authors"
                isMultiline
                label="Query"
                name="query"
              />

              <SubmitButton className="mt-4">Run Query</SubmitButton>
            </form>

            {state.error ? (
              <QueryError error={state.error} />
            ) : state.results ? (
              <>
                <Label className="mb-2">Results</Label>
                <Table columnDefs={columnDefs} rows={state.results} />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
