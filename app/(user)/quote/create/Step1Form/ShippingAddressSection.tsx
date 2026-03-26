import { getAllPalletShippingLocationTypes } from "@/api/services/quotes.api"
import { useFormContext, UseFormReturn } from "react-hook-form"
import { QuoteSchemaTypes } from "@/lib/validations/quote/quote-schema"
import { ContactType } from "../../../settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { FormFieldWrapper } from "@/components/common/forms/FormFieldWrapper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectAddressBookModal } from "../SelectAddressBookModal"
import { useQuery } from "@tanstack/react-query"
import { ShipmentType } from "../step-1-form"
import { useMarkContactAsRecent } from "../hooks"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, X } from "lucide-react"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"

export const ShippingAddressSection = ({ shipmentType, type, title }: { shipmentType: ShipmentType, type: "shippingFrom" | "shippingTo", title: string }) => {
  const { register, setValue, reset, getValues } = useFormContext<QuoteSchemaTypes>()
  const markContactAsRecent = useMarkContactAsRecent()
  const handleAddressSelect = (contact: ContactType) => {
    markContactAsRecent.mutate(contact.id || "")
    setValue(`${type}.address1`, contact.address?.address1 || "", { shouldValidate: true });
    setValue(`${type}.postalCode`, contact.address?.postalCode || "", { shouldValidate: true });
    setValue(`${type}.city`, contact.address?.city || "", { shouldValidate: true });
    setValue(`${type}.province`, contact.address?.state || "", { shouldValidate: true });
    setValue(`${type}.country`, contact.address?.country || "", { shouldValidate: true });
    setValue(`${type}.locationType`, contact?.locationTypeId.toString() || "", { shouldValidate: true });
  }

  const { data: palletShippingLocationTypesRes, isLoading: isLoadingPallet, isPending: isPendingPallet } = useQuery({
    queryKey: ["palletShippingLocationTypes"],
    queryFn: getAllPalletShippingLocationTypes
  })

  const handleClearAddress = () => {
    reset({
      ...getValues(),
      [type]: {
        address1: "",
        postalCode: "",
        city: "",
        province: "",
        country: "",
        locationType: "",
        additionalNotes: ""
      }
    })
  }

  const handleSwap = () => {
    const from = getValues("shippingFrom")
    const to = getValues("shippingTo")

    setValue("shippingFrom", to)
    setValue("shippingTo", from)
  }

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
        {shipmentType === "LTL-Partial Truckload" ?
          <>
            <div className="flex justify-between items-center">
              <Label htmlFor={`${type}.address1`}>Address 1 (optional)</Label>
              <SelectAddressBookModal onSelect={handleAddressSelect} />
            </div>
            <Input
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...register(`${type}.address1`)}
              placeholder="123 Address"
            />
            <p className="text-xs text-muted-foreground">P.O Box Addresses are not accepted</p>
          </> : ""}

        {shipmentType === "Full Truck Load" && (
          <div className="flex justify-between items-center">
            <FormCheckbox
              name={`${type}.multipleLocations`}
              label={`Multiple ${type === "shippingFrom" ? "Pickup" : "Delivery"} Locations*`}
            />
          </div>
        )}
        <GlobalForm
          formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
              options: !isLoadingPallet && !isPendingPallet ? palletShippingLocationTypesRes.palletShippingLocationTypes : [],
              selectOptions: { optionKey: "id", optionValue: "name" },
              wrapperClassName: "col-span-2"
            },
            {
              name: `${type}.additionalNotes`,
              label: "Additional Notes (optional)",
              type: "textarea",
              placeholder: "",
              wrapperClassName: "col-span-2"
            }
          ]}
        />
      </div>
    </div>
  )
}