import { GlobalForm } from "@/components/common/form/GlobalForm"
// import { FormCheckbox } from "@/components/common/form/fields/FormCheckbox"
import { ChevronUp, Info, ListTodo, ShieldCheck } from "lucide-react"
import { useFormContext } from "react-hook-form"
import InBond from "./InBond"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { useEffect } from "react"
import { Loader } from "@/components/common/Loader"
import { ShipmentOptions } from "@/components/shared/DynamicQuote/DynamicQuote"

import { FormProvider, useForm } from "react-hook-form"
import { forwardRef, useImperativeHandle, useState } from "react"
import FormCheckbox from "@/components/common/form/fields/FormCheckbox"
import FormRadio from "@/components/common/form/fields/FormRadio"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/common/forms/FormInput"

const AdditionalServices = forwardRef(({ shipmentType }: { shipmentType: ShipmentOptions[keyof ShipmentOptions] }, ref) => {
    const additionalServicesSchema = z.object({
        limitedAccess: z.boolean().optional(),
        inBondCheckbox: z.boolean().optional(),
        inBound: z.object({
            bondType: z.string().optional(),
            bondCancler: z.string().optional(),
            contactKey: z.string().optional(),
            contactValue: z.string().optional(),
            address: z.string().optional()
        }).optional(),
        services: z.object({
            limitedAccess: z.string().optional(),
            appointmentDelivery: z.boolean().optional(),
            thresholdDelivery: z.boolean().optional(),
            thresholdPickup: z.boolean().optional(),
            protectFromFreeze: z.boolean().optional(),
            tradeShowDelivery: z.boolean().optional(),
            amazonOrFbaDelivery: z.boolean().optional(),
            refrigeratedServices: z.boolean().optional(),
            looseFreight: z.boolean().optional(),
            pallets: z.boolean().optional(),
            liftGateRequired: z.boolean().optional(),
            residentialPickup: z.boolean().optional(),
            residentialDelivery: z.boolean().optional(),
            insideDelivery: z.boolean().optional(),
            insidePickup: z.boolean().optional(),
            insideDeliveryStairs: z.boolean().optional(),
            insidePickupStairs: z.boolean().optional(),
            // limitedAccess.location:z.string().optional(),
            limitedAccessDescription: z.string().optional()
        })
    })
    const methods = useForm({
        resolver: zodResolver(additionalServicesSchema),
        mode: "onChange",
        defaultValues: {
            inBound: {
                bondType: "",
                bondCancler: "",
                contactKey: "EMAIL",
                contactValue: "",
                address: ""
            }
        }
    })
    const { watch, setValue, getValues } = methods
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        getValues: methods.getValues,
        setValues: (vals: any) => methods.reset({ ...vals }),
        trigger: methods.trigger,
        open: () => setIsOpen(true)
    }), [methods]);
    const quoteId = useSearchParams().get("id")
    const { data: cachedSingleQuote, isLoading, isPending } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
        enabled: !!quoteId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
    useEffect(() => {
        if (cachedSingleQuote) {
            const services = cachedSingleQuote.quote.palletServices;
            if (services) {
                setValue("services.limitedAccess", services.limitedAccess)
                setValue("services.appointmentDelivery", services.appointmentDelivery)
                setValue("services.thresholdDelivery", services.thresholdDelivery)
                setValue("services.thresholdPickup", services.thresholdPickup)
                // setValue("inbound", services.inbound)
                setValue("services.protectFromFreeze", services.protectFromFreeze)
                setValue("services.tradeShowDelivery", services.tradeShowDelivery)
                setValue("services.amazonOrFbaDelivery", services.amazonOrFbaDelivery)
                setValue("services.refrigeratedServices", services.refrigeratedServices)
                setValue("services.looseFreight", services.looseFreight)
                setValue("services.pallets", services.pallets)
                setValue("services.liftGateRequired", services.liftGateRequired)
                setValue("services.residentialPickup", services.residentialPickup)
                setValue("services.residentialDelivery", services.residentialDelivery)
                setValue("services.insideDelivery", services.insideDelivery)
                setValue("services.insidePickup", services.insidePickup)
                setValue("services.insideDeliveryStairs", services.insideDeliveryStairs)
                setValue("services.insidePickupStairs", services.insidePickupStairs)
            }
        }
    }, [cachedSingleQuote, setValue]);
    if (quoteId) {
        if (isLoading || isPending) {
            return <Loader />
        }
    }
    return (
        <FormProvider {...methods}>
            <Accordion type="single" collapsible value={isOpen ? "insurance" : ""} onValueChange={(val) => setIsOpen(!!val)} className="shadow-lg border border-border rounded-md bg-white dark:bg-card">
                <AccordionItem value="insurance" className="border-none">
                    <AccordionTrigger className="group px-6 py-4 hover:no-underline items-center cursor-pointer [&>svg]:hidden!" >
                        <h2 className="font-semibold flex items-center gap-2 text-lg text-slate-700 dark:text-white ">
                            <ListTodo />
                            Additional Services
                            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </h2>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 space-y-6 h-full">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-3 ">
                                <FormCheckbox
                                    field={{
                                        name: "limitedAccess",
                                        label: "Limited Access",
                                        defaultValue: false,
                                        icon: <Info size={16} />,
                                    }}
                                />
                                {watch("limitedAccess") &&
                                    <div className="my-4">
                                        <GlobalForm
                                            // formWrapperClassName="grid grid-cols-1"
                                            fields={[
                                                {
                                                    name: "services.limitedAccess",
                                                    label: "Location",
                                                    type: "radio",
                                                    options: [
                                                        { value: "constructionSite", label: "Construction Site" },
                                                        { value: "individualStorageUnit", label: "Individual (Mini) Storage Unit" },
                                                        { value: "fairAmusementPark", label: "Fair/Amusement Park" },
                                                        { value: "placeOfWorship", label: "Place of Worship" },
                                                        { value: "farmCountryClubEstate", label: "Farm/Country Club/Estate" },
                                                        { value: "securedLocationsDelivery", label: "Secured Locations Delivery - prisons, military bases, airport" },
                                                        { value: "schoolUniversity", label: "School/University" },
                                                        { value: "plazaMallDeliveries", label: "Plaza/Mall deliveries or stores with only parking lot/Street access" },
                                                        { value: "groceryRetailLocations", label: "Grocery/Retail Locations (ex: Costco or Walmart)" },
                                                        { value: "other", label: "Other" },
                                                    ],
                                                    className: "grid grid-cols-2 gap-4"
                                                },
                                                {
                                                    name: "limitedAccessDescription",
                                                    // label: "Other Location",
                                                    placeholder: "Please specify",
                                                    type: "text",
                                                    className: "w-1/3 ml-[50%]",
                                                    show: watch("services.limitedAccess") === "other"
                                                }
                                            ]}
                                        />
                                        {/* <FormRadio
                                            field={{
                                                className: "grid grid-cols-2 gap-4",
                                                name: "limitedAccess.location",
                                                label: "Location",
                                                options: [
                                                    {
                                                        value: "constructionSite",
                                                        label: "Construction Site",
                                                    },
                                                    {
                                                        value: "individualStorageUnit",
                                                        label: "Individual (Mini) Storage Unit",
                                                    },
                                                    {
                                                        value: "fairAmusementPark",
                                                        label: "Fair/Amusement Park",
                                                    },
                                                    {
                                                        value: "placeOfWorship",
                                                        label: "Place of Worship",
                                                    },
                                                    {
                                                        value: "farmCountryClubEstate",
                                                        label: "Farm/Country Club/Estate",
                                                    },
                                                    {
                                                        value: "securedLocationsDelivery",
                                                        label: "Secured Locations Delivery - prisons, military bases, airport",
                                                    },
                                                    {
                                                        value: "schoolUniversity",
                                                        label: "School/University",
                                                    },
                                                    {
                                                        value: "plazaMallDeliveries",
                                                        label: "Plaza/Mall deliveries or stores with only parking lot/Street access",
                                                    },
                                                    {
                                                        value: "groceryRetailLocations",
                                                        label: "Grocery/Retail Locations (ex: Costco or Walmart)",
                                                    },
                                                    {
                                                        value: "other",
                                                        label: "Other",
                                                    },

                                                ],

                                                // text field for other selection

                                            }}
                                        /> */}

                                    </div>
                                }
                            </div>

                            <FormCheckbox
                                field={{
                                    name: "services.appointmentDelivery",
                                    label: "Appointment Delivery",
                                    defaultValue: false,
                                    icon: <Info size={16} />,
                                }}
                            />
                            <FormCheckbox
                                field={{
                                    name: "services.thresholdDelivery",
                                    label: "Threshold Delivery",
                                    defaultValue: false,
                                    icon: <Info size={16} />
                                }}
                            />
                            <FormCheckbox
                                field={{
                                    name: "services.thresholdPickup",
                                    label: "Threshold Pickup",
                                    defaultValue: false,
                                    icon: <Info size={16} />
                                }}
                            />
                            <div className="sm:col-span-3">
                                <FormCheckbox
                                    field={{
                                        name: "inbound",
                                        label: "In Bond",
                                        defaultValue: false,
                                        icon: <Info size={16} />
                                    }}
                                />
                                {watch("inBondCheckbox") &&
                                    <div className="my-4">
                                        <InBond />
                                    </div>
                                }
                            </div>
                            <FormCheckbox
                                field={{
                                    name: "services.protectFromFreeze",
                                    label: "Protect from Freeze",
                                    defaultValue: false,
                                    icon: <Info size={16} />
                                }}
                            />
                            <FormCheckbox
                                field={{
                                    name: "services.tradeShowDelivery",
                                    label: "Trade Show Delivery",
                                    defaultValue: false,
                                    icon: <Info size={16} />
                                }}
                            />
                            <FormCheckbox
                                field={{
                                    name: "services.amazonOrFbaDelivery",
                                    label: "Amazon/FBA Delivery",
                                    defaultValue: false,
                                    icon: <Info size={16} />
                                }}
                            />
                            <FormCheckbox
                                field={{
                                    name: "services.refrigeratedServices",
                                    label: "Refrigerated Services",
                                    defaultValue: false,
                                    icon: <Info size={16} />
                                }}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </FormProvider>
    )
})

export default AdditionalServices;