import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { ChevronDown, MoreVertical, Trash2, UserRoundPen } from "lucide-react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteContact } from "@/api/services/address-book.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
      // const rate = row.original.fedexQuote
      return (
        <div className="h-24 w-24 p-2 flex justify-center items-center">

          <Image src={"/FedExFreight.svg"} width={100} height={100} alt="Carrier Logo" />
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

      return "N/A"
    }
  },
  {
    accessorKey: "shippingRate",
    header: "Shipping Rate",
    cell: ({ row }) => {

      const baseCharge = row.original?.fedexQuotes?.output?.rateReplyDetails[0]?.ratedShipmentDetails[0]?.totalBaseCharge
      const totalNetCharge = row.original?.fedexQuotes?.output?.rateReplyDetails[0]?.ratedShipmentDetails[0]?.totalNetCharge
      const baseChargeCurrency = row.original?.fedexQuotes?.output?.rateReplyDetails[0]?.current
      const fuelCharges = row.original?.fedexQuotes?.output?.rateReplyDetails[0]?.ratedShipmentDetails[0]?.shipmentRateDetail.surCharges[0]?.amount
      const additionalCharges = row.original?.fedexQuotes?.output?.rateReplyDetails[0]?.ratedShipmentDetails[0]?.shipmentRateDetail.surCharges[1]?.amount
      return (
        // tootip
        <TooltipProvider>
          <Tooltip >
            <TooltipTrigger asChild>
              <Button variant="link">
                {baseCharge} {baseChargeCurrency}
                <ChevronDown className="h-6 w-6 bg-primary text-white rounded-full p-0.5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent color="primary" side="bottom" className="shadow-lg bg-primary">
              <span className="text-white absolute top-0 left-0">{baseChargeCurrency} {baseCharge}</span>
              <div className="min-w-[220px] text-sm ">

                {/* Header */}
                <div className="grid grid-cols-2 font-semibold border-b pb-1 mb-2">
                  <span>Charge</span>
                  <span className="text-right">Amount</span>
                </div>

                {/* Rows */}
                <div className="grid grid-cols-2 gap-y-1">
                  <span>Base Charge</span>
                  <span className="text-right">
                    {baseChargeCurrency ?? "-"} {baseCharge ?? "N/A"}
                  </span>

                  <span>Fuel Charges</span>
                  <span className="text-right">
                    {baseChargeCurrency ?? "-"} {fuelCharges ?? "N/A"}
                  </span>

                  <span>Additional Charges</span>
                  <span className="text-right">
                    {baseChargeCurrency ?? "-"} {additionalCharges ?? "N/A"}
                  </span>

                  <span className="font-medium border-t pt-1 mt-1">
                    Total Net Charge
                  </span>
                  <span className="text-right font-medium border-t pt-1 mt-1">
                    {baseChargeCurrency} {totalNetCharge}
                  </span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
  },
]