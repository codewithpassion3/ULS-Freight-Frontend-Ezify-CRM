import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "../components/ColumnsTableTracking"
import { SortingState } from "@tanstack/react-table"
import { CircleSlash, Plus, RefreshCcw, Trash2, Truck } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "../../../../hooks/useDebounce.hook"
import { useQuery } from "@tanstack/react-query"
import { getAllQuotes, getFavoriteQuotes, getSavedQuotes, getSpotQuotes } from "@/api/services/quotes.api"
import { Loader } from "@/components/common/Loader"
import EmptyUI from "@/components/common/empty/Empty"
import Link from "next/link"
// import { QuoteCategory } from "./page"
interface Props {
    filters: {
        dateRange: any
        search: string
        selectedPackaging: string[]
    }
    setCount: (count: { all: number; saved: number; spot: number }) => void
    quoteCategory: any
}
export default function DynamicTrackingTable({ filters, setCount, quoteCategory }: Props) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [page, setPage] = useState(1)
    const debouncedSearch = useDebounce(filters.search, 500)

    const { data: quotes, isLoading, isPending, isError, isSuccess } = useQuery({
        queryKey: ["quotes", quoteCategory, debouncedSearch],
        queryFn: () => {
            switch (quoteCategory) {
                case "all":
                    return getAllQuotes()
                case "saved":
                    return getSavedQuotes()
                case "spot":
                    return getSpotQuotes()
                case "favorite":
                    return getFavoriteQuotes()
            }
        },
        retry: 1,
        // dependency
        enabled: true
    })
    console.log({ quoteCategory, dateRange: filters.dateRange, search: filters.search, selectedPackaging: filters.selectedPackaging })
    console.log("quotes", quotes)
    useEffect(() => {
        if (quotes) {
            setCount({
                all: quotes?.data?.length,
                saved: 0,
                spot: 0
            })
        }
    }, [quotes])
    if (isLoading || isPending) return <Loader className="py-20" />
    if (isError) return <EmptyUI
        icon={<CircleSlash size={80} />}
        title="Error"
        description="Failed to fetch quotes"
        action={
            <Button variant="outline" className="text-muted-foreground border-border">
                <RefreshCcw size={16} /> Retry
            </Button>
        }
    />

    return (
        quotes?.data?.length > 0 ?
            <>
                <div className="shadow-lg mb-4">
                    <DataTable
                        columns={columns}
                        data={quotes.data ?? []}
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
                        totalPages={1} // Static totalPages for now, based on mock data
                        setPage={setPage}
                    />
                </div>
            </> :
            <EmptyUI
                icon={<Truck size={80} />}
                title="No Quotes Found"
                description="You have no quotes yet. Create one to get started."
                action={
                    <Link href="/quote">
                        <Button variant="outline" className="text-muted-foreground border-border">
                            <Plus size={16} /> Create Quote
                        </Button>
                    </Link>
                }
            />
    )
}