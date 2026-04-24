"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTableToolbar } from "@/components/common/table/DataTableToolbar"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"

import { useDebounce } from "@/hooks/useDebounce.hook"
import { getAllAddressBookContacts, getRecentContacts } from "@/api/services/address-book.api"
import { Loader } from "@/components/common/Loader"
import EmptyUI from "@/components/common/empty/Empty"
import { BookUser, Plus, UserSquare2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { columns } from "./ColumnsTableShippingRate"
import { useMutation } from "@tanstack/react-query"
// import { getShipmentRates } from "@/api/services/shipping-rates.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { getShipmentRates } from "@/api/services/shipment.api"
import { ApiError } from "next/dist/server/api-utils"
// import { ApiError } from "@/types/api.types"

export function ShippinRatesTable({ handleSelect, type }: { handleSelect?: (contact: any) => void, type?: "all" | "recent" }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])
    // print type
    console.log(type)
    const debouncedSearch = useDebounce(search, 500)
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
        onSuccess: () => {
            toast.success("Shipment rates fetched successfully")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })

    async function streamRates(dto: any) {
        const response = await fetch('/shipment-carrier/rates/stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        });

        const reader = response?.body?.getReader() as any;
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader?.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(l => l.startsWith('data:'));

            for (const line of lines) {
                const result = JSON.parse(line.replace('data: ', ''));

                if (result.error) {
                    console.error(`${result.carrier} failed:`, result.error);
                    continue;
                }

                // Render as each arrives
                //             if (result.carrier === 'fedex') {
                //                 renderFedExQuote(result.quotes);
                //             } else if (result.carrier === 'tst') {
                //                 renderTSTQuote(result.quotes);
                //             }
                // print result
                console.log("result", result.quotes)
            }
        }
    }
    useEffect(() => {
        mutation.mutate(payload)
        streamRates(payload)
    }, [])

    return (
        <div className="flex justify-center items-center">
            {mutation.isPending ? (
                <Loader className="h-full" />
            ) : (
                mutation.data.length > 0 ?
                    <div className="w-full">
                        <div className="flex items-center gap-2 my-2">
                            <UserSquare2 className="h-6 w-6 text-primary" />
                            <h2 className="text-xl font-semiBold text-foreground">Address Book</h2>
                        </div>
                        <div className="space-y-4 w-full">
                            <div className="flex justify-between gap-2">
                                < DataTableToolbar
                                    search={search}
                                    setSearch={setSearch}
                                    selectedRows={[]}
                                    onBulkDelete={(rows) => console.log(rows)}
                                    placeholder="Search Company Name"
                                />


                            </div>


                            {mutation.data.length > 0 ? <DataTable
                                columns={columns}
                                data={mutation.data}
                                sorting={sorting}
                                // @ts-ignore
                                setSorting={setSorting}
                            /> : ""}


                            <DataTablePagination
                                page={page}
                                totalPages={type === "recent" ? mutation.data?.meta.totalPages ?? 1 : mutation.data?.meta.totalPages ?? 1}
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
        </div>)
}