"use client"

import { use, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTableToolbar } from "@/components/common/table/DataTableToolbar"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"

import { useDebounce } from "@/hooks/useDebounce.hook"
import { getAllAddressBookContacts, getRecentContacts } from "@/api/services/address-book.api"
import { Loader } from "@/components/common/Loader"
import EmptyUI from "@/components/common/empty/Empty"
import { BookUser, Plus, UserSquare2, Loader2, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { getColumns } from "./ColumnsTableShippingRate"
import { useMutation } from "@tanstack/react-query"
// import { getShipmentRates } from "@/api/services/shipping-rates.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { getShipmentRates } from "@/api/services/shipment.api"
import { ApiError } from "next/dist/server/api-utils"
// import { ApiError } from "@/types/api.types"

export function ShippingRatesTable({ handleSelect, type, dimensions, fromAddress, toAddress, selectedCarrier, setSelectedCarrier }: { handleSelect?: (contact: any) => void, type?: "all" | "recent", dimensions?: any, fromAddress?: any, toAddress?: any, selectedCarrier: string | null, setSelectedCarrier: (value: string) => void }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])
    const [rates, setRates] = useState<any[]>([])
    const [quotes, setQuotes] = useState([])
    // state of carrier
    const columns = getColumns(setSelectedCarrier, selectedCarrier)
    // print type
    console.log(type)
    const debouncedSearch = useDebounce(search, 500)
    console.log("dimensions", dimensions)
    console.log("fromAddress", fromAddress)
    console.log("toAddress", toAddress)
    // const payload =
    // {
    //     "quoteType": "STANDARD",
    //     "fedex": {
    //         "from": {
    //             "postalCode": fromAddress?.address?.postalCode,
    //             "countryCode": fromAddress?.address?.country
    //         },
    //         "to": {
    //             "postalCode": toAddress?.address?.postalCode,
    //             "countryCode": toAddress?.address?.country
    //         }
    //     },
    //     // "tst": {
    //     //     "from": {
    //     //         "name": "ULS Freight",
    //     //         "address": "123 Main St",
    //     //         "postalCode": "M5V3A8",
    //     //         "city": "Toronto",
    //     //         "state": "ON"
    //     //     },
    //     //     "to": {
    //     //         "name": "ULS Freight",
    //     //         "address": "456 Hollywood Blvd",
    //     //         "postalCode": "48226",
    //     //         "city": "Detroit",
    //     //         "state": "MI"
    //     //     }
    //     // },
    //     "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
    //     "rateRequestType": ["LIST"],
    //     "serviceType": "FEDEX_EXPRESS_SAVER",
    //     "packages": dimensions?.lineItem?.units?.map((unit: any) => ({
    //         weightUnit: dimensions?.lineItem?.measurementUnit === "IMPERIAL" ? "LB" : "KG",
    //         weight: unit.weight,
    //         dimensionsUnit: dimensions?.lineItem?.measurementUnit === "IMPERIAL" ? "IN" : "CM",
    //         length: unit.length,
    //         width: unit.width,
    //         height: unit.height,
    //         handlingUnits: unit.unitsOnPallet,
    //         packaging: unit.palletUnitType
    //     })) || []
    // }
    const payload =
    {
        "quoteType": "STANDARD",
        "fedex": {
            "from": {
                "postalCode": "38117",
                "countryCode": "US"
            },
            "to": {
                "postalCode": "90210",
                "countryCode": "US"
            }
        },
        "tst": {
            "from": {
                "name": "ULS Freight",
                "address": "123 Main St",
                "postalCode": "M5V3A8",
                "city": "Toronto",
                "state": "ON"
            },
            "to": {
                "name": "ULS Freight",
                "address": "456 Hollywood Blvd",
                "postalCode": "48226",
                "city": "Detroit",
                "state": "MI"
            }
        },
        "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
        "rateRequestType": ["LIST"],
        "serviceType": "FEDEX_EXPRESS_SAVER",
        "packages": [{
            "weightUnit": "LB",
            "weight": 10,
            "dimensionsUnit": "IN",
            "length": 20,
            "width": 20,
            "height": 40,
            "handlingUnits": 1,
            "packaging": "BOX"
        }]
    }

    const mutation = useMutation({
        mutationFn: (payload: any) => getShipmentRates(payload),
        onSuccess: (res) => {
            toast.success("Shipment rates fetched successfully")
            const ratesArray = [
                ...(res.fedexQuotes || []).map((q: any) => ({
                    carrier: q.carrier,
                    serviceType: q.serviceType,
                    serviceName: q.serviceName,
                    price: q.totalPrice,
                    currency: q.currency,
                    deliveryDays: q.estimatedDeliveryDays,
                    shipDate: q.shipDate,
                    billingWeight: q.billingWeight?.value,
                    transactionId: q.transactionId,
                    source: "FEDEX"
                })),

                ...(res.tstQuotes || []).map((q: any) => ({
                    carrier: q.carrier,
                    serviceType: q.serviceType,
                    serviceName: q.serviceType, // fallback since no serviceName
                    price: q.totalPriceCAD ?? q.totalPrice,
                    currency: q.originalCurrency ?? q.currency,
                    deliveryDays: q.estimatedDeliveryDays,
                    shipDate: q.shipDate,
                    billingWeight: Number(q.billingWeight),
                    transactionId: q.transactionId,
                    source: "TST"
                }))
            ]
            setRates(ratesArray)
            console.log(ratesArray)
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })

    // useEffect(() => {
    //     if (rates) {
    //         const ratesArray = [
    //             ...(rates.fedexQuotes || []).map(q => ({
    //                 carrier: q.carrier,
    //                 serviceType: q.serviceType,
    //                 serviceName: q.serviceName,
    //                 price: q.totalPrice,
    //                 currency: q.currency,
    //                 deliveryDays: q.estimatedDeliveryDays,
    //                 shipDate: q.shipDate,
    //                 billingWeight: q.billingWeight?.value,
    //                 transactionId: q.transactionId,
    //                 source: "FEDEX"
    //             })),

    //             ...(rates.tstQuotes || []).map(q => ({
    //                 carrier: q.carrier,
    //                 serviceType: q.serviceType,
    //                 serviceName: q.serviceType, // fallback since no serviceName
    //                 price: q.totalPriceCAD ?? q.totalPrice,
    //                 currency: q.originalCurrency ?? q.currency,
    //                 deliveryDays: q.estimatedDeliveryDays,
    //                 shipDate: q.shipDate,
    //                 billingWeight: Number(q.billingWeight),
    //                 transactionId: q.transactionId,
    //                 source: "TST"
    //             }))
    //         ]
    //         // @ts-ignore
    //         setQuotes(ratesArray)
    //     }
    // }, [rates])

    // loader while fetching 
    if (mutation.isPending) {
        return (
            <Dialog open={true}>
                <DialogTitle>Fetching Best Rates!</DialogTitle>
                <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-8 [&>button]:hidden">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
                    <h2 className="text-xl font-semibold text-center mb-2">Fetching Rates!</h2>
                    <p className="text-muted-foreground text-center">
                        Please hold on while we collect quotes from our partner carriers...
                    </p>
                </DialogContent>
            </Dialog>
        )
    }
    // make rates array

    return (
        <>
            <div className="flex justify-center items-center">
                {mutation.isPending ? (
                    <Loader className="h-full" />
                ) : (
                    rates ?
                        <div className="w-full">

                            <div className="space-y-4 w-full">

                                {rates ? <DataTable
                                    columns={columns}
                                    data={rates}
                                    sorting={sorting}
                                    // @ts-ignore
                                    setSorting={setSorting}
                                /> : ""}


                                <DataTablePagination
                                    page={page}
                                    // totalPages={type === "recent" ? mutation.data?.meta.totalPages ?? 1 : mutation.data?.meta.totalPages ?? 1}
                                    totalPages={1}
                                    setPage={setPage}
                                />
                            </div>
                        </div>
                        :
                        <EmptyUI
                            title="No Shipment Rates Found"
                            description="Failed to get rates from our courier partners."
                            icon={<BookUser />}
                        // action={
                        //     <AddContactModal />
                        // }
                        />

                )}
            </div>
            {/* get rates button */}
            <Button onClick={() => mutation.mutate(payload)} disabled={mutation.isPending}>
                {mutation.isPending ? <LoaderCircle className="animate-spin mr-2" size={16} /> : ""}
                Get Rates
            </Button>
        </>
    )
}