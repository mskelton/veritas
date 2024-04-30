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
import { deleteDataSource, type getDataSources } from "./api"

type DataSource = Awaited<ReturnType<typeof getDataSources>>[number]

const columns: ColumnDef<DataSource>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => (row.type === "postgres" ? "PostgreSQL" : "MySQL"),
    header: "Type",
    id: "type",
  },
  {
    accessorKey: "host",
    header: "Host",
  },
  {
    accessorKey: "username",
    header: "Username",
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
                <Link href={`/data-sources/${row.original.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => deleteDataSource(row.original.id)}
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

export interface DataSourcesTableProps {
  rows: DataSource[]
}

export function DataSourcesTable({ rows }: DataSourcesTableProps) {
  return <DataTable columns={columns} data={rows} />
}
