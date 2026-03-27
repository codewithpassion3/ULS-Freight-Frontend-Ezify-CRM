import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// stepper control buttons
export default function StepperButtons({ totalSteps, currentStep, onNext, onPrev }: { totalSteps: number, currentStep: number, onNext: () => void, onPrev: () => void }) {
    return (
        <div className="w-full flex justify-between pt-4">
            {currentStep > 1 ? <Button onClick={onPrev} type="button" variant="outline"><ArrowLeft /> Previous Step</Button> : <div></div>}
            <Button onClick={onNext} type="button">{currentStep === totalSteps ? "Submit" : "Next Step"} {currentStep !== totalSteps && <ArrowRight />}</Button>
        </div>
    )
}