import { GlobalForm } from "@/components/common/form/GlobalForm"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"
import { FormRadio } from "@/components/common/forms/FormRadio"
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

const AdditionalServices = forwardRef(({ shipmentType }: { shipmentType: ShipmentOptions[keyof ShipmentOptions] }, ref) => {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            services: {
                limitedAccess: false,
                appointmentDelivery: false,
                thresholdDelivery: false,
                thresholdPickup: false,
                inBond: false,
                protectFromFreeze: false,
                tradeShowDelivery: false,
                amazonFbaDelivery: false,
                refrigeratedServices: false,
                looseFreight: false,
                pallets: false,
                liftGateRequired: false,
                residentialPickup: false,
                residentialDelivery: false,
                insideDelivery: false,
                insidePickup: false,
                insideDeliveryStairs: false,
                insidePickupStairs: false
            },
            limitedAccess: {
                location: undefined
            }
        }
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
                setValue("services", {
                    limitedAccess: services.limitedAccess,
                    appointmentDelivery: services.appointmentDelivery,
                    thresholdDelivery: services.thresholdDelivery,
                    thresholdPickup: services.thresholdPickup,
                    inBond: services.inBond,
                    protectFromFreeze: services.protectFromFreeze,
                    tradeShowDelivery: services.tradeShowDelivery,
                    amazonFbaDelivery: services.amazonFbaDelivery,
                    refrigeratedServices: services.refrigeratedServices,
                    looseFreight: services.looseFreight,
                    pallets: services.pallets,
                    liftGateRequired: services.liftGateRequired,
                    residentialPickup: services.residentialPickup,
                    residentialDelivery: services.residentialDelivery,
                    insideDelivery: services.insideDelivery,
                    insidePickup: services.insidePickup,
                    insideDeliveryStairs: services.insideDeliveryStairs,
                    insidePickupStairs: services.insidePickupStairs,
                });
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
                        <h2 className="font-semibold flex items-center gap-2 text-lg text-black dark:text-white ">
                            <ListTodo />
                            Additional Services
                            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </h2>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 space-y-6 h-full">
                        {shipmentType !== "STANDARD_FTL" ? <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-3 ">
                                <FormCheckbox
                                    name={"services.limitedAccess"}
                                    label="Limited Access"
                                    defaultValue={false}
                                    icon={<Info size={16} />}
                                />
                                {watch("services.limitedAccess") &&
                                    <div className="my-4">
                                        <FormRadio

                                            className="grid grid-cols-2 gap-4"
                                            name="limitedAccess.location"
                                            label="Location"
                                            options={[
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
                                            ]}
                                        />
                                    </div>
                                }
                            </div>

                            <FormCheckbox
                                name="services.appointmentDelivery"
                                label="Appointment Delivery"
                                defaultValue={false}
                                icon={<Info size={16} />}
                            />
                            <FormCheckbox
                                name="services.thresholdDelivery"
                                label="Threshold Delivery"
                                defaultValue={false}
                                icon={<Info size={16} />}
                            />
                            <FormCheckbox
                                name="services.thresholdPickup"
                                label="Threshold Pickup"
                                defaultValue={false}
                                icon={<Info size={16} />}
                            />
                            <div className="sm:col-span-3">
                                <FormCheckbox
                                    name="services.inBond"
                                    label="In Bond"
                                    defaultValue={false}
                                    icon={<Info size={16} />}
                                />
                                {watch("services.inBond") &&
                                    <div className="my-4">
                                        <InBond />
                                    </div>
                                }
                            </div>
                            <FormCheckbox
                                name="services.protectFromFreeze"
                                label="Protect from Freeze"
                                defaultValue={false}
                                icon={<Info size={16} />}
                            />
                            <FormCheckbox
                                name="services.tradeShowDelivery"
                                label="Trade Show Delivery"
                                defaultValue={false}
                                icon={<Info size={16} />}
                            />
                            <FormCheckbox
                                name="services.amazonFbaDelivery"
                                label="Amazon/FBA Delivery"
                                defaultValue={false}
                                icon={<Info size={16} />}
                            />
                            <FormCheckbox
                                name="services.refrigeratedServices"
                                label="Refrigerated Services"
                                defaultValue={false}
                                icon={<Info size={16} />}
                            />
                        </div> : ""}
                        {shipmentType === "STANDARD_FTL" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormRadio
                                    name="services"
                                    options={[
                                        {
                                            value: "services.looseFreight",
                                            label: "Loose Freight (Floor Loaded)",
                                        },
                                        {
                                            value: "services.pallets",
                                            label: "Pallets",
                                        },
                                    ]}
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