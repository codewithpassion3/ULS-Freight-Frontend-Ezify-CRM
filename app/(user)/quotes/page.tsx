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

const MOCK_QUOTES = [
  {
    id: 1,
    isSpot: true,
    isFavourite: false,
    name: "Abida ON to CA",
    quoteId: "WTMRYXZD",
    transactionId: "41379278",
    dateCreated: "11:11 AM\nMar 5, 2026",
    shipFrom: "Woodbridge, ON",
    shipTo: "San Jose, CA",
    packagingDetails: "1 Pallet\nTotal Weight: 340 lbs",
  },
  {
    id: 2,
    isSpot: true,
    isFavourite: false,
    name: "sourav",
    quoteId: "1S6GDB3B",
    transactionId: "41344552",
    dateCreated: "12:13 PM\nMar 4, 2026",
    shipFrom: "Bolton, ON",
    shipTo: "Conneaut, OH",
    packagingDetails: "1 Pallet\nTotal Weight: 400 lbs",
  },
  {
    id: 3,
    isSpot: false,
    isFavourite: false,
    name: "MVA QC to QC",
    quoteId: "5MX2MIQM",
    transactionId: "41339951",
    dateCreated: "11:11 AM\nMar 4, 2026",
    shipFrom: "L'assomption, QC",
    shipTo: "Saint-Laurent, QC",
    packagingDetails: "2 Pallets\nTotal Weight: 789 lbs",
  },
  {
    id: 4,
    isSpot: false,
    isFavourite: false,
    name: "MVA AB to BC",
    quoteId: "N2QYYZ1W",
    transactionId: "41316661",
    dateCreated: "3:14 PM\nMar 3, 2026",
    shipFrom: "Edmonton, AB",
    shipTo: "Coquitlam, BC",
    packagingDetails: "1 Pallet\nTotal Weight: 400 lbs",
  },
  {
    id: 5,
    isSpot: false,
    isFavourite: false,
    name: "Soyeb ON to SK",
    quoteId: "F2W6NCYB",
    transactionId: "41210055",
    dateCreated: "2:09 PM\nFeb 27, 2026",
    shipFrom: "Mississauga, ON",
    shipTo: "Stillwater, OK",
    packagingDetails: "2 Pallets\nTotal Weight: 850 lbs",
  },
  {
    id: 6,
    isSpot: false,
    isFavourite: false,
    name: "UU Cargo AB to SK",
    quoteId: "LC722U7L",
    transactionId: "41201188",
    dateCreated: "11:52 AM\nFeb 27, 2026",
    shipFrom: "Calgary, AB",
    shipTo: "Broderick, SK",
    packagingDetails: "2 Pallets\nTotal Weight: 600 lbs",
  },
  {
    id: 7,
    isSpot: false,
    isFavourite: false,
    name: "MVA MB to QC",
    quoteId: "1OO06AXM",
    transactionId: "41173125",
    dateCreated: "2:03 PM\nFeb 26, 2026",
    shipFrom: "Winnipeg, MB",
    shipTo: "L'assomption, QC",
    packagingDetails: "1 Pallet\nTotal Weight: 200 lbs",
  }
]

const PACKAGING_TYPES = [
  { label: "Courier Pak", value: "courier-pak" },
  { label: "Envelope", value: "envelope" },
  { label: "FTL", value: "ftl" },
  { label: "LTL-Partial Truckload", value: "ltl" },
  { label: "Package", value: "package" },
  { label: "Pallet", value: "pallet" },
  { label: "Time Critical", value: "time-critical" },
  { label: "White Glove", value: "white-glove" },
]

export default function QuotesDashboardPage() {
  const [selectedTab, setSelectedTab] = useState<"Favourites" | "Saved" | "Spot Quotes">("Saved")
  const [searchText, setSearchText] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: string; to?: string }>({})
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState(1)

  const favouritesCount = useMemo(() => MOCK_QUOTES.filter((q) => q.isFavourite).length, [])
  const savedCount = useMemo(() => MOCK_QUOTES.filter((q) => !q.isFavourite).length, [])
  const spotCount = useMemo(() => MOCK_QUOTES.filter((q) => q.isSpot).length, [])

  const parseCreatedDate = (dateCreated: string) => {
    const dateText = dateCreated.split("\n").slice(-1)[0]?.trim()
    if (!dateText) return null
    const parsed = new Date(dateText)
    if (Number.isNaN(parsed.getTime())) return null
    return parsed
  }

  const isPackagingMatch = (quote: (typeof MOCK_QUOTES)[number]) => {
    if (selectedPackaging.length === 0) return true
    const pd = quote.packagingDetails.toLowerCase()

    return selectedPackaging.some((type) => {
      switch (type) {
        case "pallet":
          return pd.includes("pallet")
        case "package":
          return pd.includes("package")
        case "envelope":
          return pd.includes("envelope")
        case "courier-pak":
          return pd.includes("courier") || pd.includes("pak")
        case "ftl":
          return pd.includes("ftl")
        case "ltl":
          return pd.includes("ltl") || pd.includes("truckload")
        case "time-critical":
          return pd.includes("time") || pd.includes("critical")
        case "white-glove":
          return pd.includes("white") || pd.includes("glove")
        default:
          return pd.includes(type.replace("-", " "))
      }
    })
  }

  const visibleQuotes = useMemo(() => {
    const q = searchText.trim().toLowerCase()
    const from = dateRange.from ? new Date(`${dateRange.from}T00:00:00`) : null
    const to = dateRange.to ? new Date(`${dateRange.to}T23:59:59.999`) : null

    const tabFiltered = MOCK_QUOTES.filter((quote) => {
      if (selectedTab === "Favourites") return quote.isFavourite
      if (selectedTab === "Spot Quotes") return quote.isSpot
      return !quote.isFavourite
    })

    return tabFiltered.filter((quote) => {
      const haystack = `${quote.name} ${quote.quoteId} ${quote.transactionId} ${quote.shipFrom} ${quote.shipTo} ${quote.packagingDetails}`.toLowerCase()
      const matchesSearch = q.length === 0 || haystack.includes(q)

      const created = parseCreatedDate(quote.dateCreated)
      const matchesDate =
        (!from && !to) ||
        (created &&
          (!from || created.getTime() >= from.getTime()) &&
          (!to || created.getTime() <= to.getTime()))

      const matchesPackaging = isPackagingMatch(quote)

      return matchesSearch && matchesDate && matchesPackaging
    })
  }, [dateRange.from, dateRange.to, searchText, selectedPackaging, selectedTab])

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Quotes Dashboard</h1>
        <p className="text-sm">
          <span className="text-[#0070c0] font-semibold flex items-center gap-1 cursor-pointer hover:underline">
            <span className="bg-[#0070c0] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
            Click here
          </span>{" "}
          <span className="text-muted-foreground">for a quick tour</span>
        </p>
      </div>

      {showFilters ? (
        <div className="bg-muted/30 border border-border p-4 rounded-md mb-6 relative">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold text-[#004e8c]">Search Quotes</h2>
            <div className="flex gap-4 text-sm text-[#0070c0]">
              <button
                type="button"
                className="flex items-center gap-1 hover:underline"
                onClick={() => {
                  setSearchText("")
                  setDateRange({})
                  setSelectedPackaging([])
                }}
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
              <CustomDateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground block">Search:</label>
              <div className="flex w-[240px]">
                <Input
                  placeholder="Search"
                  className="rounded-r-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
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
      )}

      {/* Tabs */}
      <div className="flex border-b border-border mb-4">
        {[
          { icon: Heart, label: "Favourites", count: favouritesCount },
          { icon: SaveIcon, label: "Saved", count: savedCount },
          { icon: Truck, label: "Spot Quotes", count: spotCount }
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-1 px-6 py-3 text-sm font-medium transition-colors ${selectedTab === tab.label ? 'border-b-2 border-orange-500 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setSelectedTab(tab.label as "Favourites" | "Saved" | "Spot Quotes")}
          >
            <tab.icon /> {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="flex justify-between items-end mb-4">
        <Button variant="outline" className="text-muted-foreground border-border">
          <Trash2 size={16} className="mr-2" /> Delete
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        These quotes are based on the information provided and are valid <span className="font-semibold">5 business days</span> from the issue date.<br />
        Rates are subject to change without prior notice based on carrier availability, weekly fuel surcharges, and currency exchange where applicable.
      </p>

      {/* Table */}
      <div className="bg-background mb-4">
        <DataTable
          columns={columns}
          data={visibleQuotes}
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
    </div>
  )
}

function Save({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
  )
}
