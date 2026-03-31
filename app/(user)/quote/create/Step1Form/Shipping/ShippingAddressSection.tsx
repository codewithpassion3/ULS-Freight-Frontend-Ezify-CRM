import { getAllPalletShippingLocationTypes } from "@/api/services/address-book.api"
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form"
import { QuoteSchemaTypes } from "@/lib/validations/quote/spot-quote-schema"
import { ContactType } from "../../../../settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { FormFieldWrapper } from "@/components/common/forms/FormFieldWrapper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectAddressBookModal } from "./SelectAddressBookModal"
import { useQuery } from "@tanstack/react-query"
import { useMarkContactAsRecent } from "../../hooks"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, X } from "lucide-react"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"
import { ShipmentOptions } from "../../CreateQuote"
import z, { ZodType } from "zod"
import { useEffect, useMemo, useState } from "react"
import { InferSchema } from "../../quote.types"
import FormField from "@/components/common/forms/FormField"


export const ShippingAddressSection = <T extends ZodType<any>>({ shipmentType, type, title }: { shipmentType: ShipmentOptions[keyof ShipmentOptions], type: "TO" | "FROM", title: string }) => {
  // console.log("shipmentType", shipmentType)
  const { register, setValue, reset, getValues, watch, formState: { errors } } = useFormContext<any>()
  const markContactAsRecent = useMarkContactAsRecent()
  // const { setValue } = useFormContext()
  const [addressLocked, setAddressLocked] = useState(false)

  const index = type === "FROM" ? 0 : 1
  useEffect(() => {
    setValue(`addresses.${index}.type`, type)
  }, [])
  const handleAddressSelect = (contact: ContactType) => {
    markContactAsRecent.mutate(contact.id || "")
    setAddressLocked(true)
    setValue(`addresses.${index}`, {
      ...getValues(`addresses.${index}`),
      type: type,
      addressBookId: contact.id,
      address1: contact.address?.address1 || "",
      postalCode: contact.address?.postalCode || "",
      city: contact.address?.city || "",
      state: contact.address?.state || "",
      country: contact.address?.country || "",
      ...(shipmentType === "STANDARD_FTL" && { locationType: contact?.locationTypeId?.toString() || "" }),
    }, { shouldValidate: true });
  }


  const { data: palletShippingLocationTypesRes, isLoading: isLoadingPallet, isPending: isPendingPallet } = useQuery({
    queryKey: ["palletShippingLocationTypes"],
    queryFn: getAllPalletShippingLocationTypes
  })

  const handleClearAddress = () => {
    setAddressLocked(false)
    const addresses = getValues("addresses").map((item: any, i: number) =>
      i === index
        ? { ...item, addressBookId: null, address1: "", postalCode: "", city: "", state: "", country: "", locationType: "", additionalNotes: "" }
        : item
    );
    setValue("addresses", addresses, { shouldValidate: true, shouldDirty: true });
  };
  const handleSwap = () => {
    const from = getValues("addresses.0")
    const to = getValues("addresses.1")
    setValue("addresses.0", to)
    setValue("addresses.1", from)
    setValue("addresses.0.type", "FROM")
    setValue("addresses.1.type", "TO")
  }

  console.log("errors", errors)

  return (
    <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white dark:bg-card shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={handleClearAddress}>
            <X />
            Clear
          </Button>
          <Button variant="outline" type="button" onClick={handleSwap}>
            <ArrowLeftRight />
            Swap
          </Button>
        </div>
      </div>
      <div className="space-y-4 mt-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Select Address</p>
          <SelectAddressBookModal onSelect={handleAddressSelect} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Address*"
            name={`addresses.[${index}].address1`}
            placeholder="Address"
            disabled={addressLocked}
          />
          <FormField
            label="Postal/ZIP Code*"
            name={`addresses.[${index}].postalCode`}
            placeholder="A1A 1A1"
            disabled={addressLocked}
          />
          <FormField
            label="City*"
            name={`addresses.[${index}].city`}
            placeholder="City Name"
            disabled={addressLocked}
          />
          <FormField
            label="Province/State*"
            name={`addresses.[${index}].state`}
            placeholder="State/Province"
            disabled={addressLocked}
          />
          <FormField
            label="Country*"
            name={`addresses.[${index}].country`}
            placeholder="Country"
            disabled={addressLocked}
          />
        </div>
        {shipmentType === "STANDARD_FTL" && (
          <p className="text-sm font-medium">FTL Location Type : {palletShippingLocationTypesRes?.palletShippingLocationTypes.find((item: any) => item.id === getValues(`${type}.locationType`))?.name}</p>
        )}

      </div>
    </div>
  )
}