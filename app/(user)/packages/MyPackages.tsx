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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MyPackages({ handleSelect }: { handleSelect?: (contact: any) => void }) {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState([])
    const [open, setOpen] = useState(false)
    const [packageType, setPackageType] = useState("all")

    const debouncedSearch = useDebounce(search, 500)

    const { data: packages, isLoading, isPending } = useQuery({
        queryKey: ["packages", debouncedSearch, packageType],
        queryFn: () => getAllPackages({ search: debouncedSearch, type: packageType === "all" ? "" : packageType }),
        staleTime: 5 * 60 * 1000,
        retry: 1
    })
    
    return (
        <div className="h-full">
            {isLoading || isPending ? (
                    <Loader className="h-full" />
            ) : (
                <div className="space-y-4 w-full">
                    <div className="flex justify-between gap-2">
                        <DataTableToolbar
                            search={search}
                            setSearch={setSearch}
                            selectedRows={[]}
                            onBulkDelete={(rows) => console.log(rows)}
                            placeholder="Search Package/Pallet"
                        />
                        <AddPackage
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                    <div className="flex gap-2 rounded-md bg-black/5 p-1 w-max">
                        {[
                            { value: "all", label: "All" },
                            { value: "PALLET", label: "Pallet" },
                            { value: "PACKAGE", label: "Package" },
                            { value: "COURIER_PAK", label: "Courier Pak" },
                        ].map((tab) => (
                            <div onClick={() => setPackageType(tab.value)}
                                className={`
                                    cursor-pointer px-2 py-1 
                                    rounded-md
                                 data-[state=active]:border-primary
                                  data-[state=active]:bg-primary/10
                                   data-[state=active]:text-primary
                                    border 
                                     ${packageType === tab.value ? " border-primary bg-primary/10 text-primary" : "border-transparent"}`} key={tab.value}>
                                {tab.label}
                            </div>
                        ))}
                    </div>
                    {packages?.data.length > 0 ?
                        <>
                            <DataTable
                                columns={columns}
                                data={packages.data ?? []}
                                sorting={sorting}
                                // @ts-ignore
                                setSorting={setSorting}
                            />


                            <DataTablePagination
                                page={page}
                                totalPages={packages?.meta.totalPages ?? 1}
                                setPage={setPage}
                            />
                        </>
                        :
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

                    }
                    {/* <Tabs>
                        <TabsList className="flex flex-row! gap-2">
                            {[
                                { value: "all", label: "All" },
                                { value: "PALLET", label: "Pallet" },
                                { value: "PACKAGE", label: "Package" },
                                { value: "COURIER_PAK", label: "Courier Pak" },
                            ].map((tab) => (
                                <TabsTrigger onClick={() => tab.value !== "all" ? setPackageType(tab.value) : ""} className="cursor-pointer px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary border" key={tab.value} value={tab.value}>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <TabsContent value="all">
                            {packages?.data.length > 0 ?
                                <>
                                    <DataTable
                                        columns={columns}
                                        data={packages.data ?? []}
                                        sorting={sorting}
                                        // @ts-ignore
                                        setSorting={setSorting}
                                    />


                                    <DataTablePagination
                                        page={page}
                                        totalPages={packages?.meta.totalPages ?? 1}
                                        setPage={setPage}
                                    />
                                </>
                                :
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

                            }
                        </TabsContent>
                        <TabsContent value="PALLET">
                            {packages?.data.length > 0 ?
                                <>
                                    <DataTable
                                        columns={columns}
                                        data={packages.data ?? []}
                                        sorting={sorting}
                                        // @ts-ignore
                                        setSorting={setSorting}
                                    />


                                    <DataTablePagination
                                        page={page}
                                        totalPages={packages?.meta.totalPages ?? 1}
                                        setPage={setPage}
                                    />
                                </>
                                :
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

                            }
                        </TabsContent>
                        <TabsContent value="PACKAGE">
                            {packages?.data.length > 0 ?
                                <div className="flex flex-col gap-2">
                                    <DataTable
                                        columns={columns}
                                        data={packages.data ?? []}
                                        sorting={sorting}
                                        // @ts-ignore
                                        setSorting={setSorting}
                                    />


                                    <DataTablePagination
                                        page={page}
                                        totalPages={packages?.meta.totalPages ?? 1}
                                        setPage={setPage}
                                    />
                                </div>
                                :
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

                            }
                        </TabsContent>
                        <TabsContent value="COURIER_PAK">
                            {packages?.data.length > 0 ?
                                <>
                                    <DataTable
                                        columns={columns}
                                        data={packages.data ?? []}
                                        sorting={sorting}
                                        // @ts-ignore
                                        setSorting={setSorting}
                                    />


                                    <DataTablePagination
                                        page={page}
                                        totalPages={packages?.meta.totalPages ?? 1}
                                        setPage={setPage}
                                    />
                                </>
                                :
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

                            }
                        </TabsContent>
                    </Tabs> */}
                </div>)
            }
        </div>
    )
}