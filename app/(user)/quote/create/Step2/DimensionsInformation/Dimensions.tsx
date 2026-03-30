"use client"

import { useFormContext, useFieldArray, Controller } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Cuboid, Info, Plus, X, PackageOpen, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ShipmentOptions } from "../../CreateQuote"

export default function Dimensions({ shipmentType }: { shipmentType: ShipmentOptions[keyof ShipmentOptions] }) {
    const { register, control, watch, setValue, formState: { errors } } = useFormContext<any>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "lineItem.units",
    })

    const handleAddPackage = () => {
        append({ quantity: 1, length: "", width: "", height: "", weight: "", description: "", measurementUnit: "", specialHandlingRequired: false })
    }

    return (
        <div className="space-y-6">
            <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-6">
                <h2 className="flex gap-2 items-center border-b pb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    <Cuboid className="w-5 h-5" />
                    Dimensions & Weight
                </h2>

                <div className="space-y-6 flex flex-col">
                    {fields.length === 0 && (
                        <div className="text-slate-500 text-sm italic py-4">No packages added yet. Click &quot;Add Package&quot; below.</div>
                    )}
                    {fields.map((field, index) => {
                        const rowErrors = (errors.lineItem as any)?.units?.[index]
                        const measurementUnit = watch(`lineItem.units.${index}.measurementUnit`) || "Imperial"
                        const isImperial = measurementUnit === "Imperial"
                        const lengthUnit = isImperial ? "in" : "cm"
                        const weightUnit = isImperial ? "lbs" : "kg"

                        return (
                            <div key={field.id} className="space-y-4 pb-6 border-b last:border-0 relative group">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-slate-50 p-3 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white border shadow-sm text-slate-800 font-medium h-8 w-8 rounded-full flex items-center justify-center">
                                                {index + 1}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Label className="text-slate-800 font-semibold mb-0">Quantity</Label>
                                                <Input
                                                    type="number"
                                                    {...register(`lineItem.units.${index}.quantity`, { valueAsNumber: true })}
                                                    className={`w-24 bg-white ${rowErrors?.quantity ? "border-red-500" : ""}`}
                                                    placeholder="1"
                                                    defaultValue="1"
                                                    min="1"
                                                />
                                            </div>
                                            <input value={shipmentType} type="text" {...register(`lineItem.type`)} className="hidden" />

                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex-1 flex justify-end">
                                            <Controller
                                                control={control}
                                                name={`lineItem.units.${index}.measurementUnit`}
                                                defaultValue="Imperial"
                                                render={({ field }) => (
                                                    <RadioGroup
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        className="flex space-x-6"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="METRIC" id={`metric-${index}`} />
                                                            <Label htmlFor={`metric-${index}`} className="font-normal cursor-pointer flex items-center gap-1 text-slate-500">
                                                                Metric <span className="hidden sm:inline">(cm & kg)</span>
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="IMPERIAL" id={`imperial-${index}`} className="text-amber-500 border-amber-500" />
                                                            <Label htmlFor={`imperial-${index}`} className="font-semibold cursor-pointer text-slate-800">
                                                                Imperial <span className="hidden sm:inline">(in & lbs)</span>
                                                            </Label>
                                                        </div>
                                                    </RadioGroup>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {fields.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 hover:bg-red-50 transition-colors ml-auto sm:ml-0"
                                        >
                                            <X size={18} />
                                        </Button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-start">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Length ({lengthUnit})*</Label>
                                        <Input
                                            placeholder="L"
                                            type="number"
                                            {...register(`lineItem.units.${index}.length`, { valueAsNumber: true })}
                                            className={rowErrors?.length ? "border-red-500" : ""}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Width ({lengthUnit})*</Label>
                                        <Input
                                            placeholder="W"
                                            type="number"
                                            {...register(`lineItem.units.${index}.width`, { valueAsNumber: true })}
                                            className={rowErrors?.width ? "border-red-500" : ""}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Height ({lengthUnit})*</Label>
                                        <Input
                                            placeholder="H"
                                            type="number"
                                            {...register(`lineItem.units.${index}.height`, { valueAsNumber: true })}
                                            className={rowErrors?.height ? "border-red-500" : ""}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Weight ({weightUnit})*</Label>
                                        <Input
                                            placeholder={isImperial ? "lbs" : "kg"}
                                            type="number"
                                            {...register(`lineItem.units.${index}.weight`, { valueAsNumber: true })}
                                            className={rowErrors?.weight ? "border-red-500" : ""}
                                        />
                                    </div>
                                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                                        <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Description</Label>
                                        <Input
                                            placeholder="Describe the item"
                                            {...register(`lineItem.units.${index}.description`)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                    <div className="flex items-center space-x-2">
                                        <Controller
                                            control={control}
                                            name={`lineItem.units.${index}.specialHandlingRequired`}
                                            render={({ field }) => (
                                                <Checkbox checked={!!field.value} onCheckedChange={field.onChange} id={`special-handling-${index}`} />
                                            )}
                                        />
                                        <Label htmlFor={`special-handling-${index}`} className="font-normal flex items-center gap-1 cursor-pointer text-slate-500">
                                            Special Handling Required <Info size={14} className="text-slate-800" />
                                        </Label>
                                    </div>

                                    {index === fields.length - 1 && (
                                        <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
                                            <button type="button" className="flex items-center gap-1 font-medium text-slate-600 hover:text-primary transition-colors">
                                                <PackageOpen size={16} /> My Packages
                                            </button>
                                            <button type="button" className="flex items-center gap-1 font-medium text-slate-600 hover:text-primary transition-colors">
                                                <Save size={16} /> Save Package
                                            </button>
                                            <button type="button" className="flex items-center gap-1 font-medium text-red-500 hover:text-red-600 transition-colors" onClick={() => {
                                                setValue(`lineItem.units.${index}.length`, null);
                                                setValue(`lineItem.units.${index}.width`, null);
                                                setValue(`lineItem.units.${index}.height`, null);
                                                setValue(`lineItem.units.${index}.weight`, null);
                                                setValue(`lineItem.units.${index}.description`, "");
                                                setValue(`lineItem.units.${index}.specialHandlingRequired`, false);
                                            }}>
                                                <div className="bg-red-500 rounded-full p-0.5 text-white"><X size={10} /></div> Clear
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {rowErrors && Object.keys(rowErrors).length > 0 && (
                                    <div className="text-xs text-red-500">Please fill required dimensions (number &gt; 0)</div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-end pt-2 border-b pb-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/5 hover:text-primary"
                        onClick={handleAddPackage}
                    >
                        <Plus size={16} className="mr-1" /> Add Package
                    </Button>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                    <Controller
                        control={control}
                        name={`lineItem.dangerousGoods`}
                        render={({ field }) => (
                            <Checkbox checked={!!field.value} onCheckedChange={field.onChange} id="dangerous-goods" />
                        )}
                    />
                    <Label htmlFor="dangerous-goods" className="font-normal flex items-center gap-1 cursor-pointer text-slate-500">
                        Dangerous Goods <Info size={14} className="text-slate-800" />
                    </Label>
                </div>
            </div>

            <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-6">
                <h3 className="font-semibold flex items-center gap-2 text-lg text-slate-800">
                    Additional Insurance <span className="rotate-180 text-slate-400 ml-1 text-sm">▼</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                        <Label className="flex items-center gap-1 text-slate-500 font-normal">
                            Total Cost Value of Goods being Shipped <Info size={14} className="text-slate-800" />
                        </Label>
                        <div className="flex items-center gap-4">
                            <div className="relative max-w-[200px] w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input
                                    type="number"
                                    {...register("insurance.amount", { valueAsNumber: true })}
                                    className="pl-7"
                                    placeholder="0"
                                />
                            </div>

                            <Controller
                                control={control}
                                name="insurance.currency"
                                render={({ field }) => (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="CAD" id="currency-cad" className="text-amber-500 border-amber-500" />
                                            <Label htmlFor="currency-cad" className="font-semibold cursor-pointer text-slate-800">CAD</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="USD" id="currency-usd" />
                                            <Label htmlFor="currency-usd" className="font-normal cursor-pointer text-slate-500">USD</Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-slate-500 font-normal">Insurance Type</Label>
                        <Controller
                            control={control}
                            name={"insurance.type"}
                            render={({ field }) => (
                                <Select value={field.value || "Freightcom"} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-[200px] bg-white">
                                        <SelectValue placeholder="Freightcom" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Freightcom">Freightcom</SelectItem>
                                        <SelectItem value="ThirdParty">Third Party</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-md flex gap-3 items-start text-sm text-slate-600 border border-blue-100">
                    <Info size={18} className="text-slate-800 shrink-0 mt-0.5" />
                    <p>
                        Please note that without the purchase of <span className="font-semibold text-slate-800">Freightcom Insurance</span>, the carrier's liability for any loss or damage to your Parcel
                        Shipment will be limited to <span className="font-semibold text-slate-800">$2.00 per pound</span> or <span className="font-semibold text-slate-800">$100.00 per shipment</span>, whichever is applicable.
                    </p>
                </div>
            </div>

            <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-4">
                <Label className="text-base font-semibold text-slate-800">Signature Preference</Label>
                <Controller
                    control={control}
                    name={"signature"}
                    render={({ field }) => (
                        <RadioGroup
                            value={field.value || "No Signature Required"}
                            onValueChange={field.onChange}
                            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 pt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No Signature Required" id="sig-none" className="text-amber-500 border-amber-500" />
                                <Label htmlFor="sig-none" className="font-semibold cursor-pointer text-slate-800">No Signature Required</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Signature Required" id="sig-req" />
                                <Label htmlFor="sig-req" className="font-normal cursor-pointer text-slate-500">Signature Required</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Adult Signature Required" id="sig-adult" />
                                <Label htmlFor="sig-adult" className="font-normal cursor-pointer flex items-center gap-1 text-slate-500">
                                    Adult Signature Required <Info size={14} className="text-slate-800" />
                                </Label>
                            </div>
                        </RadioGroup>
                    )}
                />
            </div>
        </div>
    )
}