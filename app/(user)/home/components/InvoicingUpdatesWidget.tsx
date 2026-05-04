import React from "react"
import { Gift, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function InvoicingUpdatesWidget() {
    return (
        // make it accordion
        <Accordion defaultValue="item-1" type="single" collapsible defaultChecked className="bg-white dark:bg-card border border-slate-200 dark:border-border overflow-hidden mb-6 rounded-sm">
            <AccordionItem value="item-1" className="rounded-t-none">
                <AccordionTrigger className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900/50 border-none cursor-pointer">
                    <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Invoicing Updates</h3>
                </AccordionTrigger>
                <AccordionContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Upcoming Invoices */}
                    <Link href="/invoices?tab=upcoming" className="no-underline! border border-slate-200 dark:border-slate-800 rounded flex flex-col justify-center overflow-hidden bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:shadow transition-shadow">
                        <div className="flex items-center gap-1.5 p-3 border-slate-100 dark:border-slate-800">
                            <Gift className="size-4 text-[#0072BC] dark:text-[#3da9fc]" />
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">5 Upcoming Invoices</span>
                        </div>
                    </Link>

                    {/* Overdue Invoices */}
                    <Link href="/invoices?tab=overdue" className="no-underline! border border-slate-200 dark:border-slate-800 rounded flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:shadow transition-shadow h-24">
                        <div className="flex items-center gap-1.5 p-3 border-b border-slate-100 dark:border-slate-800 h-full">
                            <AlertCircle className="size-4 text-orange-400" />
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">0 Overdue Invoices</span>
                        </div>

                    </Link>

                    {/* Urgent Invoices */}
                    <Link href="/invoices?tab=urgent" className="no-underline! border border-slate-200 dark:border-slate-800 rounded flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:shadow transition-shadow h-24">
                        <div className="flex items-center gap-1.5 p-3 border-b border-slate-100 dark:border-slate-800 h-full">
                            <AlertCircle className="size-4 text-red-600 dark:text-red-400" />
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">0 Urgent Invoices</span>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 h-0 flex-1"></div>
                    </Link>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}
