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
import { ShipmentOptions } from "./CreateQuote"

export function Step2Form({ shipmentType, onPrev, onSubmit }: { shipmentType: ShipmentOptions[keyof ShipmentOptions], onPrev: () => void, onSubmit: () => void }) {
  const form = useFormContext<any>()
  const {
    register,
    control,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = form

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "dimensionsAndWeight.pallets",
  // })

  // Ensure there's at least one item on mount if empty
  // if (fields.length === 0) {
  //   append({ length: "0", width: "0", height: "0", weight: "0", freightClass: "", nmfc: "", type: "Pallet", unitsOnPallet: "" })
  // }

  const handleNext = async () => {
    const valid = await trigger([

    ])
    if (valid) onSubmit()
    else console.log(errors)
  }
  console.log(shipmentType)
  // const unitSystem = watch("dimensionsAndWeight.unitSystem") || "Imperial"
  // const isImperial = unitSystem === "Imperial"

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Dimensions shipmentType={shipmentType} />
      {/* <div className="flex justify-between items-center pt-2">
        <Button variant="ghost" onClick={onPrev} className="px-6 text-slate-500 hover:text-slate-800">Back</Button>
        <div className="flex gap-4">
          <Button onClick={handleNext} variant="outline" type="button" className="hidden sm:inline-flex px-8 border-primary text-primary hover:bg-primary/5">Save Quote</Button>
          <Button onClick={handleNext} className="bg-[#0070c0] hover:bg-[#005999] px-8 text-white">Get Rates!</Button>
        </div>
      </div> */}
    </div>
  )
}
