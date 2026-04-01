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
import { FormSelect } from "@/components/common/forms/FormSelect"
import { useSearchParams } from "next/navigation"
import { getSingleQuote } from "@/api/services/quotes.api"
import { Loader } from "@/components/common/Loader"


export const ShippingAddressSection = <T extends ZodType<any>>({ shipmentType, type, title }: { shipmentType: ShipmentOptions[keyof ShipmentOptions], type: "TO" | "FROM", title: string }) => {
  const { register, setValue, resetField, getValues, watch, formState: { errors } } = useFormContext<any>()
  const quoteId = useSearchParams().get("id")
  const markContactAsRecent = useMarkContactAsRecent()
  const [addressLocked, setAddressLocked] = useState(false)

  const { data: cachedSingleQuote, isLoading, isPending } = useQuery({
    queryKey: ["singleQuote", quoteId],
    queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
    enabled: !!quoteId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  const index = type === "FROM" ? 0 : 1
  useEffect(() => {
    if (!cachedSingleQuote) return;

    const addresses = getValues("addresses") || [];
    if (!addresses[index]) {
      addresses[index] = {}; // initialize if missing
      setValue("addresses", addresses);
    }

    const quoteAddress = cachedSingleQuote.quote.addresses[index]?.address
      ?? cachedSingleQuote.quote.addresses[index]?.addressBookEntry?.address;

    if (quoteAddress) {
      setAddressLocked(true);
      setValue(`addresses.${index}`, {
        ...addresses[index],
        type,
        addressBookId: cachedSingleQuote.quote.addresses[index]?.addressBook?.id ?? null,
        address1: quoteAddress.address1,
        postalCode: quoteAddress.postalCode,
        city: quoteAddress.city,
        state: quoteAddress.state,
        country: quoteAddress.country,
        ...(shipmentType === "STANDARD_FTL" && { locationType: quoteAddress.locationType }),
      }, { shouldValidate: true });
    }

  }, [cachedSingleQuote, index, type, shipmentType]);
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
      // locationType: contact?.locationTypeId || "",
      ...(shipmentType === "STANDARD_FTL" && { locationType: contact?.locationTypeId || "" }),
    }, { shouldValidate: true });
  }


  const { data: palletShippingLocationTypesRes, isLoading: isLoadingPallet, isPending: isPendingPallet } = useQuery({
    queryKey: ["palletShippingLocationTypes"],
    queryFn: getAllPalletShippingLocationTypes
  })

  const handleClearAddress = () => {
    setAddressLocked(false)
    // const addresses = getValues("addresses").map((item: any, i: number) =>
    //   i === index
    //     ? { ...item, addressBookId: null, address1: "", postalCode: "", city: "", state: "", country: "", locationType: "", additionalNotes: "" }
    //     : item
    // );
    // setValue("addresses", addresses, { shouldValidate: true, shouldDirty: true });
    resetField(`addresses.${index}.address1`)
    resetField(`addresses.${index}.postalCode`)
    resetField(`addresses.${index}.city`)
    resetField(`addresses.${index}.state`)
    resetField(`addresses.${index}.country`)
    resetField(`addresses.${index}.locationType`)
  };
  const handleSwap = () => {
    const from = getValues("addresses.0")
    const to = getValues("addresses.1")
    setValue("addresses.0", to)
    setValue("addresses.1", from)
    setValue("addresses.0.type", "FROM")
    setValue("addresses.1.type", "TO")
  }
  if (quoteId) {
    if (isLoading || isPending) {
      return <Loader />
    }
  }
  return (
    <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white dark:bg-card shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button variant="destructive" type="button" onClick={handleClearAddress}>
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
            name={`addresses.${index}.address1`}
            placeholder="Address"
            disabled={addressLocked}
          />
          <FormField
            label="Postal/ZIP Code*"
            name={`addresses.${index}.postalCode`}
            placeholder="A1A 1A1"
            disabled={addressLocked}
          />
          <FormField
            label="City*"
            name={`addresses.${index}.city`}
            placeholder="City Name"
            disabled={addressLocked}
          />
          <FormField
            label="Province/State*"
            name={`addresses.${index}.state`}
            placeholder="State/Province"
            disabled={addressLocked}
          />
          <FormField
            label="Country*"
            name={`addresses.${index}.country`}
            placeholder="Country"
            disabled={addressLocked}
          />
          {shipmentType === "STANDARD_FTL" && (
            <FormSelect
              label="Location Type*"
              name={`addresses.${index}.locationType`}
              placeholder="Location Type"
              options={palletShippingLocationTypesRes?.palletShippingLocationTypes.map((item: any) => ({
                value: item.id,
                label: item.name
              }))}
              valueType="number"
              disabled={addressLocked}
            />
          )}

        </div>
        {/* {shipmentType === "STANDARD_FTL" && (
          <p className="text-sm font-medium">FTL Location Type : {palletShippingLocationTypesRes?.palletShippingLocationTypes.find((item: any) => item.id === getValues(`${type}.locationType`))?.name}</p>
        )} */}

      </div>
    </div>
  )
}