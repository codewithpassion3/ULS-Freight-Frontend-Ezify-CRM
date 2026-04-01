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
import { CheckCircle, CircleCheck, Edit, MoreVertical, Trash2 } from "lucide-react"
import Link from "next/link"

export const columns: ColumnDef<any>[] = [
  //   addresses
  // : 
  // (2) [{…}, {…}]
  // createdAt
  // : 
  // "2026-03-31T20:58:21.969Z"
  // createdBy
  // : 
  // 1
  // description
  // : 
  // null
  // id
  // : 
  // 3
  // insurance
  // : 
  // 3
  // lineItems
  // : 
  // {id: 3, type: 'PALLET', measurementUnit: 'IMPERIAL', dangerousGoods: false, stackable: true, …}
  // palletServices
  // : 
  // {id: 2, dangerousGoods: false, stackable: false, limitedAccess: true, appointmentDelivery: true, …}
  // quoteId
  // : 
  // "F778537D"
  // quoteType
  // : 
  // "STANDARD"
  // shipmentType
  // : 
  // "PALLET"
  // signature
  // : 
  // null
  // spotDetails
  // : 
  // null
  // spotFtlServices
  // : 
  // null
  // spotLtlServices
  // : 
  // null
  // standardFTLService
  // : 
  // null
  // status
  // : 
  // "DRAFT"
  // updatedAt
  // : 
  // "2026-03-31T20:58:21.969Z"
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
          {row.original.quoteId}
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
      // show time first and date after and use 12 hour format
      const createdAt = row.original.createdAt
      const dateObj = new Date(createdAt);

      // Format time in 12-hour format
      const time = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // Format date
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return (
        <div className="leading-tight whitespace-nowrap">
          {time}<br />
          <span className="text-muted-foreground">{formattedDate}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "shipFrom",
    header: "Ship From",
    cell: ({ row }) => {
      return (
        <span className="text-[#0070c0] font-medium whitespace-nowrap">
          {/* {row.original.addresses[0].address.city} */}
          Lahore
        </span>
      )
    },
  },
  {
    accessorKey: "shipTo",
    header: "Ship To",
    cell: ({ row }) => {
      return (
        <span className="text-[#0070c0] font-medium whitespace-nowrap">
          {/* {row.original.addresses[1].address.city} */}
          Karachi
        </span>
      )
    },
  },
  {
    accessorKey: "packagingDetails",
    header: "Packaging Details",
    cell: ({ row }) => {
      const quoteType = row.original.quoteType.toLowerCase()
      const shipmentType = row.original.shipmentType.toLowerCase()
      return (
        <div className="leading-tight capitalize">
          {quoteType} - {shipmentType}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <CircleCheck size={14} /> Book Now
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link className="flex gap-2 items-center w-full" href={`/quote/create?id=${row.original.id}`}>
                  <Edit size={14} /> Edit
                </Link>
              </DropdownMenuItem>
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
