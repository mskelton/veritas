import { SerializableError } from "./runQuery"

export interface QueryErrorProps {
  error: SerializableError
}

export function QueryError({ error }: QueryErrorProps) {
  return (
    <pre className="bg-red-300 border-red-500 border rounded-md p-4 text-xs">
      <code>{error.message}</code>
    </pre>
  )
}
