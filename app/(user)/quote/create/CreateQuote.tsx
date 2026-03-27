"use client"

import { useMemo, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
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

export type QuoteTypes = "SPOT" | "STANDARD"
export type ShipmentOptions = {
    SPOT: "LTL" | "FTL" | "Package",       // example values for spot quote
    STANDARD: "Pallet" | "Package" | "Courier Pack" | "FTL",
};
export default function CreateQuote({ quoteType, initialShipmentType }: {
    quoteType: keyof ShipmentOptions,
    initialShipmentType: ShipmentOptions[keyof ShipmentOptions]
}) {
    const [shipmentType, setShipmentType] = useState<ShipmentOptions[keyof ShipmentOptions]>(initialShipmentType)
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 2

    const schema = useMemo(() => {
        return determineSchema(quoteType, shipmentType)
    }, [quoteType, shipmentType])

    const methods = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
    })



    const onSubmit = (data: unknown) => {
        console.log("Form Submitted:", data)
        alert("Quote submitted successfully! Check console for details.")
    }

    const handleFullSubmit = () => methods.handleSubmit(onSubmit)()

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Create New Quote</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
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
                                    onPrev={() => setCurrentStep(1)}
                                    onSubmit={handleFullSubmit}
                                />
                            )}
                            <StepperButtons totalSteps={totalSteps} currentStep={currentStep} onNext={() => setCurrentStep(2)} onPrev={() => setCurrentStep(1)} />
                        </form>
                    </FormProvider>
                </div>

                {/* Sidebar */}
                <SideBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </div>
        </div>
    )
}
