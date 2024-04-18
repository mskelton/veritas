"use client"

import { useFormState } from "react-dom"
import { Code } from "@/app/components/Code"
import { Label } from "@/app/components/Label"
import { SubmitButton } from "@/app/components/SubmitButton"
import { TextField } from "@/app/components/TextField"
import { QueryError } from "./QueryError"
import { runQueryAction } from "./runQuery"

export default function Page() {
  const [state, formAction] = useFormState(runQueryAction, {})

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Query Playground
          </h1>

          <p className="mt-2 text-sm text-gray-700">
            Test and develop queries to build your facts.
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <form action={formAction} className="mb-4">
              <TextField
                defaultValue="select * from facts"
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
                <Code isMultiline>
                  {JSON.stringify(state.results, null, 2)}
                </Code>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
