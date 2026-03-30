"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CheckCircle, Edit, MoreVertical, Trash2 } from "lucide-react"

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span className="text-[#0070c0] font-medium whitespace-nowrap">
          {row.original.name}
        </span>
      )
    },
  },
  {
    accessorKey: "quoteId",
    header: "Quote ID",
    cell: ({ row }) => {
      return (
        <span className="text-[#0070c0] font-medium whitespace-nowrap">
          {row.original.quoteId}
        </span>
      )
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction #",
    cell: ({ row }) => {
      return <span className="text-foreground whitespace-nowrap">{row.original.transactionId}</span>
    },
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => {
      const parts = row.original.dateCreated.split('\n')
      return (
        <div className="leading-tight whitespace-nowrap">
          {parts[0]}<br />
          <span className="text-muted-foreground">{parts[1]}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "shipFrom",
    header: "Ship From",
  },
  {
    accessorKey: "shipTo",
    header: "Ship To",
  },
  {
    accessorKey: "packagingDetails",
    header: "Packaging Details",
    cell: ({ row }) => {
      const parts = row.original.packagingDetails.split('\n')
      return (
        <div className="leading-tight">
          {parts[0]}<br />
          {parts[1]}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-[#0070c0] font-medium hover:underline whitespace-nowrap">
            <Edit size={14} /> Edit
          </button>
          <button className="flex items-center gap-1 text-[#0070c0] font-medium hover:underline whitespace-nowrap">
            <CheckCircle size={14} /> Book Now
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreVertical size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-500 cursor-pointer">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
