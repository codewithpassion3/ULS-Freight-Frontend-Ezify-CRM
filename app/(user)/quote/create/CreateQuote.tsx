"use client"

import { createContext, useEffect, useMemo, useState } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import Step1Form from "./step-1-form"
// import { Step2Form } from "./step-2-form"
import { Eye, Truck } from "lucide-react"
import { SideBar } from "../../../../components/shared/SideBar"
// import { quoteStandardCourierPackSchema, quoteStandardFTLSchema, quoteStandardPackageSchema, quoteStandardPalletSchema } from "@/lib/validations/quote/standard-quote-schema"
import z from "zod"
import { determineSchema } from "./utils"
import StepperButtons from "../../../../components/shared/Buttons"
import { createQuote, getSingleQuote, updateQuote } from "@/api/services/quotes.api"
import { useMutation, useQuery } from "@tanstack/react-query"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { ShippingTypeSelector } from "../../../../components/shared/Shipping/ShippingTypeSelector"
import { ShippingAddressSection } from "../../../../components/shared/Shipping/ShippingAddressSection"
import { EquimentTypeSelector } from "../../../../components/shared/EquimentSelection/EquimentTypeSelector"
import ContactInformation from "../../../../components/shared/ContactInformation/ContactInformation"
import Dimensions from "../../../../components/shared/Dimensions/Dimensions"
import AdditionalServices from "../../../../components/shared/AdditionalService/AdditionalServices"
import AdditionalInsurance from "../../../../components/shared/AdditionalInsurance/AdditionalInsurance"
import SignaturePreference from "../../../../components/shared/SignaturePreference/SignaturePreference"

export type QuoteTypes = "SPOT" | "STANDARD"
export type ShipmentOptions = {
    SPOT: "SPOT_LTL" | "SPOT_FTL" | "TIME_CRITICAL",
    STANDARD: "PALLET" | "PACKAGE" | "COURIER_PAK" | "STANDARD_FTL",
};
export const SchemaContext = createContext<z.ZodType<any> | null>(null)
export default function CreateQuote({ quoteType, initialShipmentType }: {
    quoteType: keyof ShipmentOptions,
    initialShipmentType: ShipmentOptions[keyof ShipmentOptions]
}) {
    const [shipmentType, setShipmentType] = useState<ShipmentOptions[keyof ShipmentOptions]>(initialShipmentType)
    const [currentStep, setCurrentStep] = useState(1)
    const [quoteStatus, setQuoteStatus] = useState<"DRAFT" | "SAVED">("DRAFT")
    const quoteId = useSearchParams().get("id")
    const totalSteps = 2
    const isEditing = !!quoteId


    const schema = useMemo(() => {
        return determineSchema(quoteType, shipmentType)
    }, [quoteType, shipmentType])

    const { data: singleQuote, isLoading: isSingleQuoteLoading, isError: isSingleQuoteError, isSuccess: isSingleQuoteSuccess } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
        enabled: !!quoteId,
    })
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
    })

    const { watch } = methods;
    // const methodsWithSchema = { ...methods, schema }
    const [formDataToSubmit, setFormDataToSubmit] = useState<any>(null)
    const createQuoteMutation = useMutation({
        mutationFn: (data: unknown) => createQuote(data),
        onSuccess: () => {
            toast.success("Quote created successfully")
            // router.push("/quotes")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })
    const updateQuoteMutation = useMutation({
        mutationFn: (data: unknown) => updateQuote(quoteId!, data),
        onSuccess: () => {
            toast.success("Quote updated successfully")
            // router.push("/quotes")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })

    const onError = (errors: any) => {
        console.error("Form Validation Errors:", errors)

        // Find if error is in step 1 
        // const step1Keys = ["shippingFrom", "shippingTo", "shipmentDate", "equipmentType", "contactInfo", "lineItem"]
        // const hasStep1Error = Object.keys(errors).some(k => step1Keys.includes(k) && k !== "lineItem")

        // if (hasStep1Error) {
        //     alert("Validation failed: You have missed required fields on Step 1. Please go back and complete them.")
        // } else {
        //     alert("Validation failed: Please check the highlighted fields on this step.")
        // }
    }


    const onSubmit = () => {
        const data = methods.getValues()
        payloadTransformer(data)
    }

    const payloadTransformer = (data: any) => {
        const formattedAddresses = data.addresses?.map((address: any) => {
            if (address.addressBookId) {
                return {
                    addressBookId: address.addressBookId,
                    type: address.type
                }
            }
            return address
        })

        const payload = {
            ...data,
            "addresses": formattedAddresses,
            "quoteType": quoteType,
            "shipmentType": shipmentType,
            ...(!isEditing && quoteStatus !== singleQuote?.quote.status && { "status": quoteStatus }),
            "lineItem": {
                ...data.lineItem,
                "type": shipmentType,
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
        console.log("Submitting Payload:", payloadTransformed)

        if (isEditing) {
            updateQuoteMutation.mutate(payloadTransformed)
        } else {
            createQuoteMutation.mutate(payloadTransformed)
        }
        alert(`Quote submitted successfully as ${status}! Check console for details.`)
    }


    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{isEditing ? "Edit Quote" : "Create New Quote"}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <FormProvider {...methods}>
                        <SchemaContext.Provider value={schema}>
                            <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="space-y-8">
                                <div className="space-y-6">
                                    <ShippingTypeSelector shipmentType={shipmentType} setShipmentType={setShipmentType} />
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <ShippingAddressSection shipmentType={shipmentType} type="FROM" title="Shipping From" />
                                        <ShippingAddressSection shipmentType={shipmentType} type="TO" title="Shipping To" />
                                    </div>
                                    {quoteType === "SPOT" ?
                                        <>
                                            <EquimentTypeSelector
                                                shipmentType={shipmentType}
                                            />
                                            <ContactInformation />
                                        </>
                                        : ""}

                                </div>
                                <Dimensions shipmentType={shipmentType} />
                                <AdditionalServices />
                                <AdditionalInsurance />
                                <SignaturePreference />
                                <StepperButtons
                                    quoteStatus={quoteStatus}
                                    setQuoteStatus={setQuoteStatus}
                                    onSubmit={onSubmit}
                                />
                            </form>
                        </SchemaContext.Provider>
                    </FormProvider>
                </div>

                {/* Sidebar */}
                <SideBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </div>
        </div>
    )
}
