"use client"

import { createContext, useEffect, useMemo, useState, useRef } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SideBar } from "../SideBar"
import z from "zod"
import { createQuote, getSingleQuote, updateQuote } from "@/api/services/quotes.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { usePathname, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { ShippingTypeSelector } from "../Shipping/ShippingTypeSelector"
import { ShippingAddressSection } from "../Shipping/ShippingAddressSection"
import { EquimentTypeSelector } from "../EquimentSelection/EquimentTypeSelector"
import ContactInformation from "../ContactInformation/ContactInformation"
import Dimensions from "../Dimensions/Dimensions"
import AdditionalServices from "../AdditionalService/AdditionalServices"
import AdditionalInsurance from "../AdditionalInsurance/AdditionalInsurance"
import SignaturePreference from "../SignaturePreference/SignaturePreference"
import { Button } from "@/components/ui/button"
import { quoteUnionSchema, spotShipmentSchema, standardShipmentSchema } from "@/lib/validations/quote/standard-quote-schema"
import { bookShipment, createShipment, updateShipment } from "@/api/services/shipment.api"
import { useRouter } from "next/navigation"
import { Loader, LoaderCircle } from "lucide-react"
import { formatTime12h } from "@/app/(user)/settings/(address-book)/mappers/contact.mapper"
import ShippingRates from "../ShippingRates/ShippingRates"
export type ShipmentTypes = "PALLET" | "PACKAGE" | "COURIER_PAK" | "STANDARD_FTL" | "SPOT_LTL" | "SPOT_FTL" | "TIME_CRITICAL"
export type QuoteTypes = "SPOT" | "STANDARD"
export type ShipmentOptions = {
    SPOT: "SPOT_LTL" | "SPOT_FTL" | "TIME_CRITICAL",
    STANDARD: "PALLET" | "PACKAGE" | "COURIER_PAK" | "STANDARD_FTL",
};
export const SchemaContext = createContext<z.ZodType<any> | null>(null)
export default function DynamicQuote({ quoteType, initialShipmentType }: {
    quoteType: keyof ShipmentOptions,
    initialShipmentType: ShipmentOptions[keyof ShipmentOptions]
}) {
    const pathname = usePathname()
    const router = useRouter()
    const isShipment = pathname.includes("shipment")
    const [shipmentType, setShipmentType] = useState<ShipmentOptions[keyof ShipmentOptions]>(initialShipmentType)
    const [quoteStatus, setQuoteStatus] = useState<"DRAFT" | "SAVED">("DRAFT")
    const quoteId = useSearchParams().get("id")
    const [shipmentId, setShipmentId] = useState<string | null>(null)
    const totalSteps = 2
    const isEditing = !!quoteId
    const isSpotQuote = quoteType === "SPOT"
    const isStandardQuote = quoteType === "STANDARD"
    const fromAddressRef = useRef<any>(null)
    const toAddressRef = useRef<any>(null)
    const dimensionsRef = useRef<any>(null)
    const servicesRef = useRef<any>(null)
    const insuranceRef = useRef<any>(null)
    const signatureRef = useRef<any>(null)

    const handleSwapAddress = () => {
        if (fromAddressRef.current && toAddressRef.current) {
            const fromVals = fromAddressRef.current.getValues()
            const toVals = toAddressRef.current.getValues()
            fromAddressRef.current.setValues({ ...toVals, type: "FROM" })
            toAddressRef.current.setValues({ ...fromVals, type: "TO" })
        }
    }
    const [currentStep, setCurrentStep] = useState(1)
    const handleNextStep1 = async () => {
        const fromValid = await fromAddressRef.current?.trigger()
        const toValid = await toAddressRef.current?.trigger()

        if (fromValid && toValid) {
            dimensionsRef.current?.open()
            setCurrentStep(2)
        }
    }

    // scroll to section in which there is errors, check by ref
    const scrollToErrorSection = () => {
        const errorSections = document.querySelectorAll(".error-section")
        if (errorSections.length > 0) {
            errorSections[0].scrollIntoView({ behavior: "smooth" })
        }
    }


    const { data: singleQuote, isLoading: isSingleQuoteLoading, isError: isSingleQuoteError, isSuccess: isSingleQuoteSuccess } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
        enabled: !!quoteId,
    })

    useEffect(() => {
        console.log("singleQuote", singleQuote)
        if (singleQuote?.quote?.shipment?.id) {
            setShipmentId(singleQuote.quote.shipment.id)
        }
    }, [singleQuote])

    const createQuoteMutation = useMutation({
        mutationFn: (data: unknown) => createQuote(data),
        onSuccess: () => {
            toast.success("Quote created successfully")
            router.push("/quotes")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })
    const updateQuoteMutation = useMutation({
        mutationFn: (data: unknown) => updateQuote(quoteId!, data),
        onSuccess: () => {
            toast.success("Quote updated successfully")
            router.push("/quotes")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })
    //  create shipment mutation
    const createShipmentMutation = useMutation({
        mutationFn: (data: unknown) => createShipment(data),
        onSuccess: () => {
            toast.success("Shipment created successfully")
            router.push("/quotes")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })
    const updateShipmentMutation = useMutation({
        mutationFn: (data: unknown) => updateShipment(shipmentId!, data),
        onSuccess: () => {
            toast.success("Shipment updated successfully")
            router.push("/shipments")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })
    const bookShipmentMutation = useMutation({
        mutationFn: (data: unknown) => bookShipment(data),
        onSuccess: () => {
            toast.success("Shipment booked successfully")
            router.push("/shipments")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })


    const fromAddress = fromAddressRef.current?.getValues() || {}
    const toAddress = toAddressRef.current?.getValues() || {}
    const dimensions = dimensionsRef.current?.getValues() || {}

    const services = servicesRef.current?.getValues() || {}
    const insurance = insuranceRef.current?.getValues() || {}
    const signature = signatureRef.current?.getValues() || {}
    const getMergedPayload = () => {


        let completePayload = {
            addresses: [fromAddress, toAddress],
            ...dimensions,
        }

        const addresses = [];
        if (Object.keys(fromAddress).length > 0) addresses.push(fromAddress)
        if (Object.keys(toAddress).length > 0) addresses.push(toAddress)
        console.log("insurance", insurance)
        if (insurance?.insurance?.amount) {
            completePayload = { ...completePayload, ...insurance }
        }
        if (Object.keys(services).length > 0) {
            completePayload = { ...completePayload, ...services }
        }
        if (Object.keys(signature).length > 0) {
            completePayload = { ...completePayload, ...signature }
        }

        return completePayload
    }


    const onSubmit = async () => {
        const fromValid = await fromAddressRef.current?.trigger()
        const toValid = await toAddressRef.current?.trigger()
        const dimValid = await dimensionsRef.current?.trigger()


        // We validate core sections First. Then conditionally attached ones depending on if they are rendered

        let valid = fromValid && toValid && dimValid;
        console.log("valid", valid)
        // print every validation
        if (!valid) {
            toast.error("Please fill in all required fields correctly.")
            return
        }

        if (servicesRef.current) valid = valid && await servicesRef.current.trigger()
        if (insuranceRef.current) valid = valid && await insuranceRef.current.trigger()
        if (signatureRef.current) valid = valid && await signatureRef.current.trigger()



        const mergedData = getMergedPayload()
        payloadTransformer(mergedData)


    }
    // DON'T REMOVE TILL QUOTE AND SHIPMENTS ARE STABLE
    const payloadTransformer = (data: any) => {
        const formattedAddresses = data.addresses?.map((address: any) => {

            if (address.addressBookId) {
                return {
                    addressBookId: address.addressBookId,
                    type: address.type,
                }
            }
            const palletShippingReadyTime = formatTime12h(
                address.readyTimeHour,
                address.readyTimeMinute,
                address.readyTimeAmPm
            )
            const palletShippingCloseTime = formatTime12h(
                address.closeTimeHour,
                address.closeTimeMinute,
                address.closeTimeAmPm
            )

            return {

                ...address,
                palletShippingReadyTime,
                palletShippingCloseTime,
                type: address.type,
            }
        })

        const payload = {
            ...data,
            "addresses": formattedAddresses,
            "quoteType": quoteType,
            "shipmentType": shipmentType,
            ...(!isEditing && quoteStatus !== singleQuote?.quote.status && { "status": quoteStatus }),
            ...(shipmentType === "STANDARD_FTL") && {
                // include straps if true
                ...(data.includeStraps && { "includeStraps": data.includeStraps }),
                // appointment delivery if true
                ...(data.appointmentDelivery && { "appointmentDelivery": data.appointmentDelivery }),
            },
        }
        const transformedAddresses = payload.addresses.map((addr: any) => {
            if (addr.addressBookId) {
                // Only send addressBookId if selected from address book
                return { type: addr.type, addressBookId: addr.addressBookId };
            }
            // Otherwise, send the manual address
            return { ...addr };
        });


        const payloadTransformed = {
            ...payload,
            addresses: transformedAddresses,
        };

        const ftlSelectedService = payloadTransformed?.lineItem?.units[0]?.name
        let ftlLineItemToServiceMapping = {
            services: {
                [ftlSelectedService]: {
                    "totalWeight": payloadTransformed?.lineItem?.units[0]?.weight,
                    "measurementUnit": payloadTransformed?.lineItem?.measurementUnit,
                    "totalCount": payloadTransformed?.lineItem?.units[0]?.count
                }

            },
            ...payloadTransformed,
        }
        const { lineItem, ...ftlPayload } = ftlLineItemToServiceMapping
        const finalQuotePayload = shipmentType === "STANDARD_FTL" ? ftlPayload : payloadTransformed
        console.log("data.addresses[0].shipDate", data.addresses[0].shipDate)
        const shipmentPayload = {

            shipDate: data?.addresses[0]?.shipDate,
            mode: "SHIPMENT",
            shipmentType: shipmentType,
            quote: {
                ...finalQuotePayload
            }

        }


        const finalShipmentPayload = shipmentType === "STANDARD_FTL" ? ftlPayload : shipmentPayload

        if (isEditing) {
            if (isShipment) {
                updateShipmentMutation.mutate(finalShipmentPayload)
            } else {
                updateQuoteMutation.mutate(finalQuotePayload)
            }
        } else {
            if (isShipment) {
                createShipmentMutation.mutate(finalShipmentPayload)
            } else {
                createQuoteMutation.mutate(finalQuotePayload)
            }
        }
    }

    const [openGetRates, setOpenGetRates] = useState("")
    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            {!isShipment ? <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold capitalize">{isEditing ? `Edit ${quoteType.toLowerCase()} Quote` : `Create New ${quoteType.toLowerCase()} Quote`}</h1>
            </div> : ""}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className={`${isShipment ? "lg:col-span-3" : "lg:col-span-3"}`}>
                    <div className="space-y-6">
                        <ShippingTypeSelector quoteType={quoteType} shipmentType={shipmentType} setShipmentType={setShipmentType} />
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white dark:bg-card shadow-lg">
                                <ShippingAddressSection ref={fromAddressRef} onSwap={handleSwapAddress} quoteType={quoteType} shipmentType={shipmentType} type="FROM" title="Shipping From" />
                            </div>
                            <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white dark:bg-card shadow-lg">
                                <ShippingAddressSection ref={toAddressRef} onSwap={handleSwapAddress} quoteType={quoteType} shipmentType={shipmentType} type="TO" title="Shipping To" />
                            </div>

                        </div>

                        <div className="space-y-6 mt-6">
                            <Dimensions ref={dimensionsRef} shipmentType={shipmentType} />
                        </div>
                        {shipmentType !== "STANDARD_FTL" ? <div className="mt-6">
                            <AdditionalServices ref={servicesRef} shipmentType={shipmentType} />
                        </div> : ""}

                    </div>
                    {isStandardQuote && <div className="mt-6"><AdditionalInsurance ref={insuranceRef} /></div>}
                    {(shipmentType === "PACKAGE" || shipmentType === "COURIER_PAK" || isShipment) && <div className="mt-6"><SignaturePreference ref={signatureRef} /></div>}
                    <div className="mt-6">
                        <ShippingRates openGetRates={openGetRates} setOpenGetRates={setOpenGetRates} dimensions={dimensions} fromAddress={fromAddress} toAddress={toAddress} />
                    </div>
                    <div className="w-full flex justify-end pt-8 sticky bottom-0 bg-white/10 backdrop-blur-md p-5 rounded-lg mt-2">
                        <div className="flex gap-4">
                            {/* <Button variant="outline" onClick={() => {
                                handleStatus("DRAFT")
                                onSubmit()
                            }} type="button">{isEditing ? "Update as Draft" : "Save as Draft"}</Button> */}



                            {isShipment ?
                                <Button
                                    disabled={createShipmentMutation.isPending || updateShipmentMutation.isPending}
                                    variant="outline"
                                    onClick={() => {

                                        onSubmit()
                                    }} type="button">
                                    {createShipmentMutation.isPending || updateShipmentMutation.isPending ? <LoaderCircle className="animate-spin mr-2" size={16} /> : ""}
                                    {isEditing ? "Update Shipment" : "Save Shipment"}
                                </Button>
                                :
                                <Button
                                    disabled={createQuoteMutation.isPending || updateQuoteMutation.isPending}
                                    variant="outline"
                                    onClick={() => {
                                        onSubmit()
                                    }} type="button">
                                    {createQuoteMutation.isPending || updateQuoteMutation.isPending ? <LoaderCircle className="animate-spin mr-2" size={16} /> : ""}
                                    {isEditing ? "Update Quote" : "Save Quote"}
                                </Button>
                            }
                            <Button>
                                Book Shipment
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <SideBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </div>
        </div>
    )
}
