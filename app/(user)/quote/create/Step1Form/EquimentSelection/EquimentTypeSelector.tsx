import { Truck } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Controller } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"
import { QuoteSchemaTypes } from "@/lib/validations/quote/quote-schema"
import { FormRadio } from "@/components/common/forms/FormRadio"

interface EquimentTypeSelectorProps {
    control: any
    errors: any
    watch: any
    shipmentType: string
}

export const EquimentTypeSelector = ({ control, errors, watch, shipmentType }: EquimentTypeSelectorProps) => {
    return (
        <div className="border border-border rounded-md p-4 bg-white">
            <h3 className="font-semibold flex items-center gap-2 pb-4 text-lg border-b mb-4">
                <Truck size={20} /> Equipment Type & Additional Services
            </h3>

            <div className="space-y-6">
                <div className="space-y-3">
                    {/* <Label className={errors.equipment?.type ? "text-red-500 text-base" : "text-base font-normal text-muted-foreground"}>Please describe the equipment required for this shipment</Label>
                    <Controller
                        control={control}
                        name="equipment.type"
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-wrap gap-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Dry Van" id="dry-van" className={field.value === "Dry Van" ? "text-amber-500 border-amber-500" : ""} />
                                    <Label htmlFor="dry-van" className="font-normal cursor-pointer text-sm">Dry Van</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Refrigerated Services" id="refrigerated" className={field.value === "Refrigerated Services" ? "text-amber-500 border-amber-500" : ""} />
                                    <Label htmlFor="refrigerated" className="font-normal cursor-pointer text-sm">Refrigerated Services</Label>
                                </div>
                                {shipmentType === "Full Truck Load" && (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Flatbed" id="flatbed" className={field.value === "Flatbed" ? "text-amber-500 border-amber-500" : ""} />
                                            <Label htmlFor="flatbed" className="font-normal cursor-pointer text-sm">Flatbed</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Ventilated Trailer" id="ventilated-trailer" className={field.value === "Ventilated Trailer" ? "text-amber-500 border-amber-500" : ""} />
                                            <Label htmlFor="ventilated-trailer" className="font-normal cursor-pointer text-sm">Ventilated Trailer</Label>
                                        </div>
                                    </>
                                )}
                            </RadioGroup>
                        )}
                    />
                    {errors.equipment?.type && <p className="text-sm text-red-500">{errors.equipment.type.message}</p>} */}
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
                        {/* <Label className="block text-sm text-slate-700 font-normal">Please specify what kind of Refrigerated Service is required:</Label>
                        <Controller
                            control={control}
                            name="equipment.refrigeratedType"
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex flex-wrap gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Fresh" id="fresh" className={field.value === "Fresh" ? "text-amber-500 border-amber-500" : "bg-white"} />
                                        <Label htmlFor="fresh" className="font-normal cursor-pointer text-sm">Fresh (32°F / 0°C)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Frozen" id="frozen" className={field.value === "Frozen" ? "text-amber-500 border-amber-500" : "bg-white"} />
                                        <Label htmlFor="frozen" className="font-normal cursor-pointer text-sm">Frozen (0°F / -17°C)</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        /> */}

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
                            <>
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        control={control}
                                        name="equipment.inBond"
                                        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="in-bond" />}
                                    />
                                    <Label htmlFor="in-bond" className="font-normal cursor-pointer flex items-center gap-1 text-sm">In-Bond <Info size={14} className="text-[#0070c0]" /></Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        control={control}
                                        name="equipment.protectFromFreeze"
                                        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="protect-freeze" />}
                                    />
                                    <Label htmlFor="protect-freeze" className="font-normal cursor-pointer flex items-center gap-1 text-sm">Protect from Freeze <Info size={14} className="text-[#0070c0]" /></Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        control={control}
                                        name="equipment.limitedAccess"
                                        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="limited-access" />}
                                    />
                                    <Label htmlFor="limited-access" className="font-normal cursor-pointer flex items-center gap-1 text-sm">Limited Access <Info size={14} className="text-[#0070c0]" /></Label>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        control={control}
                                        name="equipment.dangerousGoods"
                                        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="dangerous-goods" />}
                                    />
                                    <Label htmlFor="dangerous-goods" className="font-normal cursor-pointer flex items-center gap-1 text-sm">Dangerous Goods <Info size={14} className="text-[#0070c0]" /></Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        control={control}
                                        name="equipment.allPalletsStackable"
                                        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="all-stackable" />}
                                    />
                                    <Label htmlFor="all-stackable" className="font-normal cursor-pointer text-sm">All Pallets are Stackable</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        control={control}
                                        name="equipment.somePalletsStackable"
                                        render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="some-stackable" />}
                                    />
                                    <Label htmlFor="some-stackable" className="font-normal cursor-pointer text-sm">Some Pallets are Stackable</Label>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}