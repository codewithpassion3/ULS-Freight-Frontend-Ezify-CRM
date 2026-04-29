"use client"

import { useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomDateRangePicker } from "@/components/ui/custom-date-picker"
import { MultiSelect } from "@/components/ui/multi-select"
import { Search, CheckCircle, Edit, MoreVertical, Trash2, Heart, SaveIcon, Truck, X, EyeOff, Eye, AlertTriangle, XCircle, CheckCircle2, Clock } from "lucide-react"

import { DataTable } from "@/components/common/table/DataTable"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./components/ColumnsTableTracking"
import { SortingState } from "@tanstack/react-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import FavouriteQuotesTable from "./DynamicQuotesTable"
// import AllQuotesTable from "./DynamicQuotesTable"
// import DynamicQuotesTable from "./DynamicQuotesTable"
import FormDate from "@/components/common/form/fields/FormDate"
import { DatePicker } from "@/components/common/date-picker/DatePicker"
import { ShipmentTypes } from "@/components/shared/DynamicQuote/DynamicQuote"
import { DateRangePicker } from "@/components/common/date-picker/DateRangePicker"
import DynamicTrackingTable from "./components/DynamicTrackingTable"

const PACKAGING_TYPES = [
    { label: "Courier Pak", value: "COURIER_PAK" },
    { label: "FTL", value: "FTL" },
    { label: "LTL-Partial Truckload", value: "LTL" },
    { label: "Package", value: "PACKAGE" },
    { label: "Pallet", value: "PALLET" },
    { label: "Time Critical", value: "TIME_CRITICAL" },

]
export type QuoteCategory = "all" | "saved" | "spot" | "favorite"
export default function TrackingDashboardPage() {
    // const [selectedTab, setSelectedTab] = useState<QuoteCategory>("all")
    const [search, setSearch] = useState("")
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>()
    const [selectedPackaging, setSelectedPackaging] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(true)
    const [count, setCount] = useState({
        all: 0,
        saved: 0,
        spot: 0
    })

    return (
        <div className="container mx-auto pb-8 pt-20 px-4 max-w-7xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Tracking Dashboard</h1>

            </div>

            {showFilters ? (
                <div className="bg-muted/30 border border-border p-4 rounded-md mb-6 relative">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold text-primary">Search Shipments</h2>
                        <div className="flex gap-2">
                            <Button variant="destructive" onClick={() => {
                                setDateRange(undefined)
                                setSearch("")
                                setSelectedPackaging([])
                            }}><X /> Clear Filters</Button>
                            <Button variant="outline" onClick={() => setShowFilters(false)}><EyeOff /> Hide</Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 items-end mt-4">
                        <div className="space-y-1">
                            <label className="text-sm text-muted-foreground block">Search by Date Range:</label>
                            <DateRangePicker
                                value={dateRange}
                                onChange={setDateRange}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-muted-foreground block">Search:</label>
                            <div className="flex w-[240px]">
                                <Input
                                    placeholder="Search"
                                    className="rounded-r-none bg-white"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    className="rounded-l-none bg-[#0070c0] hover:bg-[#005999] px-3"
                                    onClick={() => { }}
                                >
                                    <Search size={16} />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-muted-foreground block">Packaging Type:</label>
                            <MultiSelect options={PACKAGING_TYPES} value={selectedPackaging} onChange={setSelectedPackaging} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-6 flex justify-end">
                    <Button type="button" variant="outline" onClick={() => setShowFilters(true)}>
                        <Eye />
                        Show Filters
                    </Button>
                </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="all" >
                <TabsList className="gap-2 bg-white dark:bg-slate-800 border border-blue-200 p-1 group-data-[orientation=horizontal]/tabs:h-fit" >
                    {[
                        { icon: Heart, label: "All Active", value: "all-active", count: count.all },
                        { icon: SaveIcon, label: "Today's Shipment", value: "todays-shipment", count: count.saved },
                        { icon: Truck, label: "Ready for Shipping", value: "ready-for-shipping", count: count.spot },
                        { icon: Truck, label: "In Transit", value: "in-transit", count: count.spot },
                        { icon: AlertTriangle, label: "Exceptions", value: "exceptions", count: count.spot },
                        { icon: XCircle, label: "Cancelled", value: "cancelled", count: count.spot },
                        { icon: CheckCircle2, label: "Delivered", value: "delivered", count: count.spot },
                        { icon: Clock, label: "Labels Expires Soon", value: "labels-expires-soon", count: count.spot }
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            // onClick={() => setSelectedTab(tab.value as QuoteCategory)}
                            className="flex flex-col h-max data-[state=active]:bg-primary/10 data-[state=active]:border-primary data-[state=active]:border data-[state=active]:text-primary py-2 cursor-pointer"
                        >
                            <tab.icon /> {tab.label} ({tab.count})
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all-active">
                    <DynamicTrackingTable filters={{ dateRange, search, selectedPackaging }} setCount={setCount} quoteCategory="all" />
                </TabsContent>
                <TabsContent value="saved">
                    <DynamicTrackingTable filters={{ dateRange, search, selectedPackaging }} setCount={setCount} quoteCategory="all" />

                </TabsContent>
                <TabsContent value="spot">
                    <DynamicTrackingTable filters={{ dateRange, search, selectedPackaging }} setCount={setCount} quoteCategory="all" />
                </TabsContent>
                <TabsContent value="favorite">
                    <DynamicTrackingTable filters={{ dateRange, search, selectedPackaging }} setCount={setCount} quoteCategory="all" />
                </TabsContent>
            </Tabs>
        </div >
    )
}