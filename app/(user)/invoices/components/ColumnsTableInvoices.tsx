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
    accessorKey: "invoiceNumber",
    header: "Invoice #",
    cell: ({ row }) => {
      // Use trackingNumber or fallback
      // console.log("MY INVOICES:", row.original);
      const invoiceNumber = row.original.trackingNumber || `FC${Math.floor(Math.random() * 100000000)}`;
      return (
        <span className="text-primary font-medium whitespace-nowrap">
          {invoiceNumber}
        </span>
      )
    },
  },
  {
    accessorKey: "invoiceCreatedDate",
    header: "Invoice Created Date",
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
    accessorKey: "invoiceAge",
    header: "Invoice Age",
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
      // Mocking due date
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 15);
      const formattedDueDate = dueDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      return (
        <div className="leading-tight whitespace-nowrap">
          <div className="flex items-center text-primary font-medium">
            <Calendar className="w-3 h-3 mr-1" /> Upcoming
          </div>
          <span className="text-xs text-muted-foreground">Due {formattedDueDate}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "invoiceAmount",
    header: "Invoice Amount",
    cell: ({ row }) => {
      const amount = (Math.random() * 500 + 50).toFixed(2);
      const currency = Math.random() > 0.5 ? "CAD" : "USD";
      return <span className="whitespace-nowrap">${amount} {currency}</span>
    },
  },
  {
    accessorKey: "credits",
    header: "Credits",
    cell: ({ row }) => {
      return <span className="whitespace-nowrap">$0.00</span>
    },
  },
  {
    accessorKey: "balanceDue",
    header: "Balance Due",
    cell: ({ row }) => {
      // Mocking same as amount
      const amount = (Math.random() * 500 + 50).toFixed(2);
      const currency = Math.random() > 0.5 ? "CAD" : "USD";
      return <span className="font-semibold whitespace-nowrap">${amount} {currency}</span>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 w-max">
          <Link className="flex gap-1 items-center text-primary hover:underline text-sm font-medium" href={`/invoices/single?id=${row.original.id || 'FC15017348'}`}>
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
