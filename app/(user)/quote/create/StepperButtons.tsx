import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";

// stepper control buttons
export default function StepperButtons({ quoteStatus, setQuoteStatus, totalSteps, currentStep, onNext, onPrev }: { quoteStatus: "DRAFT" | "SAVED", setQuoteStatus: (status: "DRAFT" | "SAVED") => void, totalSteps: number, currentStep: number, onNext: () => void, onPrev: () => void }) {
    const lastStep = currentStep === totalSteps
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