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

const AdditionalServices = forwardRef(({ shipmentType }: { shipmentType: ShipmentOptions[keyof ShipmentOptions] }, ref) => {
    // const additionalServicesSchema = z.object({
    //     services: z.object({
    //         limitedAccess: z.boolean(),
    //         appointmentDelivery: z.boolean(),
    //         thresholdDelivery: z.boolean(),
    //         thresholdPickup: z.boolean(),
    //         inbound: z.boolean(),
    //         protectFromFreeze: z.boolean(),
    //         tradeShowDelivery: z.boolean(),
    //         amazonOrFbaDelivery: z.boolean(),
    //         refrigeratedServices: z.boolean(),
    //         looseFreight: z.boolean(),
    //         pallets: z.boolean(),
    //         liftGateRequired: z.boolean(),
    //         residentialPickup: z.boolean(),
    //         residentialDelivery: z.boolean(),
    //         insideDelivery: z.boolean(),
    //         insidePickup: z.boolean(),
    //         insideDeliveryStairs: z.boolean(),
    //         insidePickupStairs: z.boolean()
    //     })
    // })
    const methods = useForm({
        // resolver: zodResolver(additionalServicesSchema),
        mode: "onChange",
        // defaultValues: {
        //     limitedAccess: false,
        //     appointmentDelivery: false,
        //     thresholdDelivery: false,
        //     thresholdPickup: false,
        //     inbound: false,
        //     protectFromFreeze: false,
        //     tradeShowDelivery: false,
        //     amazonOrFbaDelivery: false,
        //     refrigeratedServices: false,
        //     looseFreight: false,
        //     pallets: false,
        //     liftGateRequired: false,
        //     residentialPickup: false,
        //     residentialDelivery: false,
        //     insideDelivery: false,
        //     insidePickup: false,
        //     insideDeliveryStairs: false,
        //     insidePickupStairs: false
        // }
    })
    const { watch, setValue } = methods
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
                setValue("limitedAccess", services.limitedAccess)
                setValue("appointmentDelivery", services.appointmentDelivery)
                setValue("thresholdDelivery", services.thresholdDelivery)
                setValue("thresholdPickup", services.thresholdPickup)
                setValue("inbound", services.inbound)
                setValue("protectFromFreeze", services.protectFromFreeze)
                setValue("tradeShowDelivery", services.tradeShowDelivery)
                setValue("amazonOrFbaDelivery", services.amazonOrFbaDelivery)
                setValue("refrigeratedServices", services.refrigeratedServices)
                setValue("looseFreight", services.looseFreight)
                setValue("pallets", services.pallets)
                setValue("liftGateRequired", services.liftGateRequired)
                setValue("residentialPickup", services.residentialPickup)
                setValue("residentialDelivery", services.residentialDelivery)
                setValue("insideDelivery", services.insideDelivery)
                setValue("insidePickup", services.insidePickup)
                setValue("insideDeliveryStairs", services.insideDeliveryStairs)
                setValue("insidePickupStairs", services.insidePickupStairs)
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
                        {shipmentType !== "STANDARD_FTL" ? <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-3 ">
                                <FormCheckbox
                                    field={{
                                        name: "services.limitedAccess",
                                        label: "Limited Access",
                                        defaultValue: false,
                                        icon: <Info size={16} />,
                                    }}
                                />
                                {watch("services.limitedAccess") &&
                                    <div className="my-4">
                                        <FormRadio
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
                                                ]
                                            }}
                                        />
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
                                        name: "services.inbound",
                                        label: "In Bond",
                                        defaultValue: false,
                                        icon: <Info size={16} />
                                    }}
                                />
                                {watch("services.inbound") &&
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
                        </div> : ""}
                        {shipmentType === "STANDARD_FTL" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormRadio
                                    field={
                                        {
                                            name: "services",
                                            options: [
                                                {
                                                    value: "services.looseFreight",
                                                    label: "Loose Freight (Floor Loaded)",
                                                },
                                                {
                                                    value: "services.pallets",
                                                    label: "Pallets",
                                                },
                                            ]
                                        }}
                                />

                            </div>
                        ) : ""}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </FormProvider>
    )
})

export default AdditionalServices;