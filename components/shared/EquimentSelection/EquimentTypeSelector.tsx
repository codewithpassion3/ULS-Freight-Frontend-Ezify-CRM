import { Truck } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Controller } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"
import { QuoteSchemaTypes } from "@/lib/validations/quote/spot-quote-schema"
import { FormRadio } from "@/components/common/forms/FormRadio"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"
import { useFormContext } from "react-hook-form"

interface EquimentTypeSelectorProps {
    shipmentType: string
}

export const EquimentTypeSelector = ({ shipmentType }: EquimentTypeSelectorProps) => {
    const { watch } = useFormContext<any>()
    return (
        <div className="shadow-lg border border-border rounded-md p-4 bg-white dark:bg-card">
            <h3 className="font-semibold flex items-center gap-2 pb-4 text-lg border-b mb-4">
                <Truck size={20} /> Equipment Type & Additional Services
            </h3>
            <div className="space-y-6">
                <div className="space-y-3">
                    <FormRadio
                        name="equipment.type"
                        label="Please describe the equipment required for this shipment"
                        options={[
                            { label: "Dry Van", value: "Dry Van" },
                            { label: "Refrigerated Services", value: "Refrigerated Services" },
                            { label: "Flatbed", value: "Flatbed" },
                            { label: "Ventilated Trailer", value: "Ventilated Trailer" },
                        ]}
                    />
                </div>

                {watch("equipment.type") === "Refrigerated Services" && (
                    <div className="bg-blue-50/20 p-4 border border-blue-50 rounded-md space-y-3 shadow-sm">
                        <FormRadio
                            name="equipment.refrigeratedType"
                            label="Please specify what kind of Refrigerated Service is required:"
                            options={[
                                { label: "Fresh (32°F / 0°C)", value: "Fresh" },
                                { label: "Frozen (0°F / -17°C)", value: "Frozen" },
                            ]}
                            selectedClassName="text-amber-500 border-amber-500"
                        />
                    </div>
                )}

                <div className="space-y-3 pt-2">
                    <Label className="text-base font-normal text-muted-foreground block border-t pt-4">Please specify any details regarding this shipment</Label>
                    <div className="flex flex-wrap gap-6">
                        {shipmentType !== "Full Truck Load" ? (
                            [
                                { name: "equipment.inBond", label: "In-Bond" },
                                { name: "equipment.protectFromFreeze", label: "Protect from Freeze" },
                                { name: "equipment.limitedAccess", label: "Limited Access" },
                            ].map((item) => (
                                <FormCheckbox
                                    key={item.name}
                                    name={item.name}
                                    label={item.label}
                                    icon={<Info size={14} className="text-[#0070c0]" />}
                                />
                            ))

                        ) : (
                            [
                                { name: "equipment.dangerousGoods", label: "Dangerous Goods" },
                                { name: "equipment.allPalletsStackable", label: "All Pallets are Stackable" },
                                { name: "equipment.somePalletsStackable", label: "Some Pallets are Stackable" },
                            ].map((item) => (
                                <FormCheckbox
                                    key={item.name}
                                    name={item.name}
                                    label={item.label}
                                    icon={<Info size={14} className="text-[#0070c0]" />}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}