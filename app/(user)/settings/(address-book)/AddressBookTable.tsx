"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTableToolbar } from "@/components/common/table/DataTableToolbar"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./components/ColumnsTableAddressBook"
import { useDebounce } from "./hooks/debounce.hook"
import { getAllAddressBookContacts, getRecentContacts } from "@/api/services/quotes.api"
import { Loader } from "@/components/common/Loader"
import EmptyUI from "@/components/common/empty/Empty"
import { BookUser } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AddressBookTable({ handleSelect, type = "all" }: { handleSelect: (contact: any) => void, type: "all" | "recent" }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])

    const debouncedSearch = useDebounce(search, 500)

    const { data: addressBook, isLoading, isPending } = useQuery({
        queryKey: ["contacts", debouncedSearch],
        queryFn: () => getAllAddressBookContacts({ search: debouncedSearch }),
        retry: 1
    })
    let recentContacts, isLoadingRecent, isPendingRecent
    if (type === "recent") {
        recentContacts = useQuery({
            queryKey: ["recent-contacts", debouncedSearch],
            queryFn: () => getRecentContacts({ search: debouncedSearch }),
            retry: 1
        })
        isLoadingRecent = recentContacts.isLoading
        isPendingRecent = recentContacts.isPending
        console.log(recentContacts)
    }
    let updatedColumns = columns
    if (handleSelect) {
        updatedColumns = columns.map((column) => {
            if (column.id === "actions") {
                const originalCell = column.cell

                return {
                    ...column,
                    cell: (props: any) => (
                        <>
                            {originalCell?.(props)}

                            <Button
                                size="sm"
                                onClick={() => handleSelect(props.row.original)}
                                className="bg-[#0070c0] hover:bg-[#005999]"
                            >
                                Select
                            </Button>
                        </>
                    ),
                }
            }

            return column
        })
    }

    return (
        <div className="flex justify-center items-center">
            {isLoading || isPending ? (
                <Loader className="h-full" />
            ) : (
                addressBook?.data.length > 0 ?
                    <div className="space-y-4 w-full">
                        < DataTableToolbar
                            search={search}
                            setSearch={setSearch}
                            selectedRows={[]}
                            onBulkDelete={(rows) => console.log(rows)}
                        />


                        <DataTable
                            columns={updatedColumns}
                            data={type === "recent" ? recentContacts?.data ?? [] : addressBook.data ?? []}
                            sorting={sorting}
                            setSorting={setSorting}
                        />


                        <DataTablePagination
                            page={page}
                            totalPages={type === "recent" ? addressBook?.meta.totalPages ?? 1 : addressBook?.meta.totalPages ?? 1}
                            setPage={setPage}
                        />
                    </div> :
                    <EmptyUI
                        title="No Contacts Found"
                        description="You haven't added any contacts yet."
                        icon={<BookUser />}
                    />

            )}
        </div>)
}