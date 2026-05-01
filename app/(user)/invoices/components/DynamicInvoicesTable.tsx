import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./ColumnsTableInvoices"
import { SortingState } from "@tanstack/react-table"
import { CircleSlash, FileText, Plus, RefreshCcw, Trash2 } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "../../../../hooks/useDebounce.hook"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@/components/common/Loader"
import EmptyUI from "@/components/common/empty/Empty"
import Link from "next/link"
import { getAllTrackings } from "@/api/services/tracking.api"

interface Props {
    filters: {
        dateRange: any
        search: string
        selectedPackaging: string[]
    }
    invoiceCategory: any
    currencyFilter: string
}

export default function DynamicInvoicesTable({ filters, invoiceCategory, currencyFilter }: Props) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [page, setPage] = useState(1)
    const debouncedSearch = useDebounce(filters.search, 500)

    // Using tracking API as requested
    const { data: trackings, isLoading, isPending, isError } = useQuery({
        queryKey: ["invoices", invoiceCategory, debouncedSearch, currencyFilter],
        queryFn: () => getAllTrackings(),
        retry: 1,
        enabled: true
    })

    if (isLoading || isPending) return <Loader className="py-20" />
    if (isError) return (
        <EmptyUI
            icon={<CircleSlash size={80} />}
            title="Error"
            description="Failed to fetch invoices"
            action={
                <Button variant="outline" className="text-muted-foreground border-border">
                    <RefreshCcw size={16} /> Retry
                </Button>
            }
        />
    )

    // Mock filtering based on currency toggle for visual representation
    let displayData = trackings?.data || [];

    return (
        displayData.length > 0 ?
            <>
                <div className="shadow-sm border rounded-md mb-4 bg-white">
                    <DataTable
                        columns={columns}
                        data={displayData}
                        sorting={sorting}
                        setSorting={setSorting}
                    />
                </div>
                <div className="flex justify-between items-center mb-10">
                    <Button variant="outline" className="text-muted-foreground border-border">
                        <Trash2 size={16} className="mr-2" /> Delete
                    </Button>
                    <DataTablePagination
                        page={page}
                        totalPages={1}
                        setPage={setPage}
                    />
                </div>
            </> :
            <EmptyUI
                icon={<FileText size={80} />}
                title="No Invoices Found"
                description="You have no invoices matching these filters."
                action={
                    <Link href="/track">
                        <Button variant="outline" className="text-muted-foreground border-border">
                            Go to Tracking
                        </Button>
                    </Link>
                }
            />
    )
}
