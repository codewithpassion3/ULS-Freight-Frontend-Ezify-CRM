"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTableToolbar } from "@/components/common/table/DataTableToolbar"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./components/ColumnsTableAddressBook"
import { useDebounce } from "./hooks/debounce.hook"
import { getAllAddressBookContacts, getSingleContact } from "@/api/services/quotes.api"
import { Loader } from "@/components/common/Loader"



export function AddressBookTable() {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])

    const debouncedSearch = useDebounce(search, 500)

    const { data: addressBook, isLoading, isPending } = useQuery({
        queryKey: ["contacts", debouncedSearch],
        queryFn: () => getAllAddressBookContacts({ search: debouncedSearch }),
    })

    return (
        <div className="space-y-4">

            <DataTableToolbar
                search={search}
                setSearch={setSearch}
                selectedRows={[]}
                onBulkDelete={(rows) => console.log(rows)}
            />

            {isLoading || isPending ? (
                <Loader />
            ) : (
                <DataTable
                    columns={columns}
                    data={addressBook.data ?? []}
                    sorting={sorting}
                    setSorting={setSorting}
                />
            )}

            <DataTablePagination
                page={page}
                totalPages={addressBook?.meta.totalPages ?? 1}
                setPage={setPage}
            />

        </div>
    )
}