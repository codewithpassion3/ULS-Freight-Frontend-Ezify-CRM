import { CheckCircle2, Truck, Eye, AlertCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TrackingUpdatesWidget() {
    return (
        <Accordion type="single" collapsible defaultChecked className="bg-white dark:bg-card border border-slate-200 dark:border-border overflow-hidden mb-6 rounded-sm">
            <AccordionItem value="item-1" className="rounded-t-none">
                <AccordionTrigger className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-border bg-slate-50/50 dark:bg-slate-900/50 border-none cursor-pointer">
                    <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Tracking Updates</h3>
                </AccordionTrigger>

                <AccordionContent className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Ready For Shipping */}
                    <div className="border border-slate-200 dark:border-slate-800 rounded flex flex-col items-center justify-center pt-6 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow transition-shadow cursor-pointer">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="size-6 text-primary dark:text-[#3da9fc]" />
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">0</span>
                        </div>
                        <div className="w-full bg-[#dbeaf4] dark:bg-[#1a365d] text-center py-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            Ready For Shipping
                        </div>
                    </div>

                    {/* In Transit */}
                    <div className="border border-slate-200 dark:border-slate-800 rounded flex flex-col items-center justify-center pt-6 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow transition-shadow cursor-pointer">
                        <div className="flex items-center gap-2 mb-4">
                            <Truck className="size-6 text-[#0072BC] dark:text-[#3da9fc]" />
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">3</span>
                        </div>
                        <div className="w-full bg-[#dbeaf4] dark:bg-[#1a365d] text-center py-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            In Transit
                        </div>
                    </div>

                    {/* My Watchlist */}
                    <div className="border border-slate-200 dark:border-slate-800 rounded flex flex-col items-center justify-center pt-6 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow transition-shadow cursor-pointer">
                        <div className="flex items-center gap-2 mb-4">
                            <Eye className="size-6 text-[#0072BC] dark:text-[#3da9fc]" />
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">2</span>
                        </div>
                        <div className="w-full bg-[#dbeaf4] dark:bg-[#1a365d] text-center py-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            My Watchlist
                        </div>
                    </div>

                    {/* Exceptions */}
                    <div className="border border-slate-200 dark:border-slate-800 rounded flex flex-col items-center justify-center pt-6 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow transition-shadow cursor-pointer">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="size-6 text-red-600 dark:text-red-400" />
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">0</span>
                        </div>
                        <div className="w-full bg-slate-200/50 dark:bg-slate-800/50 text-center py-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                            Exceptions
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
