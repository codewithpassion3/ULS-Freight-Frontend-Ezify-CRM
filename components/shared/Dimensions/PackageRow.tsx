// One row. Knows nothing about the field array or form state above it.
import { useFormContext, Controller } from "react-hook-form"
import { X, PackageOpen, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import AddPackage from "@/app/(user)/packages/AddPackage"
import { FREIGHT_CLASS_OPTIONS } from "./constants"
import type { ShipmentOptions } from "../DynamicQuote/DynamicQuote"
import { usePathname } from "next/navigation"
import PackageSelectionModal from "@/app/(user)/packages/PackageSelectionModal"
import { useEffect } from "react"
import { calculateClass } from "./DensityCalculatorModal"

type Props = {
    index: number
    fieldId: string
    shipmentType: ShipmentOptions[keyof ShipmentOptions]
    canRemove: boolean
    onRemove: (index: number) => void
    onClear: (index: number) => void
    open: boolean
    setOpen: (v: boolean) => void
}

export function PackageRow({ index, fieldId, shipmentType, canRemove, onRemove, onClear, open, setOpen }: Props) {
    const { register, watch, setValue, formState: { errors } } = useFormContext<any>()

    const measurementUnit = watch("lineItem.measurementUnit")
    const isImperial = measurementUnit === "IMPERIAL"
    const lengthUnit = isImperial ? "in" : "cm"
    const weightUnit = isImperial ? "lbs" : "kg"
    const rowErrors = (errors as any)?.lineItem?.units?.[index]

    const pathname = usePathname()
    const isShipment = pathname.includes("shipment")
    // Snapshot current row values for the SavePackage dialog
    const rowSnapshot = {
        measurementUnit,
        length: watch(`lineItem.units.${index}.length`) as number | undefined,
        width: watch(`lineItem.units.${index}.width`) as number | undefined,
        height: watch(`lineItem.units.${index}.height`) as number | undefined,
        weight: watch(`lineItem.units.${index}.weight`) as number | undefined,
        freightClass: watch(`lineItem.units.${index}.freightClass`),
        nmfc: watch(`lineItem.units.${index}.nmfc`),
        shipmentType: watch(`lineItem.units.${index}.shipmentType`) as any,
        unitsOnPallet: watch(`lineItem.units.${index}.unitsOnPallet`) as number | undefined,
        palletUnitType: watch(`lineItem.units.${index}.palletUnitType`),
        description: watch(`lineItem.units.${index}.description`),
    }
    // if l,w,h,wg have values call calculate class function and set freight class
    useEffect(() => {
        const { length, width, height, weight } = rowSnapshot
        if (length && width && height && weight) {
            const res = calculateClass(length, width, height, weight, measurementUnit)
            setValue(`lineItem.units.${index}.freightClass`, res?.classEstim)
        }
    }, [rowSnapshot.length, rowSnapshot.width, rowSnapshot.height, rowSnapshot.weight])

    return (
        <div key={fieldId} className="space-y-4 pb-6 border-b last:border-0 relative group">
            {/* Row header */}

            {/* Dimension fields */}
            <div className="flex items-start gap-2">
                <span className="mt-8 mr-2">{index + 1}</span>
                <GlobalForm
                    formWrapperClassName="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 gap-4 items-start"
                    fields={[
                        {
                            name: `lineItem.units.${index}.length`,
                            label: `Length (${lengthUnit})*`,
                            type: "number",
                            placeholder: "L",
                            min: 0,
                            labelClassName: "text-xs text-muted-foreground",
                            show: !(isShipment && shipmentType === "COURIER_PAK")
                        },
                        {
                            name: `lineItem.units.${index}.width`,
                            label: `Width (${lengthUnit})*`,
                            type: "number",
                            placeholder: "W",
                            min: 0,
                            labelClassName: "text-xs text-muted-foreground",
                            className: rowErrors?.width ? "border-red-500" : "",
                            show: !(isShipment && shipmentType === "COURIER_PAK")
                        },
                        {
                            name: `lineItem.units.${index}.height`,
                            label: `Height (${lengthUnit})*`,
                            type: "number",
                            placeholder: "H",
                            min: 0,
                            labelClassName: "text-xs text-muted-foreground",
                            className: rowErrors?.height ? "border-red-500" : "",
                            show: !(isShipment && shipmentType === "COURIER_PAK")
                        },
                        {
                            name: `lineItem.units.${index}.weight`,
                            label: `Weight (${weightUnit})*`,
                            type: "number",
                            placeholder: "W",
                            min: 0,
                            labelClassName: "text-xs text-muted-foreground",
                            className: rowErrors?.weight ? "border-red-500" : "",
                        },
                        {
                            label: "Freight Class*",
                            type: "select",
                            name: `lineItem.units.${index}.freightClass`,
                            options: FREIGHT_CLASS_OPTIONS,
                            labelClassName: "text-xs text-muted-foreground",
                            placeholder: "Select Freight Class",
                            show: shipmentType === "PALLET" || shipmentType === "SPOT_LTL"
                        },
                        {
                            name: `lineItem.units.${index}.nmfc`,
                            label: `NMFC`,
                            type: "text",
                            placeholder: "NMFC",
                            labelClassName: "text-xs text-muted-foreground",
                            show: shipmentType === "PALLET"
                        },
                        {
                            name: `lineItem.units.${index}.palletUnitType`,
                            label: "Type*",
                            type: "select",
                            options: [
                                { value: "PALLET", label: "Pallet" },
                                { value: "DRUM", label: "Drum" },
                                { value: "BOXES", label: "Boxes" },
                                { value: "ROLLS", label: "Rolls" },
                                { value: "PIPES_OR_TUBES", label: "Pipes or Tubes" },
                                { value: "BALES", label: "Bales" },
                                { value: "BAGS", label: "Bags" },
                                { value: "CYLINDER", label: "Cylinder" },
                                { value: "PAILS", label: "Pails" },
                                { value: "REELS", label: "Reels" },
                                { value: "CRATE", label: "Crate" },
                                { value: "LOOSE", label: "Loose" },
                                { value: "PIECES", label: "Pieces" },
                            ],
                            labelClassName: "text-xs text-muted-foreground",
                            placeholder: "Select Pallet Unit Type",
                            show: shipmentType === "PALLET" || shipmentType === "SPOT_LTL" || shipmentType === "SPOT_FTL" || shipmentType === "TIME_CRITICAL"
                        },
                        {
                            name: `lineItem.units.${index}.unitsOnPallet`,
                            label: "Units on Pallet*",
                            type: "number",
                            placeholder: "Units on Pallet",
                            min: 0,
                            labelClassName: "text-xs text-muted-foreground",
                            show: shipmentType === "PALLET" || shipmentType === "SPOT_LTL" || shipmentType === "SPOT_FTL" || shipmentType === "TIME_CRITICAL"

                        },
                        {
                            name: `lineItem.units.${index}.description`,
                            label: "Description*",
                            type: "text",
                            placeholder: "Description",
                            labelClassName: "text-xs text-muted-foreground",
                            wrapperClassName: "col-span-4"
                        },
                        // specialHandlingRequired
                        {
                            name: `lineItem.units.${index}.specialHandlingRequired`,
                            label: "Special Handling Required",
                            type: "checkbox",
                            defaultValue: false,
                            labelClassName: "text-xs text-muted-foreground",
                            wrapperClassName: "col-span-8",
                            show: shipmentType === "PACKAGE"
                        }

                    ]}
                />

            </div>

            {/* Row actions */}
            <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
                <PackageSelectionModal selectedPackage={shipmentType} />
                <AddPackage shipmentType={shipmentType} open={open} setOpen={setOpen} initialData={rowSnapshot}>
                    <Button variant="link" type="button"><Save /> Save Package</Button>
                </AddPackage>
                {canRemove ? (
                    <Button variant="destructive" type="button" onClick={() => onRemove(index)}
                    >
                        <Trash2 size={18} />
                        Delete
                    </Button>
                ) : (
                    <Button type="button" variant="destructive" onClick={() => onClear(index)}>
                        <X /> Clear
                    </Button>
                )}
            </div>

            {rowErrors && Object.keys(rowErrors).length > 0 && (
                <p className="text-xs text-red-500">Please fill required dimensions</p>
            )}
        </div>
    )
}