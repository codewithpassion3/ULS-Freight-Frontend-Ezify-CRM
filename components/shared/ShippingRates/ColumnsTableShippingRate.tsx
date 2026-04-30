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

export const getColumns = (setSelectedCarrier: (carrier: string) => void, selectedCarrier: string | null): ColumnDef<any>[] => [

  {
    accessorKey: "carrier",
    header: "Carrier",
    cell: ({ row }) => {
      const carrier = row.original.carrier
      return (
        <div className="h-24 w-24 p-2 flex justify-center items-center">
          {carrier === "FEDEX" ? (
            <Image src={"/FedExFreight.svg"} width={100} height={100} alt="Carrier Logo" />
          ) : (
            <Image src={"/tst.png"} width={100} height={100} alt="Carrier Logo" />
          )}
        </div>
      )
    }
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => {
      const serviceName = row.original?.serviceName
      return (
        <div>
          {serviceName}
        </div>
      )
    }
  },
  {
    id: "estTransit",
    header: "Est. Transit",
    cell: ({ row }) => {
      const estTransit = row.original?.deliveryDays
      return <span>{estTransit}</span>
    }
  },
  {
    accessorKey: "shippingRate",
    header: "Shipping Rate",
    cell: ({ row }) => {
      const totalNetCharge = row.original?.price
      const baseChargeCurrency = row.original?.currency
      const fuelCharges = row.original?.fuelSurcharge || null
      const additionalCharges = row.original?.totalSurcharges - fuelCharges || null
      return (
        // tootip
        <TooltipProvider>
          <Tooltip >
            <TooltipTrigger asChild>
              <Button variant="link">
                {totalNetCharge} {baseChargeCurrency}
                <ChevronDown className="h-6 w-6 bg-primary text-white rounded-full p-0.5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent side="bottom" className="shadow-lg">
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
                    {baseChargeCurrency ?? "-"} {totalNetCharge ?? "N/A"}
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
  // select button
  {
    id: "select",
    header: "Select",
    cell: ({ row }) => {
      const carrier = row.original.carrier
      return (
        <Button
          variant={selectedCarrier === carrier ? "default" : "outline"}
          onClick={() => {
            // if name is tst-cf-express then do TST-CF-EXPRESS
            if (carrier === "tst-cf-express") {
              setSelectedCarrier("TST")
            } else {
              setSelectedCarrier(carrier)
            }
            console.log("Selected carrier:", carrier)
          }}
        >
          {selectedCarrier === carrier ? "Selected" : "Select"}
        </Button>
      )
    }
  }
]