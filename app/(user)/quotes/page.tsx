"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomDateRangePicker } from "@/components/ui/custom-date-picker"
import { MultiSelect } from "@/components/ui/multi-select"
import { Search, ChevronDown, CheckCircle, Edit, MoreVertical, Trash2 } from "lucide-react"

const MOCK_QUOTES = [
  {
    id: 1,
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
  const [selectedTab, setSelectedTab] = useState("Saved")

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Quotes Dashboard</h1>
        <p className="text-sm">
          <span className="text-[#0070c0] font-semibold flex items-center gap-1 cursor-pointer hover:underline inline-flex">
            <span className="bg-[#0070c0] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
            Click here
          </span>{" "}
          <span className="text-slate-700">for a quick tour</span>
        </p>
      </div>

      <div className="bg-[#f8fbff] border border-blue-100 p-4 rounded-md mb-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-[#004e8c]">Search Quotes</h2>
          <div className="flex gap-4 text-sm text-[#0070c0]">
            <button className="flex items-center gap-1 hover:underline"><span className="text-xl leading-none -mt-1">&times;</span> Clear Filters</button>
            <button className="hover:underline">Hide</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-end mt-4">
          <div className="space-y-1">
            <label className="text-sm text-slate-600 block">Search by Date Range:</label>
            <CustomDateRangePicker />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-600 block">Search:</label>
            <div className="flex w-[240px]">
              <Input placeholder="Search" className="rounded-r-none bg-white border-slate-300" />
              <Button className="rounded-l-none bg-[#0070c0] hover:bg-[#005999] px-3">
                <Search size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-600 block">Packaging Type:</label>
            <MultiSelect options={PACKAGING_TYPES} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-4">
        <button 
          className={`flex items-center gap-1 px-6 py-3 text-sm font-medium transition-colors ${selectedTab === 'Favourites' ? 'border-b-2 border-orange-500 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setSelectedTab('Favourites')}
        >
          <span className="text-slate-400">♥</span> Favourites (0)
        </button>
        <button 
          className={`flex items-center gap-1 px-6 py-3 text-sm font-medium transition-colors ${selectedTab === 'Saved' ? 'border-b-2 border-orange-500 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setSelectedTab('Saved')}
        >
          <Save size={14} /> Saved (7)
        </button>
        <button 
          className={`flex items-center gap-1 px-6 py-3 text-sm font-medium transition-colors ${selectedTab === 'Spot Quotes' ? 'border-b-2 border-orange-500 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          onClick={() => setSelectedTab('Spot Quotes')}
        >
          <span className="text-slate-400">🚚</span> Spot Quotes (2)
        </button>
      </div>

      <div className="flex justify-between items-end mb-4">
        <Button variant="outline" className="text-slate-600 border-slate-300">
          <Trash2 size={16} className="mr-2" /> Delete
        </Button>
      </div>

      <p className="text-xs text-slate-600 mb-4">
        These quotes are based on the information provided and are valid <span className="font-semibold">5 business days</span> from the issue date.<br/>
        Rates are subject to change without prior notice based on carrier availability, weekly fuel surcharges, and currency exchange where applicable.
      </p>

      {/* Table */}
      <div className="border border-slate-200 rounded-md overflow-hidden bg-white mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 w-12"><Checkbox /></th>
                <th className="py-4 px-2 whitespace-nowrap"><SortLabel>Name</SortLabel></th>
                <th className="py-4 px-2 whitespace-nowrap"><SortLabel>Quote ID</SortLabel></th>
                <th className="py-4 px-2 whitespace-nowrap"><SortLabel>Transaction #</SortLabel></th>
                <th className="py-4 px-2 whitespace-nowrap"><SortLabel>Date Created</SortLabel></th>
                <th className="py-4 px-2 whitespace-nowrap"><SortLabel>Ship From</SortLabel></th>
                <th className="py-4 px-2 whitespace-nowrap"><SortLabel>Ship To</SortLabel></th>
                <th className="py-4 px-2"><SortLabel>Packaging Details</SortLabel></th>
                <th className="py-4 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_QUOTES.map((quote, index) => (
                <tr key={quote.id} className={`border-b border-slate-100 hover:bg-slate-50 ${index % 2 !== 0 ? 'bg-slate-50/50' : ''}`}>
                  <td className="p-4"><Checkbox /></td>
                  <td className="py-4 px-2 text-[#0070c0] font-medium whitespace-nowrap">{quote.name}</td>
                  <td className="py-4 px-2 text-[#0070c0] font-medium whitespace-nowrap">{quote.quoteId}</td>
                  <td className="py-4 px-2 text-slate-700 whitespace-nowrap">{quote.transactionId}</td>
                  <td className="py-4 px-2 text-slate-700 whitespace-nowrap leading-tight">
                    {quote.dateCreated.split('\n')[0]}<br/>
                    <span className="text-slate-500">{quote.dateCreated.split('\n')[1]}</span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">{quote.shipFrom}</td>
                  <td className="py-4 px-2 text-slate-700">{quote.shipTo}</td>
                  <td className="py-4 px-2 text-slate-700 leading-tight">
                    {quote.packagingDetails.split('\n')[0]}<br/>
                    {quote.packagingDetails.split('\n')[1]}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-[#0070c0] font-medium hover:underline whitespace-nowrap">
                        <Edit size={14} /> Edit
                      </button>
                      <button className="flex items-center gap-1 text-[#0070c0] font-medium hover:underline whitespace-nowrap">
                        <CheckCircle size={14} /> Book Now
                      </button>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mb-10">
        <Button variant="outline" className="text-slate-600 border-slate-300">
          <Trash2 size={16} className="mr-2" /> Delete
        </Button>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>View</span>
          <select className="border border-slate-300 rounded px-2 py-1 bg-white outline-none">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>of 7 Quotes</span>
        </div>
      </div>
    </div>
  )
}

function SortLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center cursor-pointer hover:text-slate-800">
      {children}
      <div className="flex flex-col ml-1">
        <span className="text-[8px] leading-[4px] text-slate-400">▲</span>
        <span className="text-[8px] leading-[4px] text-slate-400">▼</span>
      </div>
    </div>
  )
}

function Save({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  )
}
