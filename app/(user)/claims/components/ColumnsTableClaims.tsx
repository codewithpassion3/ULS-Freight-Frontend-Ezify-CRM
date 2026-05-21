"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, MoreVertical, Calendar } from "lucide-react"
import Link from "next/link"

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
    accessorKey: "claimNumber",
    header: "Claim #",
    cell: ({ row }) => {
      // Use trackingNumber or fallback
      const claimNumber = row.original.claimNumber || `CLM${Math.floor(Math.random() * 100000000)}`;
      return (
        <span className="text-primary font-medium whitespace-nowrap">
          {claimNumber}
        </span>
      )
    },
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking/BOL #",
    cell: ({ row }) => {
      const trackingNumber = row.original.trackingNumber || `TRK${Math.floor(Math.random() * 100000000)}`;
      return (
        <span className="text-primary font-medium whitespace-nowrap">
          {trackingNumber}
        </span>
      )
    },
  },
  {
    accessorKey: "claimDate",
    header: "Claim Date",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt ? new Date(row.original.createdAt) : new Date();
      const formattedDate = createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return <span className="whitespace-nowrap text-muted-foreground">{formattedDate}</span>
    },
  },
  {
    accessorKey: "claimAge",
    header: "Age",
    cell: ({ row }) => {
      // Mocking age
      const ageDays = Math.floor(Math.random() * 30) + 1;
      return <span className="whitespace-nowrap">{ageDays} Days</span>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      // Mocking status
      const statuses = ["Pending", "Approved", "Denied", "Paid"];
      const status = row.original.status || statuses[Math.floor(Math.random() * statuses.length)];
      
      let statusColor = "text-primary";
      if (status === "Approved" || status === "Paid") statusColor = "text-green-600";
      if (status === "Denied") statusColor = "text-red-600";
      if (status === "Pending") statusColor = "text-orange-500";
      
      return (
        <div className="leading-tight whitespace-nowrap flex items-center gap-1 font-medium">
          <span className={`${statusColor}`}>{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "claimAmount",
    header: "Claim Amount",
    cell: ({ row }) => {
      const amount = (Math.random() * 1500 + 100).toFixed(2);
      const currency = Math.random() > 0.5 ? "CAD" : "USD";
      return <span className="whitespace-nowrap font-medium">${amount} {currency}</span>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 w-max">
          <Link className="flex gap-1 items-center text-primary hover:underline text-sm font-medium" href={`/claims/single?id=${row.original.id || 'CLM15017348'}`}>
             <Eye size={14} /> View
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical size={16} className="cursor-pointer text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-max">
              <DropdownMenuItem className="cursor-pointer">
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Send via Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
