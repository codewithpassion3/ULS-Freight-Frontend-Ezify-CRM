import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./components/ColumnsTableQuotes"
import { SortingState } from "@tanstack/react-table"
import { CircleSlash, Plus, RefreshCcw, Trash2, Truck } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { MOCK_QUOTES, QuoteCategory } from "./page"
import { useDebounce } from "../../../hooks/useDebounce.hook"
import { useQuery } from "@tanstack/react-query"
import { getAllQuotes, getFavoriteQuotes, getSavedQuotes, getSpotQuotes } from "@/api/services/quotes.api"
import { Loader } from "@/components/common/Loader"
import { Empty } from "@/components/ui/empty"
import EmptyUI from "@/components/common/empty/Empty"
import Link from "next/link"
interface Props {
    setCount: (count: { all: number; saved: number; spot: number }) => void
    quoteCategory: QuoteCategory
}
export default function DynamicQuotesTable({ setCount, quoteCategory }: Props) {
    const [search, setSearch] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [page, setPage] = useState(1)
    const debouncedSearch = useDebounce(search, 500)

    const { data: quotes, isLoading, isPending, isError, isSuccess } = useQuery({
        queryKey: ["quotes", quoteCategory, debouncedSearch],
        queryFn: () => {
            switch (quoteCategory) {
                case "all":
                    return getAllQuotes({ search: debouncedSearch })
                case "saved":
                    return getSavedQuotes({ search: debouncedSearch })
                case "spot":
                    return getSpotQuotes({ search: debouncedSearch })
                case "favorite":
                    return getFavoriteQuotes({ search: debouncedSearch })
            }
        },
        retry: 1
    })
    console.log("quotes", quotes)
    useEffect(() => {
        if (quotes) {
            setCount({
                all: quotes.data.length,
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
        quotes.data.length > 0 ?
            <>
                <p className="text-xs text-muted-foreground mb-4">
                    These quotes are based on the information provided and are valid <span className="font-semibold">5 business days</span> from the issue date.<br />
                    Rates are subject to change without prior notice based on carrier availability, weekly fuel surcharges, and currency exchange where applicable.
                </p>
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