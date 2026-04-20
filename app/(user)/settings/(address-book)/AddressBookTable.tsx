"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/common/table/DataTable"
import { DataTableToolbar } from "@/components/common/table/DataTableToolbar"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./components/ColumnsTableAddressBook"
import { useDebounce } from "@/hooks/useDebounce.hook"
import { getAllAddressBookContacts, getRecentContacts } from "@/api/services/address-book.api"
import { Loader } from "@/components/common/Loader"
import EmptyUI from "@/components/common/empty/Empty"
import { BookUser, Plus, UserSquare2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddContactModal } from "./AddContactModal"

export function AddressBookTable({ handleSelect, type }: { handleSelect?: (contact: any) => void, type?: "all" | "recent" }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])
    // print type
    console.log(type)
    const debouncedSearch = useDebounce(search, 500)

    const { data: addressBook, isLoading, isPending } = useQuery({
        queryKey: ["contacts", debouncedSearch],
        queryFn: () => getAllAddressBookContacts({ search: debouncedSearch }),
        retry: 1
    })

    const { data: recentContacts, isLoading: isLoadingRecent, isPending: isPendingRecent } = useQuery({
        queryKey: ["recent-contacts", debouncedSearch],
        queryFn: () => getRecentContacts({ search: debouncedSearch }),
        retry: 1
    })

    console.log("recentContacts", recentContacts)
    console.log("addressBook", addressBook)
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
            {isLoading || isPending || isLoadingRecent || isPendingRecent ? (
                <Loader className="h-full" />
            ) : (
                addressBook?.data.length > 0 ?
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
                                <AddContactModal />

                            </div>


                            {recentContacts?.data.length > 0 ? <DataTable
                                columns={updatedColumns}
                                data={type === "recent" ? recentContacts?.data.length > 0 ? recentContacts.data : [] : addressBook.data ?? []}
                                sorting={sorting}
                                // @ts-ignore
                                setSorting={setSorting}
                            /> : ""}


                            <DataTablePagination
                                page={page}
                                totalPages={type === "recent" ? addressBook?.meta.totalPages ?? 1 : addressBook?.meta.totalPages ?? 1}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                    :
                    <EmptyUI
                        title="No Contacts Found"
                        description="You haven't added any contacts yet."
                        icon={<BookUser />}
                        action={
                            <AddContactModal />
                        }
                    />

            )}
        </div>)
}