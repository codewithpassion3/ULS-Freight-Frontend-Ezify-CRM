import { getAllPalletShippingLocationTypes } from "@/api/services/address-book.api"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactType } from "../../../app/(user)/settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { SelectAddressBookModal } from "./SelectAddressBookModal"
import { useQuery } from "@tanstack/react-query"
import { useMarkContactAsRecent } from "../../../app/(user)/quote/create/hooks"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, BookUser, InfoIcon, X } from "lucide-react"
import { ShipmentOptions } from "../DynamicQuote/DynamicQuote"
import z, { ZodType } from "zod"
import { useEffect, useMemo, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { getSingleQuote } from "@/api/services/quotes.api"
import { addressSchema } from "@/lib/validations/quote/standard-quote-schema"

export { addressSchema }

export const addressesSchema = z.object({
  addresses: z.array(addressSchema).length(2)
})

export type AddressesSchemaTypes = z.infer<typeof addressesSchema>

function getRequiredFields(schema: z.ZodObject<any>) {
  const shape = schema.shape
  if (!shape) return [];
  return Object.keys(shape).filter((key) => {
    const field = shape[key]
    // check if the field is optional or has default
    return !(
      field.isOptional?.() || field.isNullable?.() || field._def.defaultValue
    )
  })
}

import { forwardRef, useImperativeHandle } from "react"
import { FormFieldTypes, FormFieldUnion } from "@/components/common/form/fields/fields.types"
import FormDate from "@/components/common/form/fields/FormDate"
export const ShippingAddressSection = forwardRef(({ quoteType, shipmentType, type, title, onNextStep, onSwap, setShipDate }: { quoteType: keyof ShipmentOptions, shipmentType: ShipmentOptions[keyof ShipmentOptions], type: "TO" | "FROM", title: string, onNextStep?: (data: any) => void, onSwap?: () => void, setShipDate?: (date: Date | undefined) => void }, ref) => {
  // check if route includes shipment to check if it quote or shipment
  const pathname = usePathname()
  const isShipment = pathname.includes("shipment")
  const quoteId = useSearchParams().get("id")
  const markContactAsRecent = useMarkContactAsRecent()
  const [addressLocked, setAddressLocked] = useState(false)
  const showLocationType = quoteType === "SPOT" || shipmentType === "STANDARD_FTL" || isShipment;
  const showAdditionalNotes = quoteType === "SPOT";
  const { data: cachedSingleQuote, isLoading, isPending } = useQuery({
    queryKey: ["singleQuote", quoteId],
    queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
    enabled: !!quoteId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const localSchema = useMemo(() => {
    let schema = addressSchema;
    if (showLocationType) {
      schema = schema.extend({ locationType: z.string("Location type is required") }) as any;
    }
    return schema;
  }, [shipmentType]);

  const methods = useForm({
    resolver: zodResolver(localSchema),
    mode: "onChange",
    defaultValues: {
      type: type,
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    }
  });

  useImperativeHandle(ref, () => ({
    getValues: methods.getValues,
    setValues: (vals: any) => methods.reset({ ...vals }),
    trigger: methods.trigger
  }), [methods]);

  const index = type === "FROM" ? 0 : 1

  useEffect(() => {
    if (!cachedSingleQuote) return;

    const quoteAddress = cachedSingleQuote.quote.addresses[index].address
      ? cachedSingleQuote.quote.addresses[index] : cachedSingleQuote.quote.addresses[index]?.addressBookEntry;
    const isAddressBookEntry = cachedSingleQuote.quote.addresses[index]?.addressBookEntry?.address;
    // const completeAddressFromAddressBook = cachedSingleQuote.quote.addresses[index]?.addressBookEntry;

    if (quoteAddress) {
      setAddressLocked(true);
      methods.reset({
        type,
        ...(isAddressBookEntry && { addressBookId: quoteAddress.id ?? null }),
        address1: quoteAddress.address.address1 || "",
        postalCode: quoteAddress.address.postalCode || "",
        city: quoteAddress.address.city || "",
        state: quoteAddress.address.state || "",
        country: quoteAddress.address.country || "",
        ...(showLocationType && { locationType: quoteAddress.locationType }),
        ...(isShipment && { companyName: quoteAddress.companyName }),
        ...(isShipment && { contactId: quoteAddress.contactId }),
        ...(isShipment && { address2: quoteAddress.address2 }),
        ...(isShipment && { unit: quoteAddress.unit }),
        ...(isShipment && { contactName: quoteAddress.contactName }),
        ...(isShipment && { email: quoteAddress.email }),
        ...(isShipment && { phoneNumber: quoteAddress.phoneNumber }),

      });
    }

  }, [cachedSingleQuote, index, type, shipmentType, methods]);

  const handleAddressSelect = (contact: ContactType) => {
    console.log(contact)
    markContactAsRecent.mutate(contact.id || "")
    setAddressLocked(true)
    const currentValues = methods.getValues();
    methods.reset({
      ...currentValues,
      type: type,
      addressBookId: Number(contact.id),
      address1: contact.address?.address1 || "",
      postalCode: contact.address?.postalCode || "",
      city: contact.address?.city || "",
      state: contact.address?.state || "",
      country: contact.address?.country || "",

      ...(showLocationType && { locationType: contact?.locationTypeId || "" }),
      ...(isShipment && { companyName: contact.companyName }),
      // ...(isShipment && { contactId: contact.id }),
      ...(isShipment && { address2: contact.address?.address2 || "" }),
      ...(isShipment && { unit: contact.address?.unit || "" }),
      // contact information
      ...(isShipment && { contactName: contact.contactName || "" }),
      ...(isShipment && { email: contact.email || "" }),
      ...(isShipment && { phoneNumber: contact.phoneNumber || "" }),

    });
    // print location type
    console.log(contact)
  }



  const { data: locationTypeData, isLoading: locationTypeLoading, isPending: locationTypeIsPending } = useQuery({
    queryKey: ["palletShippingLocationTypes"],
    queryFn: getAllPalletShippingLocationTypes
  })

  const handleClearAddress = () => {
    setAddressLocked(false)
    methods.reset({
      type,
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  };

  const handleSwap = () => {
    // Parent handles the actual swapping by fetching from refs
    if (onSwap) {
      onSwap();
    }
  }
  if (quoteId) {
    if (isLoading || isPending) {
      return <></>
    }
  }

  const handleNext = (data: any) => {
    if (onNextStep) {
      onNextStep(data);
    }
  };

  const formFields: FormFieldUnion[] = [
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      placeholder: "Company Name",
      disabled: addressLocked,
      show: isShipment,
    },
    {
      name: "contactId",
      label: "Contact ID",
      type: "text",
      placeholder: "Contact ID",
      disabled: addressLocked,
      show: isShipment,
    },
    {
      name: "address1",
      label: "Address",
      type: "text",
      placeholder: "Address",
      disabled: addressLocked,
    },
    {
      name: "address2",
      label: "Address 2 (optional)",
      type: "text",
      // placeholder: "Address",
      disabled: addressLocked,
      show: isShipment,
    },
    {
      name: "unit",
      label: "Unit/Floor #",
      type: "text",
      // placeholder: "Address",
      disabled: addressLocked,
      show: isShipment,

    },
    {
      name: "postalCode",
      label: "Postal/ZIP Code *",
      type: "text",
      placeholder: "A1A 1A1",
      disabled: addressLocked,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "City Name",
      disabled: addressLocked,
    },
    {
      name: "state",
      label: "Province/State",
      type: "text",
      placeholder: "State/Province",
      disabled: addressLocked,
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Country",
      disabled: addressLocked,
    },
    {
      name: "locationType",
      label: "Location Type*",
      type: "select",
      placeholder: "Location Type",
      options: locationTypeLoading || locationTypeIsPending ? [] : locationTypeData?.palletShippingLocationTypes?.map((item: any) => ({
        value: item.id,
        label: item.name
      })),
      disabled: addressLocked,
      show: showLocationType,
    },
    {
      name: "isResidential",
      label: "Residential Address",
      type: "checkbox",
      placeholder: "Location Type",
      icon: <InfoIcon size={16} />,
      disabled: addressLocked,
      show: false,
      wrapperClassName: "col-span-2",
    },
    // contact information
    {
      name: "contactName",
      label: "Contact Name",
      type: "text",
      placeholder: "Contact Name",
      disabled: addressLocked,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      disabled: addressLocked,
    },
    {
      name: "phoneNumber",
      label: "Phone",
      type: "phone",
      placeholder: "Phone",
      disabled: addressLocked,
    },


  ];

  return (
    <>
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleNext)} className="space-y-4 mt-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Select Address</p>
            <SelectAddressBookModal onSelect={handleAddressSelect} />
          </div>
          <GlobalForm
            formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-6"
            fields={formFields}
          />
          {type === "FROM" && <FormDate
            field={
              {
                name: "shipDate",
                label: "Ship Date",
                placeholder: "Ship Date",
                disabled: addressLocked,
                wrapperClassName: "w-1/2",
                setShipDate: setShipDate


              }}
          />}

        </form>
      </FormProvider>
    </>
  )
})
