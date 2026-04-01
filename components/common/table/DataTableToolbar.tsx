import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableToolbarProps } from "./data-table.types"
import { Search } from "lucide-react"
import SearchInput from "../SearchInput"

export function DataTableToolbar<TData, TValue>({
    search,
    setSearch,
    selectedRows,
    onBulkDelete,
    placeholder = "Search"
}: DataTableToolbarProps<TData, TValue>) {
    return (
        <div className="w-full flex items-center justify-between">
            <SearchInput search={search} setSearch={setSearch} placeholder={placeholder} />
            {selectedRows.length > 0 && (
                <Button
                    variant="destructive"
                    onClick={() => onBulkDelete(selectedRows)}
                >
                    Delete Selected
                </Button>
            )}

        </div>
    )
}