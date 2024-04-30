"use client"

import { useFormState } from "react-dom"
import { FactValue } from "@/components/FactValue"
import { PageHeader } from "@/components/PageHeader"
import { SubmitButton } from "@/components/SubmitButton"
import { TextField } from "@/components/TextField"
import { runQueryAction } from "@/lib/query"
import { Label } from "@/ui/label"
import { Table } from "@/ui/table"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import { QueryError } from "./QueryError"

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
            <form action={formAction} className="mb-8">
              <input name="type" type="hidden" value="boolean" />

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
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data Source</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {state.results.map((result) => (
                        <TableRow key={result.dataSource.id}>
                          <TableCell>{result.dataSource.name}</TableCell>
                          <TableCell>
                            <FactValue value={result.value} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
