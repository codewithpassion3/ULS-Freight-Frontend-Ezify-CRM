"use client"

import { useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomDateRangePicker } from "@/components/ui/custom-date-picker"
import { MultiSelect } from "@/components/ui/multi-select"
import { Search, CheckCircle, Edit, MoreVertical, Trash2, Heart, SaveIcon, Truck } from "lucide-react"

import { DataTable } from "@/components/common/table/DataTable"
import { DataTablePagination } from "@/components/common/table/DataTablePagination"
import { columns } from "./components/ColumnsTableQuotes"
import { SortingState } from "@tanstack/react-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FavouriteQuotesTable from "./DynamicQuotesTable"
import AllQuotesTable from "./DynamicQuotesTable"
import DynamicQuotesTable from "./DynamicQuotesTable"
import FormDate from "@/components/common/form/fields/FormDate"
import { DatePicker } from "@/components/common/date-picker/DatePicker"
import { ShipmentTypes } from "@/components/shared/DynamicQuote/DynamicQuote"
import { DateRangePicker } from "@/components/common/date-picker/DateRangePicker"

const PACKAGING_TYPES = [
  { label: "Courier Pak", value: "COURIER_PAK" },
  { label: "FTL", value: "FTL" },
  { label: "LTL-Partial Truckload", value: "LTL" },
  { label: "Package", value: "PACKAGE" },
  { label: "Pallet", value: "PALLET" },
  { label: "Time Critical", value: "TIME_CRITICAL" },

]
export type QuoteCategory = "all" | "saved" | "spot" | "favorite"
export default function QuotesDashboardPage() {
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

  // const [quoteCategory, setQuoteCategory] = useState<"all quotes" | "saved" | "spot" | "favorite quotes">("all quotes")




  const parseCreatedDate = (dateCreated: string) => {
    const dateText = dateCreated.split("\n").slice(-1)[0]?.trim()
    if (!dateText) return null
    const parsed = new Date(dateText)
    if (Number.isNaN(parsed.getTime())) return null
    return parsed
  }


  return (
    <div className="container mx-auto pb-8 pt-20 px-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Quotes Dashboard</h1>
        {/* <p className="text-sm">
          <span className="text-[#0070c0] font-semibold flex items-center gap-1 cursor-pointer hover:underline">
            <span className="bg-[#0070c0] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
            Click here
          </span>{" "}
          <span className="text-muted-foreground">for a quick tour</span>
        </p> */}
      </div>

      {/* {showFilters ? (
        <div className="bg-muted/30 border border-border p-4 rounded-md mb-6 relative">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold text-primary">Search Quotes</h2>
            <div className="flex gap-4 text-sm text-primary">
              <button
                type="button"
                className="flex items-center gap-1 hover:underline"
              >
                <span className="text-xl leading-none -mt-1">&times;</span> Clear Filters
              </button>
              <button type="button" className="hover:underline" onClick={() => setShowFilters(false)}>
                Hide
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-end mt-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground block">Search by Date Range:</label>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground block">Search:</label>
              <div className="flex w-[240px]">
                <Input
                  placeholder="Search"
                  className="rounded-r-none"
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
            Show Filters
          </Button>
        </div>
      )} */}

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="gap-2 bg-white dark:bg-slate-800 border border-blue-200 p-1" >
          {[
            { icon: Heart, label: "All Quotes", value: "all", count: count.all },
            { icon: SaveIcon, label: "Saved", value: "saved", count: count.saved },
            { icon: Truck, label: "Spot Quotes", value: "spot", count: count.spot },
            { icon: Truck, label: "Favorite Quotes", value: "favorite", count: count.spot }
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              // onClick={() => setSelectedTab(tab.value as QuoteCategory)}
              className="data-[state=active]:bg-primary data-[state=active]:text-white py-2 cursor-pointer"
            >
              <tab.icon /> {tab.label} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <DynamicQuotesTable search={search} selectedPackaging={selectedPackaging} setCount={setCount} quoteCategory="all" />
        </TabsContent>
        <TabsContent value="saved">
          <DynamicQuotesTable search={search} selectedPackaging={selectedPackaging} setCount={setCount} quoteCategory="saved" />
        </TabsContent>
        <TabsContent value="spot">
          <DynamicQuotesTable search={search} selectedPackaging={selectedPackaging} setCount={setCount} quoteCategory="spot" />
        </TabsContent>
        <TabsContent value="favorite">
          <DynamicQuotesTable search={search} selectedPackaging={selectedPackaging} setCount={setCount} quoteCategory="favorite" />
        </TabsContent>
      </Tabs>
    </div >
  )
}