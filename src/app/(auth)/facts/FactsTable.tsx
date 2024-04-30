"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import React from "react"
import { DataTable } from "@/components/DataTable"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import type { getFacts } from "../page"
import { deleteFact } from "./api"

type Fact = Awaited<ReturnType<typeof getFacts>>[number]

const columns: ColumnDef<Fact>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => (row.type === "boolean" ? "Yes/No" : "Count"),
    header: "Type",
    id: "type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    cell: ({ row }) => {
      return (
        <div className="-my-3 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0" variant="ghost">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/facts/${row.original.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => deleteFact(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    id: "actions",
  },
]

export interface FactsTableProps {
  rows: Fact[]
}

export function FactsTable({ rows }: FactsTableProps) {
  return <DataTable columns={columns} data={rows} />
}
