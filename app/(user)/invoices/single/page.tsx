"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, FileText, Download, Calendar } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { Loader } from "@/components/common/Loader"

export default function SingleInvoicePage() {
    const searchParams = useSearchParams()
    const invoiceId = searchParams.get("id")

    const { data: quote, isLoading, isPending } = useQuery({
        queryKey: ["quote", invoiceId],
        queryFn: () => getSingleQuote(invoiceId!),
        retry: 1,
        enabled: !!invoiceId
    })

    if (isLoading || isPending) return <Loader className="py-20" />
    // if quote.shipment does exist add exception for empty UI
    if (!quote.shipment) return null

    const handleCSVDownload = () => {
        const headers = [
            "Tracking/BOL #",
            "Reference Number",
            "Original Charge",
            "Adjustment",
            "Additional",
            "Tax",
            "Applicable Charge"
        ];

        const rows = [
            [
                quote.shipment.trackingNumber || "N/A",
                quote.shipment.referenceNumber || "N/A",
                quote.shipment.totalBaseCharge || "N/A" + quote.shipment.currency,
                quote.shipment.adjustment || "N/A",
                quote.shipment.totalSurcharges || "N/A",
                quote.shipment.totalTax || "N/A",
                quote.shipment.totalBaseCharge || "N/A"
            ]
        ];

        const csvArray = [
            headers,
            ...rows
        ];

        const csvContent =
            "\uFEFF" + // BOM for Excel
            csvArray.map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice_${invoiceId || "FC15017348"}_shipments.csv`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    function calculateDaysOld(dateString: string): string {
        const createdDate = new Date(dateString);
        const today = new Date();

        // Reset hours/minutes/seconds for both to ensure accurate day diff
        createdDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInMs = today.getTime() - createdDate.getTime();
        const daysOld = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        return `${daysOld} Days`;
    }

    return (
        <div className="container mx-auto pb-8 pt-20 px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Invoice Summary</h1>
                    <div className="flex flex-col text-sm text-[#0070c0] font-medium mt-2">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Upcoming</span>
                        </div>
                        <span className="text-muted-foreground text-xs ml-5">Due May 12, 2026</span>
                    </div>
                </div>
                <Button className="bg-[#0070c0] hover:bg-[#005999] px-8 mt-4 md:mt-0">
                    Pay Invoice
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Invoice Details */}
                <div className="lg:col-span-2">
                    <Card className="rounded-md border shadow-sm">
                        <CardHeader className="bg-slate-50 border-b pb-4 pt-4">
                            <CardTitle className="text-base font-semibold flex items-center text-slate-800">
                                <Info className="w-5 h-5 mr-2 text-slate-700" />
                                Invoice Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* Invoice Overview */}
                            <div className="p-6">
                                <h3 className="text-sm font-semibold text-[#0070c0] flex items-center mb-4">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Invoice Overview
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Invoice Number:</span>
                                        <span className="font-medium text-right md:text-left">{quote?.shipment?.id || 'FC15017348'}</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Invoice Amount:</span>
                                        <span className="font-medium text-right md:text-left">{quote?.shipment?.totalBaseCharge || 'N/A' + quote?.shipment?.currency || 'N/A'}</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Invoice Date:</span>
                                        <span className="font-medium text-right md:text-left">{quote?.shipment?.createdAt || 'N/A'}</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Total Taxes:</span>
                                        <span className="font-medium text-right md:text-left">{quote?.shipment?.totalTax || 'N/A' + quote?.shipment?.currency || 'N/A'}</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Invoice Age:</span>
                                        {/* // calculate days old from date created */}
                                        <span className="font-medium text-right md:text-left">
                                            {
                                                calculateDaysOld(quote?.shipment?.createdAt)
                                            }
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Amount Due:</span>
                                        <span className="font-bold text-right md:text-left">{quote?.shipment?.totalBaseCharge || 'N/A' + quote?.shipment?.currency || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Invoice Breakdown */}
                            <div className="p-6">
                                <h3 className="text-sm font-semibold text-[#0070c0] flex items-center mb-4">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Invoice Breakdown
                                </h3>
                                <div className="w-full md:w-1/2 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Base/Freight Charge:</span>
                                        <span className="font-medium">$105.48</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">All Accessorials:</span>
                                        <span className="font-medium">$111.04</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Shipments Table */}
                            <div className="p-6">
                                <h3 className="text-sm font-semibold text-slate-800 mb-4">
                                    Total # Of Shipments: 1
                                </h3>
                                <div className="overflow-x-auto border rounded-md">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-xs text-muted-foreground border-b">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">Tracking/BOL #</th>
                                                <th className="px-4 py-3 font-medium">Reference Number</th>
                                                <th className="px-4 py-3 font-medium">Original Charge <Info className="inline w-3 h-3" /></th>
                                                <th className="px-4 py-3 font-medium">Adjustment <Info className="inline w-3 h-3" /></th>
                                                <th className="px-4 py-3 font-medium">Additional <Info className="inline w-3 h-3" /></th>
                                                <th className="px-4 py-3 font-medium">Tax</th>
                                                <th className="px-4 py-3 font-medium">Applicable Charge <Info className="inline w-3 h-3" /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b last:border-0 hover:bg-slate-50/50">
                                                <td className="px-4 py-4 text-[#0070c0]">{quote?.shipment?.trackingNumber || "N/A"}</td>
                                                <td className="px-4 py-4 text-[#0070c0]">{quote?.shipment?.referenceNumber || "N/A"}</td>
                                                <td className="px-4 py-4">{quote?.shipment?.originalCharge || "N/A"} {quote?.shipment?.currency || "N/A"}</td>
                                                <td className="px-4 py-4">{quote?.shipment?.adjustment || "N/A"} {quote?.shipment?.currency || "N/A"}</td>
                                                <td className="px-4 py-4">{quote?.shipment?.totalSurcharges || "N/A"} {quote?.shipment?.currency || "N/A"}</td>
                                                <td className="px-4 py-4">{quote?.shipment?.totalTax || "N/A"} {quote?.shipment?.currency || "N/A"}</td>
                                                <td className="px-4 py-4">{quote?.shipment?.totalBaseCharge || "N/A"} {quote?.shipment?.currency || "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <Button variant="outline" className="text-[#0070c0] border-[#0070c0]" onClick={handleCSVDownload}>
                                        CSV Download
                                    </Button>
                                    <div className="text-sm text-muted-foreground flex items-center">
                                        View
                                        <select className="mx-2 border rounded p-1 text-slate-800 outline-none">
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                        of 1 Shipments
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8">
                                    <Button className="bg-[#0070c0] hover:bg-[#005999] px-8">
                                        Pay Invoice
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Documents */}
                <div className="lg:col-span-1">
                    <Card className="rounded-md border shadow-sm">
                        <CardHeader className="bg-white border-b pb-4 pt-4">
                            <CardTitle className="text-base font-semibold text-slate-800">
                                Invoice Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-sm font-medium">Detailed Invoice</span>
                                <Button variant="ghost" className="text-[#0070c0] hover:bg-[#0070c0]/10 flex items-center h-auto py-1 px-2" onClick={() => window.open(`/invoices/single/pdf?id=${invoiceId || 'FC15017348'}`, '_blank')}>
                                    <Download className="w-4 h-4 mr-1" />
                                    <span className="text-sm">Download</span>
                                </Button>
                            </div>
                            <div className="flex justify-center">
                                <Button variant="outline" className="w-full text-[#0070c0] border-[#0070c0] hover:bg-[#0070c0]/5 flex items-center justify-center" onClick={() => window.open(`/invoices/single/pdf?id=${invoiceId || 'FC15017348'}`, '_blank')}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download All
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
