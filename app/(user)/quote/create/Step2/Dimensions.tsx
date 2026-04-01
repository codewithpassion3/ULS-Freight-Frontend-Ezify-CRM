"use client"

import { useFormContext, useFieldArray, Controller } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Cuboid, Info, Plus, X, PackageOpen, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ShipmentOptions } from "../CreateQuote"
import DangerousGoodsForm from "./DangerousGoodDetails"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import AdditionalServices from "./AdditionalServices"
import { Textarea } from "@/components/ui/textarea"
import FormField from "@/components/common/forms/FormField"
import { FormSelect } from "@/components/common/forms/FormSelect"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { useEffect } from "react"

export default function Dimensions({ shipmentType }: { shipmentType: ShipmentOptions[keyof ShipmentOptions] }) {
    const { register, control, watch, setValue, formState: { errors } } = useFormContext<any>()
    const quoteId = useSearchParams().get("id")
    const { data: cachedSingleQuote, isLoading, isPending } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
        enabled: !!quoteId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "lineItem.units",
    })

    useEffect(() => {
        if (cachedSingleQuote) {
            const units = cachedSingleQuote.quote.lineItems?.units || [];
            // If no units exist, initialize with 1 empty package
            if (units.length === 0) {
                setValue("lineItem.units", [{
                    quantity: 1,
                    length: "",
                    width: "",
                    height: "",
                    weight: "",
                    description: "",
                    specialHandlingRequired: false
                }]);
            } else {
                setValue("lineItem.units", units);
            }

            // Also set global lineItem fields if needed
            setValue("lineItem.measurementUnit", cachedSingleQuote.lineItem?.measurementUnit || "IMPERIAL");
            setValue("lineItem.dangerousGoods", cachedSingleQuote.lineItem?.dangerousGoods || false);
            setValue("lineItem.stackable", cachedSingleQuote.lineItem?.stackable || false);
        }
    }, [cachedSingleQuote, setValue]);

    const handleAddPackage = () => {
        append({ quantity: 1, length: "", width: "", height: "", weight: "", description: "", specialHandlingRequired: false })
    }

    const isDangerousGood = watch("lineItem.dangerousGoods")

    const handleClearDimensions = (index: number) => {
        setValue(`lineItem.units.${index}.length`, null);
        setValue(`lineItem.units.${index}.width`, null);
        setValue(`lineItem.units.${index}.height`, null);
        setValue(`lineItem.units.${index}.weight`, null);
        setValue(`lineItem.units.${index}.description`, "");
        setValue(`lineItem.units.${index}.specialHandlingRequired`, false);
    }

    return (
        <div className="space-y-6">
            <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-6">
                <h2 className="flex gap-2 items-center border-b pb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                    <Cuboid className="w-5 h-5" />
                    Dimensions & Weight
                </h2>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-card border p-4 rounded-md">
                    <div className="flex items-center gap-4">
                        <Label className="font-semibold text-slate-800 dark:text-slate-100 mb-0">Quantity</Label>
                        <Select
                            defaultValue="1"
                            value={fields.length.toString()}
                            onValueChange={(val) => {
                                const targetCount = parseInt(val, 10);
                                const currentCount = fields.length;
                                if (targetCount > currentCount) {
                                    const itemsToAdd = Array(targetCount - currentCount).fill({
                                        quantity: 1, length: "", width: "", height: "", weight: "", description: "", specialHandlingRequired: false
                                    });
                                    append(itemsToAdd);
                                } else if (targetCount < currentCount) {
                                    const indicesToRemove = Array.from({ length: currentCount - targetCount }, (_, i) => currentCount - 1 - i);
                                    remove(indicesToRemove);
                                }
                            }}
                        >
                            <SelectTrigger className="w-24 bg-white dark:bg-card">
                                <SelectValue placeholder="1" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: Math.max(10, fields.length) }, (_, i) => i + 1).map(n => (
                                    <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Controller
                        control={control}
                        name="lineItem.measurementUnit"
                        defaultValue="IMPERIAL"
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex space-x-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="METRIC" id="metric-global" />
                                    <Label htmlFor="metric-global" className="font-normal cursor-pointer flex items-center gap-1 text-slate-500">
                                        Metric <span className="hidden sm:inline">(cm & kg)</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="IMPERIAL" id="imperial-global" className="text-amber-500 border-amber-500" />
                                    <Label htmlFor="imperial-global" className="font-semibold cursor-pointer text-slate-800">
                                        Imperial <span className="hidden sm:inline">(in & lbs)</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                </div>

                <div className="space-y-6 flex flex-col">
                    {/* {fields.length === 0 && (
                        <div className="text-slate-500 text-sm italic py-4">No packages added yet. Click &quot;Add Package&quot; below.</div>
                    )} */}
                    {fields.map((field, index) => {
                        const rowErrors = (errors.lineItem as any)?.units?.[index]
                        const measurementUnit = watch(`lineItem.measurementUnit`) || "Imperial"
                        const isImperial = measurementUnit === "IMPERIAL" || measurementUnit === "Imperial"
                        const lengthUnit = isImperial ? "in" : "cm"
                        const weightUnit = isImperial ? "lbs" : "kg"

                        return (
                            <div key={field.id} className="space-y-4 pb-6 border-b last:border-0 relative group">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-slate-50 dark:bg-card border p-3 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white border shadow-sm dark:bg-card dark:text-slate-100 font-medium h-8 w-8 rounded-full flex items-center justify-center">
                                                {index + 1}
                                            </div>
                                            <span className="font-semibold text-slate-800 dark:text-slate-100">Package {index + 1}</span>

                                            {/* Keep a hidden input for per-row quantity so schema validation passes if it expects it */}
                                            <input type="hidden" {...register(`lineItem.units.${index}.quantity`, { valueAsNumber: true })} value={1} />
                                            <input value={shipmentType} type="text" {...register(`lineItem.type`)} className="hidden" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
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
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 gap-4 items-start">
                                    <FormField
                                        name={`lineItem.units.${index}.length`}
                                        label={`Length (${lengthUnit})*`}
                                        type="number"
                                        placeholder="L"
                                        labelClassName="text-xs text-muted-foreground"
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.width`}
                                        label={`Width (${lengthUnit})*`}
                                        type="number"
                                        placeholder="W"
                                        labelClassName="text-xs text-muted-foreground"
                                        className={rowErrors?.width ? "border-red-500" : ""}
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.height`}
                                        label={`Height (${lengthUnit})*`}
                                        type="number"
                                        placeholder="H"
                                        labelClassName="text-xs text-muted-foreground"
                                    // className={rowErrors?.height ? "border-red-500" : ""}
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.weight`}
                                        label={`Weight (${weightUnit})*`}
                                        type="number"
                                        placeholder={isImperial ? "lbs" : "kg"}
                                        labelClassName="text-xs text-muted-foreground"
                                    // className={rowErrors?.weight ? "border-red-500" : ""}
                                    />
                                    <FormSelect
                                        label="Freight Class*"
                                        name={`lineItem.units.${index}.freightClass`}
                                        options={[
                                            { value: "25", label: "25" },
                                            { value: "50", label: "50" },
                                            { value: "75", label: "75" },
                                            { value: "100", label: "100" },
                                            { value: "125", label: "125" },
                                            { value: "150", label: "150" },
                                            { value: "175", label: "175" },
                                            { value: "200", label: "200" },
                                            { value: "250", label: "250" },
                                            { value: "300", label: "300" },
                                            { value: "350", label: "350" },
                                            { value: "400", label: "400" },
                                            { value: "450", label: "450" },
                                            { value: "500", label: "500" },
                                            { value: "550", label: "550" },
                                            { value: "600", label: "600" },
                                            { value: "650", label: "650" },
                                            { value: "700", label: "700" },
                                            { value: "750", label: "750" },
                                            { value: "800", label: "800" },
                                            { value: "850", label: "850" },
                                            { value: "900", label: "900" },
                                            { value: "950", label: "950" },
                                            { value: "1000", label: "1000" },
                                        ]}
                                        labelClassName="text-xs text-muted-foreground"
                                        placeholder="Select Frieght Class"
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.nmfc`}
                                        label={`NMFC Code`}
                                        type="text"
                                        placeholder="#0000"
                                        labelClassName="text-xs text-muted-foreground"
                                    />
                                    <FormSelect
                                        name={`lineItem.units.${index}.palletUnitType`}
                                        label={`Type`}
                                        placeholder="Select Type"
                                        options={[
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
                                        ]}

                                        labelClassName="text-xs text-muted-foreground"
                                    // className={rowErrors?.type ? "border-red-500" : ""}
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.unitsOnPallet`}
                                        label={`Units`}
                                        type="number"
                                        placeholder="#units"
                                        labelClassName="text-xs text-muted-foreground"
                                    // className={rowErrors?.unitsOnPallet ? "border-red-500" : ""}
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.description`}
                                        label={`Description`}
                                        type="textarea"
                                        placeholder="Describe the item"
                                        labelClassName="text-xs text-muted-foreground"
                                        className={`col-span-2 md:col-span-4`}

                                    />
                                    {/* <FormCheckbox
                                        name={`lineItem.units.${index}.stackable`}
                                        label="Stackable"
                                    /> */}
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

                                    <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
                                        <Button disabled variant="ghost" type="button">
                                            <PackageOpen /> My Packages
                                        </Button>
                                        <Button disabled variant="ghost" type="button">
                                            <Save /> Save Package
                                        </Button>
                                        <Button type="button" variant="destructive" onClick={() => handleClearDimensions(index)}>
                                            <X /> Clear
                                        </Button>
                                    </div>
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
                        onClick={handleAddPackage}
                    >
                        <Plus size={16} className="mr-1" /> Add Package
                    </Button>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                    <GlobalForm
                        formWrapperClassName="flex items-center gap-4"
                        fields={[
                            {
                                name: "lineItem.dangerousGoods",
                                label: "Dangerous Goods",
                                type: "checkbox",
                                defaultValue: false,
                                icon: <Info size={14} className="text-slate-800" />,
                            },
                            {
                                name: "lineItem.stackable",
                                label: "Stackable",
                                type: "checkbox",
                                defaultValue: false,
                                icon: <Info size={14} className="text-slate-800" />,
                            },
                        ]}
                    />
                </div>
                {isDangerousGood && (
                    <DangerousGoodsForm />
                )}
            </div>


        </div>
    )
}