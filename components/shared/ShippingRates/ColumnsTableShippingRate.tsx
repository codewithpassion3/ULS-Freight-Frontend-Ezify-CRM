import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreVertical, Trash2, UserRoundPen } from "lucide-react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteContact } from "@/api/services/address-book.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import Image from "next/image"

export const columns: ColumnDef<any>[] = [


  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={table.getIsAllRowsSelected()}
  //         onCheckedChange={(value) =>
  //           table.toggleAllRowsSelected(!!value)
  //         }
  //       />
  //     ),

  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) =>
  //           row.toggleSelected(!!value)
  //         }
  //       />
  //     ),
  //   },

  {
    accessorKey: "carrier",
    header: "Carrier",
    cell: ({ row }) => {
      return (
        <div>
          carrier logo
          {/* carrier logo */}
          {/* <Image src={} width={50} height={50} /> */}
        </div>
      )
    }
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => {
      return (
        <div>
          service
        </div>
      )
    }
  },
  {
    id: "estTransit",
    header: "Est. Transit",
    cell: ({ row }) => {

      return "2 days"
    }
  },
  {
    accessorKey: "shippingRate",
    header: "Shipping Rate",
    cell: ({ row }) => {
      return (
        <div>
          shipping rate
        </div>
      )
    }
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
                className="cursor-pointer"
              >
                <UserRoundPen />
                Select
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeleteContact(contact.id)}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>
          {/* {open && <EditContactModal open={open} setOpen={setOpen} id={contact.id} />} */}

        </>
      )
    },
  },
]