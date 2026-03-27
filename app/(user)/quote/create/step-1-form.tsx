"use client"

import { useFormContext } from "react-hook-form"
import { QuoteSchemaTypes } from "@/lib/validations/quote/spot-quote-schema"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectAddressBookModal } from "./Step1Form/Shipping/SelectAddressBookModal"
import { ContactType } from "../../settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { FormSelect } from "@/components/common/forms/FormSelect"
import { getAllPalletShippingLocationTypes, markContactAsRecent } from "@/api/services/address-book.api"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@/components/common/Loader"
import { FormFieldWrapper } from "@/components/common/forms/FormFieldWrapper"
import { useMarkContactAsRecent } from "./hooks"
import { ShippingTypeSelector } from "./Step1Form/Shipping/ShippingTypeSelector"
import { EquimentTypeSelector } from "./Step1Form/EquimentSelection/EquimentTypeSelector"
import ContactInformation from "./Step1Form/ContactInformation/ContactInformation"
import { ShippingAddressSection } from "./Step1Form/Shipping/ShippingAddressSection"
import { ShipmentOptions, QuoteTypes } from "./CreateQuote"
import type { z, ZodType } from "zod"
import { InferSchema } from "./quote.types"


export function Step1Form<T extends ZodType<any>>({ quoteType, shipmentType, setShipmentType, onNext }: {
  quoteType: QuoteTypes
  shipmentType: ShipmentOptions[keyof ShipmentOptions]
  setShipmentType: (type: ShipmentOptions[keyof ShipmentOptions]) => void
  onNext: () => void
}) {
  const form = useFormContext<InferSchema<T>>()
  const {
    register,
    control,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
  } = form
  // console.log("form", watch())
  const handleNext = async () => {
    const valid = await trigger()
    if (valid) onNext()
    else console.log("Validation Errors:", errors)
    // onNext()
  }

  return (
    <div className="space-y-6">
      <ShippingTypeSelector shipmentType={shipmentType} setShipmentType={setShipmentType} />
      <div className="flex flex-col md:flex-row gap-6">
        <ShippingAddressSection shipmentType={shipmentType} type="FROM" title="Shipping From" />
        <ShippingAddressSection shipmentType={shipmentType} type="TO" title="Shipping To" />
      </div>
      {quoteType === "SPOT" ?
        <>
          <EquimentTypeSelector
            shipmentType={shipmentType}
          />
          <ContactInformation onNext={handleNext} />
        </>
        : ""}

    </div>
  )
}
