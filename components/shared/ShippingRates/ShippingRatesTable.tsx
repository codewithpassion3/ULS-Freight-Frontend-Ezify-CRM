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
import { BookUser, Plus, UserSquare2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { columns } from "./ColumnsTableShippingRate"
import { useMutation } from "@tanstack/react-query"
// import { getShipmentRates } from "@/api/services/shipping-rates.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { getShipmentRates } from "@/api/services/shipment.api"
import { ApiError } from "next/dist/server/api-utils"
// import { ApiError } from "@/types/api.types"
interface Dimension {
    // "weightUnit": "LB",
    //         "weight": 10,
    //         "dimensionsUnit": "IN",
    //         "length": 20,
    //         "width": 20,
    //         "height": 40,
    //         "handlingUnits": 1,
    //         "packaging": "BOX"
    weightUnit: "LB" | "KG"
    weight: number
    dimensionsUnit: "IN" | "CM"
    length: number
    width: number
    height: number
    handlingUnits: number
    packaging: string
}
export function ShippingRatesTable({ handleSelect, type, dimensions }: { handleSelect?: (contact: any) => void, type?: "all" | "recent", dimensions?: Dimension }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])
    const [rates, setRates] = useState()
    const [quotes, setQuotes] = useState([])
    // print type
    console.log(type)
    const debouncedSearch = useDebounce(search, 500)
    console.log("dimensions", dimensions)
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
            setRates(res.fedexQuotes)
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })

    useEffect(() => {
        if (rates) {
            const ratesArray = [
                {
                    carrier: "Fedx",
                    quote: rates ? rates : []
                }
            ]
            // @ts-ignore
            setQuotes(ratesArray)
        }
    }, [rates])



    // async function streamRates(dto: any) {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipment-carrier/rates/stream`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(dto),
    //     });

    //     const reader = response?.body?.getReader() as any;
    //     const decoder = new TextDecoder();

    //     while (true) {
    //         const { done, value } = await reader?.read();
    //         if (done) break;

    //         const chunk = decoder.decode(value);
    //         const lines = chunk.split('\n').filter(l => l.startsWith('data:'));

    //         for (const line of lines) {
    //             const result = JSON.parse(line.replace('data: ', ''));
    //             console.log("result", result.quotes)

    //             if (result.error) {
    //                 console.error(`${result.carrier} failed:`, result.error);
    //                 continue;
    //             }

    //             // Render as each arrives
    //             //             if (result.carrier === 'fedex') {
    //             //                 renderFedExQuote(result.quotes);
    //             //             } else if (result.carrier === 'tst') {
    //             //                 renderTSTQuote(result.quotes);
    //             //             }
    //             // print result
    //         }
    //     }
    // }
    useEffect(() => {
        mutation.mutate(payload)

        // streamRates(payload)
    }, [])

    console.log("rates", rates)
    // loader while fetching 
    if (mutation.isPending) {
        return (
            <Dialog open={true}>
                <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-8 [&>button]:hidden">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
                    <h2 className="text-xl font-semibold text-center mb-2">Fetching Best Rates!</h2>
                    <p className="text-muted-foreground text-center">
                        Please hold on while we collect quotes from our partner carriers...
                    </p>
                </DialogContent>
            </Dialog>
        )
    }
    // make rates array

    return (
        <div className="flex justify-center items-center">
            {mutation.isPending ? (
                <Loader className="h-full" />
            ) : (
                rates ?
                    <div className="w-full">

                        <div className="space-y-4 w-full">
                            {/* <div className="flex justify-between gap-2">
                                < DataTableToolbar
                                    search={search}
                                    setSearch={setSearch}
                                    selectedRows={[]}
                                    onBulkDelete={(rows) => console.log(rows)}
                                    placeholder="Search Company Name"
                                />


                            </div> */}


                            {rates ? <DataTable
                                columns={columns}
                                data={quotes}
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
    )
}