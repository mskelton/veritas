import { Suspense } from "react"
import { FactValue } from "@/components/FactValue"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { runQuery, RunQueryResult } from "@/lib/query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table"
import { FactErrorBoundary } from "./FactErrorBoundary"
import type { getFacts } from "./page"

type Fact = Awaited<ReturnType<typeof getFacts>>[number]

export function FactCard({ fact }: { fact: Fact }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{fact.name}</CardTitle>
        <CardDescription>{fact.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <FactErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <FactCardContent fact={fact} />
          </Suspense>
        </FactErrorBoundary>
      </CardContent>
    </Card>
  )
}

async function FactCardContent({ fact }: { fact: Fact }) {
  const { results } = await runQuery(fact.type, fact.query)

  return <FactTable results={results} />
}

function FactGraph({ results }: { results: RunQueryResult[] }) {
  return <div>Graph</div>
}

function FactTable({ results }: { results: RunQueryResult[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data Source</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.dataSource.id}>
            <TableCell>{result.dataSource.name}</TableCell>
            <TableCell>
              <FactValue value={result.value} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
