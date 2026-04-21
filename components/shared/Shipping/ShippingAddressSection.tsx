import { getAllPalletShippingLocationTypes } from "@/api/services/address-book.api"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactType } from "../../../app/(user)/settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { SelectAddressBookModal } from "./SelectAddressBookModal"
import { useQuery } from "@tanstack/react-query"
import { useMarkContactAsRecent } from "../../../app/(user)/quote/hooks"
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
import { contactSchema } from "@/app/(user)/settings/(address-book)/schemas/addContact.schema"
import { getAddressByPostalCode } from "@/api/services/shipment.api"
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
  const addressDefaultValues = {
    // @ts-ignore
    type: type,
    address: {
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  }

  const shipmentDefaultValues = {
    companyName: "",
    contactId: "",
    phone: "",
    email: "",
    contactName: "",
    // @ts-ignore
    type: type,
    address: {
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  }

  const defaultValues = isShipment ? shipmentDefaultValues : addressDefaultValues;
  const localSchema = useMemo(() => {
    if (isShipment) {
      let schema = contactSchema;

      return schema;
    }
    else {
      let schema = contactSchema.pick({
        address: true,
      });

      if (showLocationType) {
        schema = schema.extend({ locationTypeId: z.number("Location type is required") }) as any;
      }
      return schema;
    }
  }, [shipmentType]);
  const methods = useForm({
    // @ts-ignore
    resolver: zodResolver(localSchema),
    mode: "onChange",
    defaultValues: defaultValues
  });

  const postalCodeWatch = methods.watch("address.postalCode")

  const countryCode = postalCodeWatch.match(/^\d{5}(-\d{4})?$/) ? "us" : "ca";
  const { data: postalCodeData, isLoading: postalCodeLoading, isPending: postalCodeIsPending } = useQuery({
    queryKey: ["postalCode", postalCodeWatch],
    queryFn: () => getAddressByPostalCode(postalCodeWatch, countryCode),
    // enabled: postalCodeWatch.length === 5,
  })

  useEffect(() => {
    if (postalCodeData) {
      methods.setValue("address.city", postalCodeData.places[0]["place name"])
      methods.setValue("address.state", postalCodeData.places[0].state)
      methods.setValue("address.country", postalCodeData.places[0].state)
    }
  }, [postalCodeData, postalCodeWatch])







  useImperativeHandle(ref, () => ({
    getValues: methods.getValues,
    setValues: (vals: any) => methods.reset({ ...vals }),
    trigger: methods.trigger
  }), [methods]);

  const index = type === "FROM" ? 0 : 1
  // print errors
  console.log("errors", methods.formState.errors);
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
        address: {
          address1: quoteAddress.address.address1 || "",
          postalCode: quoteAddress.address.postalCode || "",
          city: quoteAddress.address.city || "",
          state: quoteAddress.address.state || "",
          country: quoteAddress.address.country || "",
        },
        ...(showLocationType && { locationTypeId: quoteAddress.locationTypeId }),
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
    markContactAsRecent.mutate(contact.id || "")
    setAddressLocked(true)
    const currentValues = methods.getValues();
    methods.reset({
      ...currentValues,
      // @ts-ignore
      addressBookId: Number(contact.id),
      type: type,
      address: {
        address1: contact.address?.address1 || "",
        postalCode: contact.address?.postalCode || "",
        city: contact.address?.city || "",
        state: contact.address?.state || "",
        country: contact.address?.country || "",
      },

      ...(showLocationType && { locationTypeId: contact?.locationTypeId || "" }),
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
  }

  const { data: locationTypeData, isLoading: locationTypeLoading, isPending: locationTypeIsPending } = useQuery({
    queryKey: ["palletShippingLocationTypes"],
    queryFn: getAllPalletShippingLocationTypes
  })

  const handleClearAddress = () => {
    setAddressLocked(false)
    methods.reset({
      address: {
        address1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      ...(showLocationType && { locationTypeId: "" }),
      ...(isShipment && { companyName: "" }),
      ...(isShipment && { contactId: "" }),
      ...(isShipment && { address2: "" }),
      ...(isShipment && { unit: "" }),
      ...(isShipment && { contactName: "" }),
      ...(isShipment && { email: "" }),
      ...(isShipment && { phoneNumber: "" }),
      ...(isShipment && { read: "" }),


    });
  };

  // show all values and errors


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
      name: "address.address1",
      label: "Address",
      type: "text",
      placeholder: "Address",
      disabled: addressLocked,
    },
    {
      name: "address.address2",
      label: "Address 2 (optional)",
      type: "text",
      // placeholder: "Address",
      disabled: addressLocked,
      show: isShipment,
    },
    {
      name: "address.unit",
      label: "Unit/Floor #",
      type: "text",
      // placeholder: "Address",
      disabled: addressLocked,
      show: isShipment,

    },
    {
      name: "address.postalCode",
      label: "Postal/ZIP Code *",
      type: "text",
      placeholder: "A1A 1A1",
      disabled: addressLocked,
    },
    {
      name: "address.city",
      label: "City",
      type: "text",
      placeholder: "City Name",
      disabled: addressLocked,
    },
    {
      name: "address.state",
      label: "Province/State",
      type: "text",
      placeholder: "State/Province",
      disabled: addressLocked,
    },
    {
      name: "address.country",
      label: "Country",
      type: "text",
      placeholder: "Country",
      disabled: addressLocked,
    },
    {
      name: "locationTypeId",
      label: "Location Type*",
      type: "select",
      placeholder: "Location Type",
      options: locationTypeLoading || locationTypeIsPending ? [] : locationTypeData?.palletShippingLocationTypes?.map((item: any) => ({
        value: item.id,
        label: item.name
      })),
      disabled: addressLocked,
      show: showLocationType,
      valueType: "number"
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
      show: isShipment,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      show: isShipment,
      disabled: addressLocked,
    },
    {
      name: "phoneNumber",
      label: "Phone",
      type: "phone",
      placeholder: "Phone",
      show: isShipment,
      disabled: addressLocked,
    },
    {
      name: "defaultInstructions",
      label: "Default Instructions",
      type: "text",
      placeholder: "Default Instructions",
      show: isShipment,
      disabled: addressLocked,
      wrapperClassName: "col-span-2",
    },
    // ready time
    {
      name: "palletShippingReadyTime",
      label: "Ready Time",
      type: "time",
      placeholder: "Ready Time",
      show: isShipment && shipmentType === "PALLET",
      disabled: addressLocked,
      hourName: "readyTimeHour",
      minuteName: "readyTimeMinute",
      ampmName: "readyTimeAmPm",
    },
    {
      name: "palletShippingCloseTime",
      label: "Close Time",
      type: "time",
      placeholder: "Close Time",
      hourName: "closeTimeHour",
      minuteName: "closeTimeMinute",
      ampmName: "closeTimeAmPm",
      show: isShipment && shipmentType === "PALLET",
      disabled: addressLocked,
    },
    // save contact to address book
    {
      name: "saveToAddressBook",
      label: "Save Contact to Address Book",
      type: "checkbox",
      placeholder: "Save Contact to Address Book",
      show: isShipment,
      // disabled: addressLocked,
      icon: <InfoIcon size={16} />,
      wrapperClassName: "col-span-2",
    },
    // save as new default
    {
      name: "saveAsNewDefault",
      label: "Save as New Default",
      type: "checkbox",
      placeholder: "Save as New Default",
      show: isShipment && type === "FROM",
      // disabled: addressLocked,
      icon: <InfoIcon size={16} />,
      wrapperClassName: "col-span-2",
    },
    // billing reference code optional
    {
      name: "billingReferenceCode",
      label: "Billing Reference Code (Optional)",
      type: "text",
      placeholder: "Billing Reference Code",
      show: isShipment && type === "TO",
      // disabled: addressLocked,
      wrapperClassName: "col-span-2",
    },
    // ship date
    {
      name: "shipDate",
      label: "Ship Date",
      type: "date",
      placeholder: "Ship Date",
      show: isShipment && type === "FROM",
      // disabled: addressLocked,
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
        </form>
      </FormProvider>
    </>
  )
})
