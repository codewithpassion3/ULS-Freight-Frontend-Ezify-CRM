"use client"
import z from "zod"
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useImperativeHandle, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Cuboid, Info, Plus, X, PackageOpen, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ShipmentOptions } from "../DynamicQuote/DynamicQuote"
import DangerousGoodsForm from "./DangerousGoodDetails"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import AdditionalServices from "../AdditionalService/AdditionalServices"
import { Textarea } from "@/components/ui/textarea"
import FormField from "@/components/common/forms/FormField"
import { FormSelect } from "@/components/common/forms/FormSelect"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { useEffect } from "react"
import AddPackage from "@/app/(user)/packages/AddPackage"
export type PackageType = "PACKAGE" | "PALLET" | "COURIER_PAK"
const packageUnitSchema = z.object({
  quantity: z.number().min(1),
  length: z.number().min(0, "Required"),
  width: z.number().min(0),
  height: z.number().min(0),
  weight: z.number().min(0),
  freightClass: z.string().optional(),
  nmfc: z.string().optional(),
  unitsOnPallet: z.number().optional(),
  stackable: z.boolean().optional(),
  description: z.string(),
  specialHandlingRequired: z.boolean().optional(),
});

// Units for other shipment types (COURIER_PACK)
const courierUnitSchema = z.object({
  quantity: z.number().min(1),
  weight: z.number().min(0),
  description: z.string(),
});

// LineItem schema for PACKAGE
const packageLineItemSchema = z.object({
  type: z.literal("PACKAGE"),
  description: z.string(),
  measurementUnit: z.enum(["METRIC", "IMPERIAL"]),
  dangerousGoods: z.boolean().optional(),
  units: z.array(packageUnitSchema),
});

// LineItem schema for COURIER_PACK
const courierLineItemSchema = z.object({
  type: z.literal("COURIER_PACK"),
  description: z.string(),
  measurementUnit: z.enum(["METRIC", "IMPERIAL"]),
  units: z.array(courierUnitSchema),
});

// Discriminated union based on lineItem.type
const lineItemSchema = z.discriminatedUnion("type", [
  packageLineItemSchema,
  courierLineItemSchema,
]);

// Full shipment schema with shipmentType discrimination
const shipmentSchema = z.discriminatedUnion("shipmentType", [
  z.object({
    shipmentType: z.literal("STANDARD_FTL"),
    lineItem: z.object({
      type: z.string(),
      description: z.string().optional(),
      measurementUnit: z.enum(["METRIC", "IMPERIAL"]),
      dangerousGoods: z.boolean().optional(),
      stackable: z.boolean().optional(),
      specialHandlingRequired: z.boolean().optional(),
      quantity: z.number().optional(),
      units: z.array(packageUnitSchema),
    }),
  }),
  z.object({
    shipmentType: z.literal("OTHER"),
    lineItem: z.object({
      type: z.string(),
      description: z.string().optional(),
      measurementUnit: z.enum(["METRIC", "IMPERIAL"]),
      dangerousGoods: z.boolean().optional(),
      stackable: z.boolean().optional(),
      specialHandlingRequired: z.boolean().optional(),
      quantity: z.number().optional(),
      units: z.array(courierUnitSchema),
    }),
  }),
]);

type PackageUnit = {
  quantity: number;
  length?: number | string | null;
  width?: number | string | null;
  height?: number | string | null;
  weight?: number | string | null;
  freightClass?: string;
  nmfc?: string;
  unitsOnPallet?: number | string;
  stackable?: boolean;
  description?: string;
  specialHandlingRequired?: boolean;
  palletUnitType?: string;
  shipmentType?: string;
};

type ShipmentFormValues = {
  shipmentType: "STANDARD_FTL" | "OTHER";
  lineItem: {
    type: string;
    description?: string;
    measurementUnit: "METRIC" | "IMPERIAL";
    dangerousGoods?: boolean;
    stackable?: boolean;
    specialHandlingRequired?: boolean;
    quantity?: number;
    units: PackageUnit[];
  };
};

const Dimensions = forwardRef(({ shipmentType }: { shipmentType: ShipmentOptions[keyof ShipmentOptions] }, ref) => {
    const methods = useForm<ShipmentFormValues>({
        resolver: zodResolver(shipmentSchema) as any,
        mode: "onChange",
        defaultValues: {
            shipmentType: shipmentType === "STANDARD_FTL" ? "STANDARD_FTL" : "OTHER",
            lineItem: {
                type: "PACKAGE",
                description: "",
                measurementUnit: "IMPERIAL",
                units: []
            }
        }
    })
    const { register, control, watch, setValue, formState: { errors } } = methods
    
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        getValues: methods.getValues,
        setValues: (vals: any) => methods.reset({ ...vals }),
        trigger: methods.trigger,
        open: () => setIsOpen(true)
    }), [methods]);
    const quoteId = useSearchParams().get("id")
    const [open, setOpen] = useState(false);
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
                }]);
            } else {
                setValue("lineItem.units", units);
            }

            // Also set global lineItem fields if needed
            setValue("lineItem.measurementUnit", cachedSingleQuote.lineItem?.measurementUnit || "IMPERIAL");
            setValue("lineItem.dangerousGoods", cachedSingleQuote.lineItem?.dangerousGoods || false);
            setValue("lineItem.stackable", cachedSingleQuote.lineItem?.stackable || false);
            setValue("lineItem.specialHandlingRequired", cachedSingleQuote.lineItem?.specialHandlingRequired || false);
            setValue("lineItem.quantity", cachedSingleQuote.lineItem?.quantity || 1);


        }
    }, [cachedSingleQuote, setValue]);

    const handleAddPackage = () => {
        append({ quantity: 1, length: "", width: "", height: "", weight: "", description: "" })
    }

    const isDangerousGood = watch("lineItem.dangerousGoods")

    const handleClearDimensions = (index: number) => {
        setValue(`lineItem.units.${index}.length`, null);
        setValue(`lineItem.units.${index}.width`, null);
        setValue(`lineItem.units.${index}.height`, null);
        setValue(`lineItem.units.${index}.weight`, null);
        setValue(`lineItem.units.${index}.description`, "");
    }

    return (
        <FormProvider {...methods}>
        <form className="space-y-6 ">
            <Accordion type="single" collapsible value={isOpen ? "dimensions" : ""} onValueChange={(val) => setIsOpen(!!val)} className="shadow-lg border border-border rounded-md bg-white dark:bg-card">
                <AccordionItem value="dimensions" className="border-none">
                    <AccordionTrigger className="group px-6 py-4 hover:no-underline items-center cursor-pointer [&>svg]:hidden!" >
                        <h2 className="flex gap-2 items-center text-lg font-semibold text-slate-800 dark:text-slate-100">
                            <Cuboid className="w-5 h-5" />
                            Dimensions & Weight
                            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </h2>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 h-full">
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
                                        quantity: 1, length: "", width: "", height: "", weight: "", description: "",
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
                        const measurementUnit = watch(`lineItem.measurementUnit`) || "IMPERIAL"
                        const isImperial = measurementUnit === "IMPERIAL"
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
                                            <input type="hidden" {...register(`lineItem.quantity`, { valueAsNumber: true })} value={fields.length} />
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
                                        min={0}
                                        placeholder="L"
                                        labelClassName="text-xs text-muted-foreground"

                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.width`}
                                        label={`Width (${lengthUnit})*`}
                                        type="number"
                                        placeholder="W"
                                        min={0}
                                        labelClassName="text-xs text-muted-foreground"
                                        className={rowErrors?.width ? "border-red-500" : ""}
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.height`}
                                        label={`Height (${lengthUnit})*`}
                                        type="number"
                                        placeholder="H"
                                        min={0}

                                        labelClassName="text-xs text-muted-foreground"
                                    // className={rowErrors?.height ? "border-red-500" : ""}
                                    />
                                    <FormField
                                        name={`lineItem.units.${index}.weight`}
                                        label={`Weight (${weightUnit})*`}
                                        type="number"
                                        min={0}

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
                                        min={0}

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
                                <div className="flex items-center gap-4 text-sm mt-2 sm:mt-0">
                                    <Button variant="link" type="button">
                                        <PackageOpen /> My Packages
                                    </Button>
                                    <AddPackage
                                        shipmentType={shipmentType}
                                        open={open}
                                        setOpen={setOpen}
                                        initialData={
                                            {
                                                measurementUnit: watch(`lineItem.measurementUnit`),
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
                                        }
                                    >
                                        <Button variant="link" type="button">
                                            <Save /> Save Package
                                        </Button>
                                    </AddPackage>
                                    <Button type="button" variant="destructive" onClick={() => handleClearDimensions(index)}>
                                        <X /> Clear
                                    </Button>
                                </div>

                                {rowErrors && Object.keys(rowErrors).length > 0 && (
                                    <div className="text-xs text-red-500">Please fill required dimensions (number &gt; 0)</div>
                                )}
                            </div>
                        )
                    })}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                        {shipmentType === "PACKAGE" ? <div className="flex items-center space-x-2">
                            <Controller
                                control={control}
                                name={`lineItem.specialHandlingRequired`}
                                render={({ field }) => (
                                    <Checkbox checked={!!field.value} onCheckedChange={field.onChange} id={`special-handling`} />
                                )}
                            />
                            <Label htmlFor={`special-handling`} className="font-normal flex items-center gap-1 cursor-pointer">
                                Special Handling Required <Info size={14} className="text-slate-800" />
                            </Label>
                        </div> : null}


                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddPackage}
                        >
                            <Plus size={16} className="mr-1" /> Add Package
                        </Button>
                    </div>
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </form>
        </FormProvider>
    )
})

export default Dimensions;