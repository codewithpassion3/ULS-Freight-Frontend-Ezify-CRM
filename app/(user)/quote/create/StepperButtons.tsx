import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { SchemaContext } from "./CreateQuote";
import { ZodObject, ZodTypeAny } from "zod"
// stepper control buttons
export default function StepperButtons({ quoteStatus, setQuoteStatus, totalSteps, currentStep, onNext, onPrev }: { quoteStatus: "DRAFT" | "SAVED", setQuoteStatus: (status: "DRAFT" | "SAVED") => void, totalSteps: number, currentStep: number, onNext: () => void, onPrev: () => void }) {
    const lastStep = currentStep === totalSteps
    const { watch } = useFormContext()
    const schema = useContext(SchemaContext)
    const addresses = watch("addresses") || []
    const addressFields =
        schema && schema instanceof ZodObject
            ? Object.keys((schema as ZodObject<any>).shape.addresses.element.shape)
            : []
    const isNextEnabled = addresses.length >= 2 && addresses?.every((addr: any) =>
        addressFields.every((key) => addr[key])
    )
    return (
        <div className="w-full flex justify-between pt-4">
            {currentStep > 1 ? <Button onClick={onPrev} type="button" variant="outline"><ArrowLeft /> Previous Step</Button> : <div></div>}
            {lastStep ? (
                <Button onClick={onNext} type="button">Submit</Button>
            ) : (
                <Button onClick={onNext} type="button">Next Step <ArrowRight /></Button>
            )}
        </div>
    )
}