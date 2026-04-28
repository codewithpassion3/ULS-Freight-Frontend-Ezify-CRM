import { getAllPalletShippingLocationTypes } from "@/api/services/address-book.api"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactType } from "../../../app/(user)/settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { SelectAddressBookModal } from "./SelectAddressBookModal"
import { useQuery } from "@tanstack/react-query"
import { useMarkContactAsRecent } from "../../../app/(user)/quote/hooks"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, BookUser, InfoIcon, Plus, X } from "lucide-react"
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
import { Input } from "@/components/ui/input"
export const ShippingAddressSection = forwardRef(({ quoteType, shipmentType, type, title, onNextStep, onSwap, setShipDate }: { quoteType: keyof ShipmentOptions, shipmentType: ShipmentOptions[keyof ShipmentOptions], type: "TO" | "FROM", title: string, onNextStep?: (data: any) => void, onSwap?: () => void, setShipDate?: (date: Date | undefined) => void }, ref) => {
  // check if route includes shipment to check if it quote or shipment
  const pathname = usePathname()
  const isShipment = pathname.includes("shipment")
  const quoteId = useSearchParams().get("id")
  const markContactAsRecent = useMarkContactAsRecent()
  const [addressLocked, setAddressLocked] = useState(false)
  const showLocationType = quoteType === "SPOT" || shipmentType === "PALLET";
  const showAdditionalNotes = quoteType === "SPOT";
  const [billingRefs, setBillingRefs] = useState<string[]>([""])

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
    phoneNumber: "",
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
      // set mins to 00 and hours to 12
    },
    readyTimeHour: "09",
    readyTimeMinute: "00",
    readyTimeAmPm: "AM",
    closeTimeHour: "05",
    closeTimeMinute: "00",
    closeTimeAmPm: "PM",
    shipDate: undefined,
  }

  const defaultValues = isShipment ? shipmentDefaultValues : addressDefaultValues;
  const localSchema = useMemo(() => {
    if (isShipment) {
      // make a field optional from contact schema
      const { signatureId, ...rest } = contactSchema.shape;
      let baseShape: any = {
        ...rest,
        signatureId: signatureId.optional(),
      };

      if (type === "FROM") {
        baseShape.shipDate = z.date({
          message: "Ship date is required",
        }).min(new Date(new Date().setHours(0, 0, 0, 0)), {
          message: "Ship date cannot be in the past",
        });
      }

      return z.object(baseShape);
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
    defaultValues: defaultValues,
    shouldUnregister: false,
  });

  // set ship date to today
  // make ship date undefined

  const postalCodeWatch = methods.watch("address.postalCode") || "";

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


  // on change of ship date setshipdate state coming from parent

  // useEffect(() => {
  //   if (isShipment) {
  //     // @ts-ignore
  //     methods.register("shipDate");
  //   }
  // }, [isShipment]);

  // errors
  console.log("errors", methods.formState.errors);


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
    // methods.reset({
    //   ...currentValues,
    //   // @ts-ignore
    //   shipDate: currentValues.shipDate,
    //   addressBookId: Number(contact.id),
    //   type: type,
    //   address: {
    //     address1: contact.address?.address1 || "",
    //     postalCode: contact.address?.postalCode || "",
    //     city: contact.address?.city || "",
    //     state: contact.address?.state || "",
    //     country: contact.address?.country || "",
    //     ...(isShipment && { unit: contact.address?.unit || "" }),

    //   },

    //   ...(showLocationType && { locationTypeId: contact?.locationTypeId || "" }),
    //   ...(isShipment && { companyName: contact.companyName }),
    //   // ...(isShipment && { contactId: contact.id }),
    //   ...(isShipment && { address2: contact.address?.address2 || "" }),
    //   // contact information
    //   ...(isShipment && { contactName: contact.contactName || "" }),
    //   ...(isShipment && { email: contact.email || "" }),
    //   ...(isShipment && { phoneNumber: contact.phoneNumber || "" }),

    // });
    methods.setValue("addressBookId", Number(contact.id));
    methods.setValue("type", type);

    methods.setValue("address", {
      address1: contact.address?.address1 || "",
      postalCode: contact.address?.postalCode || "",
      city: contact.address?.city || "",
      state: contact.address?.state || "",
      country: contact.address?.country || "",
      ...(isShipment && { unit: contact.address?.unit || "" }),
    });

    if (showLocationType) {
      methods.setValue("locationTypeId", contact?.locationTypeId || "");
    }

    if (isShipment) {
      methods.setValue("companyName", contact.companyName || "");
      methods.setValue("address2", contact.address?.address2 || "");
      methods.setValue("contactName", contact.contactName || "");
      methods.setValue("email", contact.email || "");
      methods.setValue("phoneNumber", contact.phoneNumber || "");
    }
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
  // show shipdate
  console.log("shipDate", methods.watch("shipDate"));
  // show values
  // show errors




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
      // disabled: addressLocked,
      show: isShipment,
    },
    {
      name: "address.address1",
      label: "Address",
      type: "text",
      placeholder: "Address",
      disabled: addressLocked,
      show: isShipment,
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
      valueType: "number",
      wrapperClassName: !isShipment ? "col-span-2" : "",
    },
    {
      name: "isResidential",
      label: "Residential Address",
      type: "checkbox",
      placeholder: "Location Type",
      icon: <InfoIcon size={16} />,
      disabled: addressLocked,
      show: shipmentType === "PACKAGE" || shipmentType === "COURIER_PAK",
      wrapperClassName: "col-span-2",
    },
    // include straps for FTL
    {
      name: "includeStraps",
      label: "Include Straps",
      type: "checkbox",
      placeholder: "Include Straps",
      icon: <InfoIcon size={16} />,
      disabled: addressLocked,
      show: shipmentType === "STANDARD_FTL" && type === "FROM",
      wrapperClassName: "col-span-2",
    },
    // apointment delivery for ftl for type TO
    {
      name: "appointmentDelivery",
      label: "Appointment Delivery",
      type: "checkbox",
      placeholder: "Appointment Delivery",
      icon: <InfoIcon size={16} />,
      disabled: addressLocked,
      show: shipmentType === "STANDARD_FTL" && type === "TO",
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

    // ship date
    {
      name: "shipDate",
      label: "Ship Date",
      type: "date",
      placeholder: "Ship Date",
      show: isShipment && type === "FROM",
      futureDatesOnly: true,
      // disabled: addressLocked,
    },


  ];
  const addBillingRef = () => {
    if (billingRefs.length < 3) {
      setBillingRefs([...billingRefs, ""])
    }
  }

  const updateBillingRef = (index: number, value: string) => {
    const updated = [...billingRefs]
    updated[index] = value
    setBillingRefs(updated)
  }

  const removeBillingRef = (index: number) => {
    const updated = billingRefs.filter((_, i) => i !== index)
    setBillingRefs(updated)
  }

  console.log("values", methods.getValues());


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
            extra={
              shipmentType === "STANDARD_FTL" && (
                <p className="col-span-2 text-muted-foreground text-sm">FTL Location Type: Business - Tailgate Not Required</p>
              )
            }
          />
          {
            isShipment && type === "TO" && (
              <div className="col-span-2 space-y-2">

                {billingRefs.map((ref, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder={`Billing Reference Code ${index + 1}`}
                      value={ref}
                      onChange={(e) => updateBillingRef(index, e.target.value)}
                      className="w-full"
                    />

                    {billingRefs.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeBillingRef(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <div className="w-full flex justify-end">
                  {billingRefs.length < 3 && (
                    <Button
                      type="button"
                      onClick={addBillingRef}
                    >
                      <Plus />
                      Add
                    </Button>
                  )}
                </div>

              </div>
            )
          }
        </form>
      </FormProvider>
    </>
  )
})
