import { Button } from "@/components/ui/button"
import { DataTablePaginationProps } from "./data-table.types"

export function DataTablePagination<TData, TValue>({
    page,
    totalPages,
    setPage,
}: DataTablePaginationProps<TData, TValue>) {
    return (
        <div className="flex justify-end gap-2">

            <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </Button>

            <span className="flex items-center px-2">
                {page} / {totalPages}
            </span>

            <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </Button>

        </div>
    )
}