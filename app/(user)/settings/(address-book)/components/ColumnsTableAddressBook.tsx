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
import { EditContactModal } from "../EditContactModal"
import { useState } from "react"
import { useDeleteContact } from "../hooks/useDeleteContact"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteContact } from "@/api/services/quotes.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"

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
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => {
      const companyName = row.original.companyName
      const contactName = row.original.contactName
      return (
        <div>
          <p>{companyName}</p>
          <p className="text-muted-foreground">{contactName}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "contactId",
    header: "Contact ID",
  },
  {
    id: "address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original.address
      const compiledAddress = [
        address.address1,
        address.address2,
        address.unit && `Unit ${address.unit}`,
        address.city,
        address.state,
        address.country,
        address.postalCode
      ]
        .filter(Boolean)
        .join(", ")

      return compiledAddress
    }
  },
  {
    accessorKey: "phoneNumber",
    header: "Contact",
  },



  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {

      const contact = row.original
      const [open, setOpen] = useState(false)
      const queryClient = useQueryClient()
      // const { refetch } = useQuery({
      //   queryKey: ["contact", contact.id],
      //   queryFn: () => deleteContact(contact.id),
      // })
      const mutation = useMutation({
        mutationFn: (id: string) => deleteContact(id),
        onSuccess: () => {
          toast.success("Contact deleted successfully")
          queryClient.invalidateQueries({ queryKey: ["contacts"] })
        },
        onError: (error: AxiosError<ApiError>) => {
          toast.error(error.response?.data.message)
        }
      })

      const handleDeleteContact = (id: string) => {
        console.log(`Delete this ${id}`)
        mutation.mutate(id)
      }
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem
                onClick={() => {
                  setOpen(true)
                }}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-500"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>
          {open && <EditContactModal open={open} setOpen={setOpen} id={contact.id} />}

        </>
      )
    },
  },
]