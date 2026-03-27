import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Info, Truck } from "lucide-react"
import { QuoteSchemaTypes } from "@/lib/validations/quote/spot-quote-schema"
import { FieldErrors } from "react-hook-form"
import { ShipmentType } from "../../step-1-form"


interface ShippingTypeSelectorProps {
    shipmentType: ShipmentType
    setShipmentType: (type: ShipmentType) => void
    errors: FieldErrors<QuoteSchemaTypes>
}

export const ShippingTypeSelector = ({ shipmentType, setShipmentType, errors }: ShippingTypeSelectorProps) => {
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
                <Button
                    type="button"
                    variant={shipmentType === "LTL-Partial Truckload" ? "default" : "outline"}
                    className={`flex items-center gap-2 ${shipmentType === "LTL-Partial Truckload" ? "bg-blue-50 dark:bg-gray-900  text-[#0070c0] border-[#0070c0] hover:bg-blue-100" : "border-slate-300 dark:bg-transparent"}`}
                    onClick={() => setShipmentType("LTL-Partial Truckload")}
                >
                    <Truck size={16} /> LTL-Partial Truckload
                </Button>
                <Button
                    type="button"
                    variant={shipmentType === "Full Truck Load" ? "default" : "outline"}
                    className={`flex items-center gap-2 ${shipmentType === "Full Truck Load" ? "bg-blue-50 dark:bg-gray-900  text-[#0070c0] border-[#0070c0] hover:bg-blue-100" : "border-slate-300 dark:bg-transparent"}`}
                    onClick={() => setShipmentType("Full Truck Load")}
                >
                    <Truck size={16} /> Full Truck Load
                </Button>
                <Button
                    type="button"
                    variant={shipmentType === "Time Critical" ? "default" : "outline"}
                    className={`flex items-center gap-2 ${shipmentType === "Time Critical" ? "bg-blue-50 dark:bg-gray-900  text-[#0070c0] border-[#0070c0] hover:bg-blue-100" : "border-slate-300 dark:bg-transparent"}`}
                    onClick={() => setShipmentType("Time Critical")}
                >
                    <Clock size={16} /> Time Critical
                </Button>
            </div>
            {errors.shipmentType && <p className="text-sm text-red-500 mt-2">{errors.shipmentType.message}</p>}
        </div>
    )
}