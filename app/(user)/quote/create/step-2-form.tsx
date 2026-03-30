"use client"

import { useFormContext } from "react-hook-form"
import Dimensions from "./Step2/Dimensions"
import { ShipmentOptions } from "./CreateQuote"
import AdditionalInsurance from "./Step2/AdditionalInsurance"
import SignaturePreference from "./Step2/SignaturePreference"
import AdditionalServices from "./Step2/AdditionalServices"

export function Step2Form({ shipmentType, onPrev, onSubmit }: { shipmentType: ShipmentOptions[keyof ShipmentOptions], onPrev: () => void, onSubmit: () => void }) {
  const form = useFormContext<any>()
  const {
    formState: { errors },
    trigger,
  } = form

  const handleNext = async () => {
    const valid = await trigger([

    ])
    if (valid) onSubmit()
    else console.log(errors)
  }
  console.log(shipmentType)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Dimensions shipmentType={shipmentType} />
      <AdditionalServices />
      <AdditionalInsurance />
      <SignaturePreference />
    </div>
  )
}
