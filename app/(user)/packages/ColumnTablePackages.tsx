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
import { deletePackage } from "@/api/services/packages.api"
import AddPackage from "./AddPackage"
import { useState } from "react"

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
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            return (
                <span className="text-[#0070c0] font-medium whitespace-nowrap">
                    {row.original.type}
                </span>
            )
        },
    },
    {
        accessorKey: "dimensions",
        header: "Dimensions",
        cell: ({ row }) => {
            const unit = row.original.measurementUnit === "IMPERIAL" ? "in" : "cm"
            return <span className="text-foreground whitespace-nowrap font-semibold">L:   {row.original.length} {unit} x W:{row.original.width} {unit} x H:{row.original.height} {unit}</span>
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const queryClient = useQueryClient()
            const mutation = useMutation({
                mutationFn: (id: string) => deletePackage(id),
                onSuccess: () => {
                    toast.success("Package deleted successfully")
                    queryClient.invalidateQueries({ queryKey: ["packages"] })
                },
                onError: (error: AxiosError<ApiError>) => {
                    toast.error(error.response?.data.message)
                }
            })

            const handleDeletePackage = (id: string) => {
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
                                <AddPackage
                                        shipmentType={row.original.type}
                                    >
                                        <Button variant="link" type="button">
                                            <Edit /> Edit Package
                                        </Button>
                                    </AddPackage>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => handleDeletePackage(row.original.id)}>
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
