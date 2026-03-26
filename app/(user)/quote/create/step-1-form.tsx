"use client"

import { useFormContext, Controller } from "react-hook-form"
import { quoteSchema, QuoteSchemaTypes } from "@/lib/validations/quote/quote-schema"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, Truck, Clock, ArrowRight, ArrowLeftRight, X } from "lucide-react"
import FormField from "@/components/common/forms/FormField"
import { Input } from "@/components/ui/input"
import { SelectAddressBookModal } from "./SelectAddressBookModal"
import { ContactType } from "../../settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { FormSelect } from "@/components/common/forms/FormSelect"
import { getAllPalletShippingLocationTypes, markContactAsRecent } from "@/api/services/quotes.api"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@/components/common/Loader"
import { FormFieldWrapper } from "@/components/common/forms/FormFieldWrapper"
import { useMarkContactAsRecent } from "./hooks"
import { ShippingTypeSelector } from "./Step1Form/ShippingTypeSelector"
import { EquimentTypeSelector } from "./Step1Form/EquimentSelection/EquimentTypeSelector"
import ContactInformation from "./Step1Form/ContactInformation/ContactInformation"


export type ShipmentType = "LTL-Partial Truckload" | "Full Truck Load" | "Time Critical"
export function Step1Form({ onNext }: { onNext: () => void }) {
  const form = useFormContext<QuoteSchemaTypes>()
  const markContactAsRecent = useMarkContactAsRecent()
  const {
    register,
    control,
    formState: { errors, defaultValues },
    trigger,
    watch,
    setValue,
  } = form

  const handleNext = async () => {
    const valid = await trigger()
    if (valid) onNext()
    else console.log("Validation Errors:", errors)
  }

  const shipmentType = watch("shipmentType")
  const setShipmentType = (type: ShipmentType) => {
    setValue("shipmentType", type, { shouldValidate: true })
    // Re-trigger defaults if needed when switching tab
  }

  // Helper component for the Shipping address sections
  const ShippingAddressSection = ({ type, title }: { type: "shippingFrom" | "shippingTo", title: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typeErrors = errors[type] as any

    const handleAddressSelect = (contact: ContactType) => {
      markContactAsRecent.mutate(contact.id || "")
      console.log(contact)
      setValue(`${type}.address1`, contact.address?.address1 || "", { shouldValidate: true });
      setValue(`${type}.postalCode`, contact.address?.postalCode || "", { shouldValidate: true });
      setValue(`${type}.city`, contact.address?.city || "", { shouldValidate: true });
      setValue(`${type}.province`, contact.address?.state || "", { shouldValidate: true });
      setValue(`${type}.country`, contact.address?.country || "", { shouldValidate: true });
      setValue(`${type}.locationType`, contact?.locationTypeId.toString() || "", { shouldValidate: true });
    }

    const clearAddress = () => {
      setValue(`${type}.address1`, "");
      setValue(`${type}.postalCode`, "");
      setValue(`${type}.city`, "");
      setValue(`${type}.province`, "");
      setValue(`${type}.country`, "");
      setValue(`${type}.locationType`, "");
      setValue(`${type}.additionalNotes`, "");
    }

    const { data: palletShippingLocationTypesRes, isLoading: isLoadingPallet, isPending: isPendingPallet } = useQuery({
      queryKey: ["palletShippingLocationTypes"],
      queryFn: getAllPalletShippingLocationTypes
    })

    return (
      <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white">
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <Label htmlFor={`${type}.address1`}>Address 1 (optional)</Label>
            <SelectAddressBookModal onSelect={handleAddressSelect} />
          </div>
          <Input
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...register(`${type}.address1` as any)}
            placeholder="123 Address"
          />
          <p className="text-xs text-muted-foreground">P.O Box Addresses are not accepted</p>

          {/* <GlobalForm
            wrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-2"
            schema={quoteSchema.shape[type]}
            fields={[
              {
                name: `${type}.postalCode`,
                label: "Postal/ZIP Code*",
                type: "text",
                placeholder: "A1A 1A1",

              },
              {
                name: `${type}.city`,
                label: "City*",
                type: "text",
                placeholder: "City Name",

              },
              {
                name: `${type}.province`,
                label: "Province/State*",
                type: "text",
                placeholder: "State/Province",

              },
              {
                name: `${type}.country`,
                label: "Country*",
                type: "text",
                placeholder: "Country",

              },
              {
                name: `${type}.locationType`,
                label: "Location Type*",
                type: "select",
                placeholder: "Select",
                options: palletShippingLocationTypesRes.palletShippingLocationTypes,
                optionKey: "id",
                optionValue: "name",
              }

            ]}
          /> */}

          {!isLoadingPallet && !isPendingPallet ?
            <>
              <FormSelect
                label="Location Type*"
                name={`${type}.locationType` as "shippingFrom.locationType" | "shippingTo.locationType"}
                control={control}
                options={palletShippingLocationTypesRes.palletShippingLocationTypes}
                optionKey="id"
                optionValue="name"
                placeholder="Select"
                className={`${typeErrors?.locationType ? "border-red-500" : ""} w-max`}
                hasError={!!typeErrors?.locationType}
                defaultValue={defaultValues?.shippingFrom?.locationType}
              />
              <p>{defaultValues?.shippingFrom?.locationType}</p>
            </>
            : <Loader />
          }

          <FormField
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name={`${type}.additionalNotes` as any}
            label="Additional Notes (optional)"
            placeholder=""
            register={register}
            error={typeErrors?.additionalNotes}
          />
        </div>
      </div>
    )
  }

  const clearContact = () => {
    setValue("contactInformation.contactName", "");
    setValue("contactInformation.phoneNumber", "");
    setValue("contactInformation.ext", "");
    setValue("contactInformation.shipDate", "");
    setValue("contactInformation.emailAddress", "");
    setValue("contactInformation.spotQuoteName", "");
  }

  return (
    <div className="space-y-6">
      <ShippingTypeSelector shipmentType={shipmentType} setShipmentType={setShipmentType} errors={errors} />
      <div className="flex flex-col md:flex-row gap-6">
        <ShippingAddressSection type="shippingFrom" title="Shipping From" />
        <ShippingAddressSection type="shippingTo" title="Shipping To" />
      </div>
      <EquimentTypeSelector
        control={control}
        errors={errors}
        watch={watch}
        shipmentType={shipmentType}
      />
      <ContactInformation onNext={handleNext} clearContact={clearContact} />
    </div>
  )
}
