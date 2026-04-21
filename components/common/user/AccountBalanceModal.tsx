import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from "recharts"
import { DollarSign } from "lucide-react"

interface AccountBalanceModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AccountBalanceModal({ open, onOpenChange }: AccountBalanceModalProps) {
    const data = [
        { name: "Available Balance", value: 1080.62, color: "#4CAF50" },
        { name: "Shipments (Not Invoiced)", value: 241.31, color: "#0288D1" },
        { name: "Unpaid Invoices", value: 1678.07, color: "#29B6F6" },
    ]

    const totalLimit = 3000.0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl sm:max-w-2xl">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                        <div className="flex bg-zinc-800 text-white rounded-full p-1 items-center justify-center h-6 w-6">
                            <DollarSign className="h-4 w-4" />
                        </div>
                        Available Balance Breakdown
                    </DialogTitle>
                </DialogHeader>

                <div className="pt-4">
                    <p className="text-sm">
                        Total Amount Limit: <span className="font-semibold">${totalLimit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-between mt-8 mb-12">
                        {/* Chart */}
                        <div className="h-[200px] w-full md:w-1/2 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={0}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        formatter={(value: any) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className="w-full md:w-1/2 mt-6 md:mt-0 space-y-4">
                            {data.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div
                                        className="w-6 h-6 rounded-full shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-sm font-medium">
                                        {item.name}: <span className="font-bold">${item.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details List */}
                    <div className="border-t">
                        {/* Unpaid Invoices */}
                        <div className="flex items-center justify-between py-4 border-b">
                            <div className="flex items-center gap-12 w-full max-w-[300px]">
                                <span className="text-sm text-right w-[180px]">Unpaid Invoices</span>
                                <span className="text-sm font-semibold w-[100px] text-right">$1,678.07</span>
                            </div>
                            <div className="flex-1 ml-4 text-left">
                                <a href="#" className="text-sm text-blue-600 hover:underline">View Unpaid Invoices</a>
                            </div>
                        </div>

                        {/* Shipments */}
                        <div className="flex items-center justify-between py-4 border-b">
                            <div className="flex items-center gap-12 w-full max-w-[300px]">
                                <span className="text-sm text-right w-[180px]">Shipments (Not Invoiced)</span>
                                <span className="text-sm font-semibold w-[100px] text-right">$241.31</span>
                            </div>
                            <div className="flex-1 ml-4 text-left">
                                <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                    View Shipments
                                    <span className="text-xs">^</span> {/* Caret for expansion style */}
                                </button>
                            </div>
                        </div>

                        {/* Available Balance */}
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-12 w-full max-w-[300px]">
                                <span className="text-sm text-right w-[180px]">Available Balance</span>
                                <span className="text-sm font-semibold w-[100px] text-right">$1,080.62</span>
                            </div>
                            <div className="flex-1 ml-4 text-left">
                                {/* Empty for alignment */}
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}