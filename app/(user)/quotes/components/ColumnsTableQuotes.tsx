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
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteQuote } from "@/api/services/quotes.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { normalText } from "../../packages/AddPackage"

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
      const quoteType = normalText(row.original.quoteType)
      const shipmentType = normalText(row.original.shipmentType)
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
      const queryClient = useQueryClient()
      const mutation = useMutation({
        mutationFn: (id: string) => deleteQuote(id),
        onSuccess: () => {
          toast.success("Contact deleted successfully")
          queryClient.invalidateQueries({ queryKey: ["quotes"] })
        },
        onError: (error: AxiosError<ApiError>) => {
          toast.error(error.response?.data.message)
        }
      })

      const handleDeleteQuote = (id: string) => {
        mutation.mutate(id)
      }
      return (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical size={16} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <CircleCheck size={14} /> Book Now
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link className="flex gap-2 items-center w-full" href={row.original.shipment ? `/shipment/create?id=${row.original.id}` : `/quote/create?id=${row.original.id}`}>
                  <Edit size={14} /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => handleDeleteQuote(row.original.id)}>
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
