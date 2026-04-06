"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTableToolbar } from "@/components/common/table/DataTableToolbar"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./ColumnTablePackages"
import { useDebounce } from "@/hooks/useDebounce.hook"
import { getAllAddressBookContacts, getRecentContacts } from "@/api/services/address-book.api"
import { Loader } from "@/components/common/Loader"
import EmptyUI from "@/components/common/empty/Empty"
import { BookUser, PackagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllPackages } from "@/api/services/packages.api"
import AddPackage from "./AddPackage"

export function PackagesTable({ handleSelect, type = "all" }: { handleSelect?: (contact: any) => void, type?: "all" | "recent" }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])
    const [open, setOpen] = useState(false)

    const debouncedSearch = useDebounce(search, 500)

    const { data: packages, isLoading, isPending } = useQuery({
        queryKey: ["packages", debouncedSearch],
        queryFn: () => getAllPackages({ search: debouncedSearch }),
        retry: 1
    })
    console.log(packages)
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
                            {/* @ts-ignore */}
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
                packages?.data.length > 0 ?
                    <div className="space-y-4 w-full">
                        <DataTableToolbar
                            search={search}
                            setSearch={setSearch}
                            selectedRows={[]}
                            onBulkDelete={(rows) => console.log(rows)}
                            placeholder="Search Company Name"
                        />


                        <DataTable
                            columns={updatedColumns}
                            data={type === "recent" ? recentContacts?.data ?? [] : packages.data ?? []}
                            sorting={sorting}
                            // @ts-ignore
                            setSorting={setSorting}
                        />


                        <DataTablePagination
                            page={page}
                            totalPages={type === "recent" ? packages?.meta.totalPages ?? 1 : packages?.meta.totalPages ?? 1}
                            setPage={setPage}
                        />
                    </div> :
                    <EmptyUI
                        title="No Packages Found"
                        description="You haven't added any packages yet."
                        icon={<PackagePlus />}
                        action={
                            <AddPackage
                                open={open}
                                setOpen={setOpen}
                            />
                        }
                    />

            )}

        </div>)
}