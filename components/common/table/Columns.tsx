import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"

export const columns: ColumnDef<any>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllRowsSelected(!!value)
                }
            />
        ),

        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    row.toggleSelected(!!value)
                }
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
    },

    {
        accessorKey: "email",
        header: "Email",
    },

    {
        id: "actions",
        cell: ({ row }) => {

            const contact = row.original

            return (
                <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="cursor-pointer!"
                            onClick={() => console.log("Edit", contact)}
                        >

                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-500 cursor-pointer!"
                            onClick={() => console.log("Delete", contact.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]