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
import { CheckCircle, CircleCheck, Edit, Heart, MoreVertical, Trash2 } from "lucide-react"
import Link from "next/link"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { addToFavorite, deleteQuote, removeFromFavorite } from "@/api/services/quotes.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { normalText } from "../../packages/AddPackage"
import Image from "next/image"

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
    accessorKey: "carrier",
    header: "Carrier",
    cell: ({ row }) => {
      return (
        <div className="h-24 w-24 p-2 flex justify-center items-center">
          <Image src={"/FedExFreight.svg"} width={100} height={100} alt="Carrier Logo" />
        </div>
      )
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction #",
    cell: ({ row }) => {
      return (
        <span className="text-[#0070c0] font-medium whitespace-nowrap">
          {row.original.transactionId}
        </span>
      )
    },
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking #/BOL #",
    cell: ({ row }) => {
      return <span className="text-foreground whitespace-nowrap">{row.original.trackingNumber}</span>
    },
  },
  {
    accessorKey: "shipDate",
    header: "Ship Date",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = normalText(row.original.status)
      return (
        <div className="leading-tight capitalize">
          {status}
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
      const mutationAddToFavorite = useMutation({
        mutationFn: (id: string) => addToFavorite(id),
        onSuccess: () => {
          toast.success("Contact added to favorite successfully")
          queryClient.invalidateQueries({ queryKey: ["quotes"] })
        },
        onError: (error: AxiosError<ApiError>) => {
          toast.error(error.response?.data.message)
        }
      })
      const mutationRemoveFromFavorite = useMutation({
        mutationFn: (id: string) => removeFromFavorite(id),
        onSuccess: () => {
          toast.success("Contact removed from favorite successfully")
          queryClient.invalidateQueries({ queryKey: ["quotes"] })
        },
        onError: (error: AxiosError<ApiError>) => {
          toast.error(error.response?.data.message)
        }
      })
      const handleDeleteQuote = (id: string) => {
        mutation.mutate(id)
      }
      const handleAddToFavorite = (id: string) => {
        mutationAddToFavorite.mutate(id)
      }
      const handleRemoveFromFavorite = (id: string) => {
        mutationRemoveFromFavorite.mutate(id)
      }
      const isFavorite = true
      return (
        <div className="flex items-center gap-4 w-max">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical size={16} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-max">
              <DropdownMenuItem className="cursor-pointer">
                <CircleCheck size={14} /> Book Now
              </DropdownMenuItem>
              {/* {isFavorite ? <DropdownMenuItem className="cursor-pointer w-max" onClick={() => {
                handleRemoveFromFavorite(row.original.id)
              }}>
                <Heart fill="black" size={14} /> Remove from Favorites
              </DropdownMenuItem> : 
              <DropdownMenuItem className="cursor-pointer w-max" onClick={() => {
                handleAddToFavorite(row.original.id)
              }}>
                <Heart size={14} /> Add to Favorites
              </DropdownMenuItem>} */}
              <DropdownMenuItem className="cursor-pointer w-max" onClick={() => {
                handleAddToFavorite(row.original.id)
              }}>
                <Heart size={14} /> Add to Favorites
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link className="flex gap-2 items-center w-full" href={row.original.shipment ? `/shipment?id=${row.original.id}` : `/quote?id=${row.original.id}`}>
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
