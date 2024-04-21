import clsx from "clsx"
import { get } from "./Table.utils"

export interface RenderParams<Row, ColumnKey extends keyof Row> {
  row: Row
  value: Row[ColumnKey]
}

export interface ColumnDef<Row, ColumnKey extends keyof Row = keyof Row> {
  /**
   * Column alignment
   *
   * @default "left"
   */
  align?: "center" | "left" | "right"
  /** Emphasize this column with bold text. */
  emphasize?: boolean
  /** Hides the title by displaying the text only for screen readers. */
  hideTitle?: boolean
  /** The key in the row data to pull the value from. */
  // eslint-disable-next-line @typescript-eslint/ban-types
  key: ColumnKey | (string & {})
  /** Custom render function for this column. This should be used sparingly. */
  render?: (params: RenderParams<Row, ColumnKey>) => React.ReactNode
  /** The column title */
  title: string
}

export interface TableProps<Row> {
  columnDefs: ColumnDef<Row, keyof Row>[]
  /**
   * The key to use for each row.
   *
   * @default "id"
   */
  rowKey?: string
  rows: Row[]
}

export function Table<Row>({
  columnDefs,
  rowKey = "id",
  rows,
}: TableProps<Row>) {
  return (
    <div className="overflow-hidden shadow ring-1 ring-gray-200 dark:ring-zinc-700 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-700">
        <thead className="bg-gray-50 dark:bg-zinc-800">
          <tr>
            {columnDefs.map((column, i) => (
              <th
                key={column.key as string}
                className={clsx(
                  "py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100",
                  i === 0 ? "pl-4 pr-3 sm:pl-6" : "px-3",
                  i === columnDefs.length - 1 && "pr-4 sm:pr-6",
                )}
                scope="col"
              >
                {column.hideTitle ? (
                  <span className="sr-only">{column.title}</span>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
          {rows.map((row) => (
            <tr key={row[rowKey as keyof typeof row] as string}>
              {columnDefs.map((column, i) => {
                const value = get(row, column.key)

                return (
                  <td
                    key={column.key as string}
                    className={clsx(
                      "whitespace-nowrap py-4 text-sm",
                      i === 0
                        ? "text-gray-900 dark:text-gray-100 sm:pl-6"
                        : "px-3 text-gray-500 dark:text-gray-400",
                      i === columnDefs.length - 1 && "sm:pr-6",
                      column.align === "right" && "text-right",
                      column.align === "center" && "text-center",
                      column.emphasize && "font-medium",
                    )}
                  >
                    {column.render
                      ? column.render({ row, value: value as any })
                      : (value as string)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
