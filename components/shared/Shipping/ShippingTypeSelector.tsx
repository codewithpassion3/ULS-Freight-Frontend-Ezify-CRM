import { Button } from "@/components/ui/button"
import { ArrowRight, Bell, Boxes, CircleArrowRight, Clock, Info, Mail, Package, Truck, WalletCards } from "lucide-react"
import { ShipmentOptions } from "../DynamicQuote/DynamicQuote"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Loader } from "@/components/common/Loader"

interface QuoteShippingTypeSelectorProps {
    shipmentType: ShipmentOptions[keyof ShipmentOptions]
    setShipmentType: (type: ShipmentOptions[keyof ShipmentOptions]) => void
    quoteType: keyof ShipmentOptions
}



export const ShippingTypeSelector = ({ shipmentType, setShipmentType, quoteType }: QuoteShippingTypeSelectorProps) => {
    const quoteId = useSearchParams().get("id")
    const isEditing = !!quoteId
    const pathname = usePathname()
    const isShipment = pathname.includes("shipment")
    const shipmentTypes = () => {
        if (quoteType === "SPOT") {
            return [
                { name: "SPOT_LTL", label: "LTL-Partial Truckload", icon: <WalletCards /> },
                { name: "SPOT_FTL", label: "Full Truck Load", icon: <Truck /> },
                { name: "TIME_CRITICAL", label: "Time Critical", icon: <Clock /> },
            ]
        }
        return [
            { name: "PALLET", label: "Pallet", icon: <WalletCards /> },
            { name: "PACKAGE", label: "Package", icon: <Package /> },
            { name: "COURIER_PAK", label: "Courier Pak", icon: <Boxes /> },
            { name: "STANDARD_FTL", label: "FTL", icon: <Truck /> },
        ]
    }
    // console.log("shipmentTypes", shipmentTypes())
    const { data: cachedSingleQuote, isLoading, isPending } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
        enabled: !!quoteId,
        // Optional: prevent automatic refetch
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
    useEffect(() => {
        if (cachedSingleQuote) {
            setShipmentType(cachedSingleQuote.quote.shipmentType)
        }
    }, [cachedSingleQuote])
    // console.log("cachedSingleQuote", cachedSingleQuote)
    if (quoteId) {
        if (isLoading || isPending) {
            return <Loader />
        }
    }
    return (
        <div className="border border-border rounded-md p-4 bg-white dark:bg-card shadow-lg">
            <div className="flex items-center justify-between pb-4">
                <h2 className="font-semibold flex items-center gap-2 text-lg">
                    <span>
                        <CircleArrowRight />
                    </span>
                    {isShipment ? "Packaging" : "Select Shipment Type"}
                </h2>
                <button type="button" className="text-sm text-[#0070c0] flex items-center gap-1 hover:underline font-medium"><Info size={14} /> Shipment Types</button>
            </div>
            {/* Use tab instead of buttons */}
            <div className="flex flex-wrap gap-4">
                {shipmentTypes().map((type) => (
                    <Button
                        key={type.name}
                        type="button"
                        disabled={isEditing}
                        variant={shipmentType === type.name ? "default" : "outline"}
                        className={`flex items-center gap-2 capitalize ${shipmentType === type.name ? "bg-blue-50 dark:bg-gray-900  text-[#0070c0] border-[#0070c0] hover:bg-blue-100" : "border-slate-300 dark:bg-transparent"}`}
                        onClick={() => setShipmentType(type.name as ShipmentOptions[keyof ShipmentOptions])}
                    >
                        {type.icon} {type.label}
                    </Button>
                ))}

            </div>
        </div>
    )
}