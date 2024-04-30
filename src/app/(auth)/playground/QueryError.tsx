import { SerializableError } from "@/lib/errors"

export interface QueryErrorProps {
  error: SerializableError
}

export function QueryError({ error }: QueryErrorProps) {
  return (
    <pre className="rounded-md border border-red-500 bg-red-300 p-4 text-xs">
      <code>{error.message}</code>
    </pre>
  )
}
