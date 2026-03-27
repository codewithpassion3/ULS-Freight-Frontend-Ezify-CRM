"use client"

import { useFormContext, useFieldArray, Controller } from "react-hook-form"
import { QuoteSchemaTypes } from "@/lib/validations/quote/spot-quote-schema"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, Plus, X, Calculator, Save, LayoutTemplate, BriefcaseBusiness } from "lucide-react"
import Dimensions from "./Step2/DimensionsInformation/Dimensions"

export function Step2Form({ onPrev, onSubmit }: { onPrev: () => void, onSubmit: () => void }) {
  const form = useFormContext<QuoteSchemaTypes>()
  const {
    register,
    control,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dimensionsAndWeight.pallets",
  })

  // Ensure there's at least one item on mount if empty
  if (fields.length === 0) {
    append({ length: "0", width: "0", height: "0", weight: "0", freightClass: "", nmfc: "", type: "Pallet", unitsOnPallet: "" })
  }

  const handleNext = async () => {
    const valid = await trigger([
      "dimensionsAndWeight",
      "additionalServicesForPallets",
      "additionalInsurance"
    ])
    if (valid) onSubmit()
    else console.log(errors)
  }

  const unitSystem = watch("dimensionsAndWeight.unitSystem") || "Imperial"
  const isImperial = unitSystem === "Imperial"

  return (
    // <div className="space-y-6">
    //   <div className="border border-border rounded-md p-4 space-y-6">
    //     <div className="flex items-center justify-between pb-4 border-b">
    //       <h3 className="font-semibold flex items-center gap-2 text-lg">
    //         <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">➔</span> Dimensions & Weight
    //       </h3>
    //     </div>

    //     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    //       <div className="space-y-2">
    //         <Label>Quantity</Label>
    //         <Select defaultValue="1" onValueChange={(val) => setValue("dimensionsAndWeight.quantity", val)}>
    //           <SelectTrigger className="w-24">
    //             <SelectValue placeholder="1" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       <div className="flex flex-col items-end gap-2">
    //         <Button variant="link" className="text-primary p-0 h-auto">Class & Density Calculator</Button>

    //         <Controller
    //           control={control}
    //           name="dimensionsAndWeight.unitSystem"
    //           render={({ field }) => (
    //             <RadioGroup
    //               value={field.value}
    //               onValueChange={field.onChange}
    //               className="flex space-x-4"
    //             >
    //               <div className="flex items-center space-x-2">
    //                 <RadioGroupItem value="Metric" id="metric" />
    //                 <Label htmlFor="metric" className="font-normal cursor-pointer flex items-center gap-1">
    //                   Metric <span className="text-xs text-muted-foreground">(cm & kg)</span> <Info size={14} />
    //                 </Label>
    //               </div>
    //               <div className="flex items-center space-x-2">
    //                 <RadioGroupItem value="Imperial" id="imperial" className="text-amber-500 border-amber-500" />
    //                 <Label htmlFor="imperial" className="font-normal cursor-pointer">
    //                   Imperial <span className="text-xs text-muted-foreground">(in & lbs)</span>
    //                 </Label>
    //               </div>
    //             </RadioGroup>
    //           )}
    //         />
    //       </div>
    //     </div>

    //     {/* Pallets Table Header */}
    //     <div className="hidden lg:grid grid-cols-[30px_1fr_1fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_30px] gap-2 items-end pt-4 font-semibold text-sm">
    //       <div className="text-center">#</div>
    //       <div>Length ({isImperial ? "in" : "cm"})*</div>
    //       <div>Width ({isImperial ? "in" : "cm"})*</div>
    //       <div>Height ({isImperial ? "in" : "cm"})*</div>
    //       <div>Weight ({isImperial ? "lbs" : "kg"})*</div>
    //       <div className="border-b border-muted-foreground whitespace-nowrap">Freight Class*</div>
    //       <div className="border-b border-muted-foreground">NMFC</div>
    //       <div>Type*</div>
    //       <div className="text-center flex items-center gap-1 text-xs whitespace-nowrap"><Info size={12} /> # units on pallet</div>
    //       <div></div>
    //     </div>

    //     <div className="border-b max-w-full overflow-hidden block lg:hidden my-2"></div>

    //     {/* Pallets Rows */}
    //     <div className="space-y-4">
    //       {fields.map((field, index) => {
    //         const rowErrors = errors.dimensionsAndWeight?.pallets?.[index]

    //         return (
    //           <div key={field.id} className="grid grid-cols-2 lg:grid-cols-[30px_1fr_1fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_30px] gap-2 items-center">
    //             <div className="hidden lg:block text-center font-medium">{index + 1}</div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs">Length</span>
    //               <Input
    //                 placeholder="L"
    //                 {...register(`dimensionsAndWeight.pallets.${index}.length`)}
    //                 className={rowErrors?.length ? "border-red-500" : ""}
    //               />
    //             </div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs">Width</span>
    //               <Input
    //                 placeholder="W"
    //                 {...register(`dimensionsAndWeight.pallets.${index}.width`)}
    //                 className={rowErrors?.width ? "border-red-500" : ""}
    //               />
    //             </div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs">Height</span>
    //               <Input
    //                 placeholder="H"
    //                 {...register(`dimensionsAndWeight.pallets.${index}.height`)}
    //                 className={rowErrors?.height ? "border-red-500" : ""}
    //               />
    //             </div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs">Weight</span>
    //               <Input
    //                 placeholder={isImperial ? "lbs" : "kg"}
    //                 {...register(`dimensionsAndWeight.pallets.${index}.weight`)}
    //                 className={rowErrors?.weight ? "border-red-500" : ""}
    //               />
    //             </div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs">Freight Class</span>
    //               <Controller
    //                 control={control}
    //                 name={`dimensionsAndWeight.pallets.${index}.freightClass`}
    //                 render={({ field }) => (
    //                   <Select value={field.value} onValueChange={field.onChange}>
    //                     <SelectTrigger>
    //                       <SelectValue placeholder="Fr. Class" />
    //                     </SelectTrigger>
    //                     <SelectContent>
    //                       <SelectItem value="50">Class 50</SelectItem>
    //                       <SelectItem value="55">Class 55</SelectItem>
    //                       <SelectItem value="60">Class 60</SelectItem>
    //                       <SelectItem value="65">Class 65</SelectItem>
    //                       <SelectItem value="70">Class 70</SelectItem>
    //                       <SelectItem value="77.5">Class 77.5</SelectItem>
    //                     </SelectContent>
    //                   </Select>
    //                 )}
    //               />
    //             </div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs">NMFC</span>
    //               <Input
    //                 placeholder="#0000"
    //                 {...register(`dimensionsAndWeight.pallets.${index}.nmfc`)}
    //               />
    //             </div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs">Type</span>
    //               <Controller
    //                 control={control}
    //                 name={`dimensionsAndWeight.pallets.${index}.type`}
    //                 render={({ field }) => (
    //                   <Select value={field.value} onValueChange={field.onChange}>
    //                     <SelectTrigger>
    //                       <SelectValue placeholder="Pallet" />
    //                     </SelectTrigger>
    //                     <SelectContent>
    //                       <SelectItem value="Pallet">Pallet</SelectItem>
    //                       <SelectItem value="Skid">Skid</SelectItem>
    //                       <SelectItem value="Crate">Crate</SelectItem>
    //                     </SelectContent>
    //                   </Select>
    //                 )}
    //               />
    //             </div>

    //             <div className="space-y-1">
    //               <span className="lg:hidden text-xs"># units</span>
    //               <Input
    //                 placeholder="# units on"
    //                 {...register(`dimensionsAndWeight.pallets.${index}.unitsOnPallet`)}
    //               />
    //             </div>

    //             {fields.length > 1 && (
    //               <Button
    //                 variant="ghost"
    //                 size="icon"
    //                 type="button"
    //                 onClick={() => remove(index)}
    //                 className="text-red-500 hover:text-red-700 mx-auto"
    //               >
    //                 <X size={16} />
    //               </Button>
    //             )}
    //             {fields.length <= 1 && <div></div>}

    //             {rowErrors && Object.keys(rowErrors).length > 0 && (
    //               <div className="col-span-full text-xs text-red-500 mb-2">Please fill required dimensions (number &gt; 0)</div>
    //             )}
    //           </div>
    //         )
    //       })}
    //     </div>

    //     <div className="flex flex-col sm:flex-row justify-between pt-4 pb-2 border-b">
    //       <div className="w-full sm:w-1/2 space-y-2">
    //         <Label>Description</Label>
    //         <Input
    //           placeholder="Describe the item(s) being shipped"
    //           {...register("dimensionsAndWeight.description")}
    //         />
    //       </div>

    //       <div className="flex items-end gap-4 mt-4 sm:mt-0 text-sm">
    //         <button type="button" className="flex items-center gap-1 text-primary hover:underline"><BriefcaseBusiness size={14} /> My Pallets</button>
    //         <button type="button" className="flex items-center gap-1 text-primary hover:underline"><Save size={14} /> Save Pallet</button>
    //         <button type="button" className="flex items-center gap-1 text-red-500 hover:underline"><X size={14} /> Clear</button>
    //       </div>
    //     </div>

    //     <div className="flex justify-end pt-2">
    //       <Button
    //         type="button"
    //         variant="outline"
    //         className="border-primary text-primary"
    //         onClick={() => append({ length: " 0", width: " 0", height: " 0", weight: " 0", freightClass: "", nmfc: "", type: "Pallet", unitsOnPallet: "" })}
    //       >
    //         <Plus size={16} className="mr-2" /> Add Pallet
    //       </Button>
    //     </div>

    //     <div className="flex gap-6 pt-4">
    //       <div className="flex items-center space-x-2">
    //         <Controller
    //           control={control}
    //           name="dimensionsAndWeight.dangerousGoods"
    //           render={({ field }) => (
    //             <Checkbox checked={field.value} onCheckedChange={field.onChange} id="dangerous-goods" />
    //           )}
    //         />
    //         <Label htmlFor="dangerous-goods" className="font-normal flex items-center gap-1 cursor-pointer">
    //           Dangerous Goods <Info size={14} className="text-primary" />
    //         </Label>
    //       </div>
    //       <div className="flex items-center space-x-2">
    //         <Controller
    //           control={control}
    //           name="dimensionsAndWeight.stackable"
    //           render={({ field }) => (
    //             <Checkbox checked={field.value} onCheckedChange={field.onChange} id="stackable" />
    //           )}
    //         />
    //         <Label htmlFor="stackable" className="font-normal flex items-center gap-1 cursor-pointer">
    //           Stackable <Info size={14} className="text-primary" />
    //         </Label>
    //       </div>
    //     </div>

    //     <div className="pt-6 border-t mt-4">
    //       <h4 className="font-semibold mb-4 text-base">Additional Services for Pallets</h4>
    //       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    //         {[
    //           { id: "limitedAccess", label: "Limited Access" },
    //           { id: "appointmentDelivery", label: "Appointment Delivery" },
    //           { id: "thresholdDelivery", label: "Threshold Delivery" },
    //           { id: "thresholdPickup", label: "Threshold Pickup" },
    //           { id: "inBond", label: "In-Bond" },
    //           { id: "protectFromFreeze", label: "Protect from Freeze" },
    //           { id: "tradeShowDelivery", label: "Trade Show Delivery" },
    //           { id: "amazonFBADelivery", label: "Amazon/FBA Delivery" },
    //           { id: "refrigeratedServices", label: "Refrigerated Services" }
    //         ].map(service => (
    //           <div className="flex items-center space-x-2" key={service.id}>
    //             <Controller
    //               control={control}
    //               name={`additionalServicesForPallets.${service.id}` ? "additionalInsurance.currency" : ""}
    //               render={({ field }) => (
    //                 <Checkbox checked={!!field.value} onCheckedChange={field.onChange} id={service.id} />
    //               )}
    //             />
    //             <Label htmlFor={service.id} className="font-normal text-sm cursor-pointer flex items-center gap-1">
    //               {service.label} <Info size={14} className="text-primary"/>
    //             </Label>
    //           </div>
    //         ))}
    //       </div> */}
    //     </div>
    //   </div>

    //   <div className="border border-border rounded-md p-4 space-y-4">
    //     <h3 className="font-semibold flex items-center gap-2 text-lg">
    //       Additional Insurance <span className="rotate-180">▼</span>
    //     </h3>

    //     <div className="space-y-2 pt-2 border-t">
    //       <Label className="flex items-center gap-1">Total Cost Value of Goods being Shipped <Info size={14} className="text-primary" /></Label>
    //       <div className="flex items-center gap-6">
    //         <div className="relative max-w-[200px]">
    //           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
    //           <Input
    //             {...register("additionalInsurance.totalCostValue")}
    //             className="pl-7"
    //             placeholder="0"
    //           />
    //         </div>

    //         <Controller
    //           control={control}
    //           name="additionalInsurance.currency"
    //           render={({ field }) => (
    //             <RadioGroup
    //               value={field.value}
    //               onValueChange={field.onChange}
    //               className="flex space-x-6"
    //             >
    //               <div className="flex items-center space-x-2">
    //                 <RadioGroupItem value="CAD" id="currency-cad" className="text-amber-500 border-amber-500" />
    //                 <Label htmlFor="currency-cad" className="font-normal cursor-pointer">CAD</Label>
    //               </div>
    //               <div className="flex items-center space-x-2">
    //                 <RadioGroupItem value="USD" id="currency-usd" />
    //                 <Label htmlFor="currency-usd" className="font-normal cursor-pointer">USD</Label>
    //               </div>
    //             </RadioGroup>
    //           )}
    //         />
    //       </div>
    //     </div>

    //     <div className="bg-blue-50/50 p-3 rounded-md flex gap-2 items-start mt-4 text-sm text-slate-700">
    //       <Info size={18} className="text-primary shrink-0 mt-0.5" />
    //       <p>
    //         Please note that without the purchase of <span className="font-semibold text-black">Freightcom Insurance</span>, the carrier's liability for any loss or damage to your Pallet Shipment will be limited to <span className="font-semibold text-black">$2.00 per pound</span>.
    //       </p>
    //     </div>
    //   </div>

    //   <div className="flex justify-end gap-4 pt-4">
    //     <Button variant="outline" onClick={onPrev} className="px-8 border-primary text-primary">Back</Button>
    //     <Button variant="outline" type="button" className="px-8 border-primary text-primary">Save Quote</Button>
    //     <Button onClick={handleNext} className="bg-[#0070c0] hover:bg-[#005999] px-8">Get Rates!</Button>
    //   </div>
    // </div>
    <Dimensions />
  )
}
