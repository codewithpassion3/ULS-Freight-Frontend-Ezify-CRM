import React from "react"
import { Gift, AlertCircle } from "lucide-react"

export default function InvoicingUpdatesWidget() {
    return (
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Invoicing Updates</h3>
                <button className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">Hide</button>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Upcoming Invoices */}
                <div className="border border-slate-200 dark:border-slate-800 rounded flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:shadow transition-shadow">
                    <div className="flex items-center gap-1.5 p-3 border-b border-slate-100 dark:border-slate-800">
                        <Gift className="size-4 text-[#0072BC] dark:text-[#3da9fc]" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">5 Upcoming Invoices</span>
                    </div>
                    <div className="bg-[#dbeaf4] dark:bg-[#1a365d] p-3 flex flex-col justify-center flex-1">
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">$455.12 CAD</div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">$497.31 USD</div>
                    </div>
                </div>

                {/* Overdue Invoices */}
                <div className="border border-slate-200 dark:border-slate-800 rounded flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:shadow transition-shadow h-24">
                    <div className="flex items-center gap-1.5 p-3 border-b border-slate-100 dark:border-slate-800 h-full">
                        <AlertCircle className="size-4 text-orange-400" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">0 Overdue Invoices</span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 h-0 flex-1"></div>
                </div>

                {/* Urgent Invoices */}
                <div className="border border-slate-200 dark:border-slate-800 rounded flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:shadow transition-shadow h-24">
                    <div className="flex items-center gap-1.5 p-3 border-b border-slate-100 dark:border-slate-800 h-full">
                        <AlertCircle className="size-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">0 Urgent Invoices</span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 h-0 flex-1"></div>
                </div>
            </div>
        </div>
    )
}
