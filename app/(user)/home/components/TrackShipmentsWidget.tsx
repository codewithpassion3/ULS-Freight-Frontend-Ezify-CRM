import React from "react"
import { Search, CalendarCheck } from "lucide-react"

export default function TrackShipmentsWidget() {
    return (
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Search className="size-4 text-[#0072BC] dark:text-[#3da9fc]" /> Track Shipments
                </h3>
            </div>
            
            <div className="p-4">
                <div className="flex items-center mb-3">
                    <input 
                        type="text" 
                        placeholder="#0000000000" 
                        className="flex-1 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-[#0072BC]"
                    />
                    <button className="bg-[#0072BC] hover:bg-[#005f9e] text-white px-3 py-2 rounded-r flex items-center justify-center border border-[#0072BC] dark:border-transparent">
                        <Search className="size-4" />
                    </button>
                </div>
                
                <button className="text-sm font-medium text-[#0072BC] dark:text-[#3da9fc] hover:underline flex items-center gap-1.5">
                    <CalendarCheck className="size-4" />
                    View Today's Shipments (0)
                </button>
            </div>
        </div>
    )
}
