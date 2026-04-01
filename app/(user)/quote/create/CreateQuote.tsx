"use client"

import { createContext, useEffect, useMemo, useState } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { quoteSchema } from "@/lib/validations/quote/spot-quote-schema"
import { Step1Form } from "./step-1-form"
import { Step2Form } from "./step-2-form"
import { Eye, Truck } from "lucide-react"
import { SideBar } from "./Step1Form/SideBar"
import { quoteStandardCourierPackSchema, quoteStandardFTLSchema, quoteStandardPackageSchema, quoteStandardPalletSchema } from "@/lib/validations/quote/standard-quote-schema"
import z from "zod"
import { determineSchema } from "./utils"
import StepperButtons from "./StepperButtons"
import { createQuote, getSingleQuote, updateQuote } from "@/api/services/quotes.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

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
    console.log("singleQuote", singleQuote)
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
    })

    const { watch } = methods;
    // const methodsWithSchema = { ...methods, schema }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formDataToSubmit, setFormDataToSubmit] = useState<any>(null)

    const onSubmit = (data: unknown) => {
        console.log("Form Validated:", data)
        setFormDataToSubmit(data)
        setIsModalOpen(true)
    }


    const createQuoteMutation = useMutation({
        mutationFn: (data: unknown) => createQuote(data),
    })
    const updateQuoteMutation = useMutation({
        mutationFn: (data: unknown) => updateQuote(data),
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

    const handleFullSubmit = () => {
        onSubmit(methods.getValues())
    }

    const confirmSubmit = (status: "DRAFT" | "SAVED") => {
        setQuoteStatus(status)
        setIsModalOpen(false)

        const formattedAddresses = formDataToSubmit.addresses?.map((address: any) => {
            if (address.addressBookId) {
                return {
                    addressBookId: address.addressBookId,
                    type: address.type
                }
            }
            return address
        })

        const payload = {
            ...formDataToSubmit,
            "addresses": formattedAddresses,
            "quoteType": quoteType,
            "shipmentType": shipmentType,
            "status": status,
            "lineItem": {
                ...formDataToSubmit.lineItem,
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

        updateQuoteMutation.mutate(payloadTransformed)
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
                                {currentStep === 1 && (
                                    <Step1Form
                                        quoteType={quoteType}
                                        shipmentType={shipmentType}
                                        setShipmentType={setShipmentType}
                                        onNext={() => setCurrentStep(2)}
                                    />
                                )}
                                {currentStep === 2 && (
                                    <Step2Form
                                        shipmentType={shipmentType}
                                        onPrev={() => setCurrentStep(1)}
                                        onSubmit={handleFullSubmit}
                                    />
                                )}
                                <StepperButtons
                                    quoteStatus={quoteStatus}
                                    setQuoteStatus={setQuoteStatus}
                                    totalSteps={totalSteps}
                                    currentStep={currentStep}
                                    onNext={() => currentStep === totalSteps ? handleFullSubmit() : setCurrentStep(prev => prev + 1)}
                                    onPrev={() => setCurrentStep(prev => prev - 1)}
                                />
                            </form>
                        </SchemaContext.Provider>
                    </FormProvider>
                </div>

                {/* Sidebar */}
                <SideBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Save Quote</DialogTitle>
                        <DialogDescription>
                            How would you like to save this quote?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        <button
                            className="w-full border justify-start rounded-lg cursor-pointer text-left border-slate-200"
                            onClick={() => confirmSubmit("DRAFT")}
                        >
                            <div className="flex flex-col px-4 py-2">
                                <span className="font-semibold text-slate-900">Save as Draft</span>
                                <span className="text-sm font-normal text-slate-500">Resume and review later, without finalizing the request.</span>
                            </div>
                        </button>
                        <button
                            className="w-full border justify-start rounded-lg cursor-pointer text-left border-primary bg-primary/5 hover:bg-primary/10"
                            onClick={() => confirmSubmit("SAVED")}
                        >
                            <div className="flex flex-col items-start gap-1 px-4 py-2 ">
                                <span className="font-semibold text-primary">Save and Get Rates</span>
                                <span className="text-sm font-normal text-primary/80">Save context and fetch spot rates for this quote.</span>
                            </div>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
