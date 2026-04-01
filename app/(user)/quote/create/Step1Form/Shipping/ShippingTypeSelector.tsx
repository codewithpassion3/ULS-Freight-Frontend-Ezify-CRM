import { Button } from "@/components/ui/button"
import { ArrowRight, Bell, Boxes, Clock, Info, Mail, Package, Truck, WalletCards } from "lucide-react"
import { ShipmentOptions } from "../../CreateQuote"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Loader } from "@/components/common/Loader"

interface QuoteShippingTypeSelectorProps {
    shipmentType: ShipmentOptions[keyof ShipmentOptions]
    setShipmentType: (type: ShipmentOptions[keyof ShipmentOptions]) => void
}

const shipmentTypes = [
    { label: "PALLET", icon: <WalletCards /> },
    { label: "PACKAGE", icon: <Package /> },
    { label: "COURIER_PAK", icon: <Boxes /> },
    { label: "STANDARD_FTL", icon: <Truck /> },
]

export const ShippingTypeSelector = ({ shipmentType, setShipmentType }: QuoteShippingTypeSelectorProps) => {
    const quoteId = useSearchParams().get("id")

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
    console.log("cachedSingleQuote", cachedSingleQuote)
    if (quoteId) {
        if (isLoading || isPending) {
            return <Loader />
        }
    }
    return (
        <div className="border border-border rounded-md p-4 bg-white dark:bg-card">
            <div className="flex items-center justify-between pb-4">
                <h2 className="font-semibold flex items-center gap-2 text-lg">
                    <span>
                        <ArrowRight />
                    </span>
                    Select Shipment Type
                </h2>
                <button type="button" className="text-sm text-[#0070c0] flex items-center gap-1 hover:underline font-medium"><Info size={14} /> Shipment Types</button>
            </div>
            {/* Use tab instead of buttons */}
            <div className="flex flex-wrap gap-4">
                {shipmentTypes.map((type) => (
                    <Button
                        key={type.label}
                        type="button"
                        variant={shipmentType === type.label ? "default" : "outline"}
                        className={`flex items-center gap-2 capitalize ${shipmentType === type.label ? "bg-blue-50 dark:bg-gray-900  text-[#0070c0] border-[#0070c0] hover:bg-blue-100" : "border-slate-300 dark:bg-transparent"}`}
                        onClick={() => setShipmentType(type.label as ShipmentOptions[keyof ShipmentOptions])}
                    >
                        {type.icon} {type.label === "STANDARD_FTL" ? "FTL" : type.label.toLowerCase().replace("_", " ")}
                    </Button>
                ))}

            </div>
        </div>
    )
}