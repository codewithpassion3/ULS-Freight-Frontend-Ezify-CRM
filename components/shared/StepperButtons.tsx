import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { SchemaContext } from "../../app/(user)/quote/create/CreateQuote";
import { ZodObject, ZodTypeAny } from "zod"
import { useSearchParams } from "next/navigation";
// stepper control buttons
export default function StepperButtons({ quoteStatus, setQuoteStatus, onSubmit }: { quoteStatus: "DRAFT" | "SAVED", setQuoteStatus: (status: "DRAFT" | "SAVED") => void, onSubmit: () => void }) {
    const { watch } = useFormContext()
    const schema = useContext(SchemaContext)
    // const addresses = watch("addresses") || []
    // const addressFields =
    //     schema && schema instanceof ZodObject
    //         ? Object.keys((schema as ZodObject<any>).shape.addresses.element.shape)
    //         : []
    // const isNextEnabled = addresses.length >= 2 && addresses?.every((addr: any) =>
    //     addressFields.every((key) => addr[key])
    // )
    const quoteId = useSearchParams().get("id");
    const isEditing = !!quoteId
    const handleStatus = (status: "DRAFT" | "SAVED") => {
        if (isEditing) {
            if (status !== quoteStatus) {
                setQuoteStatus(status)
            }
        }
        else {
            setQuoteStatus(status)
        }
    }
    return (
        <div className="w-full flex justify-end pt-4">
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                    handleStatus("DRAFT")
                    onSubmit()
                }} type="button">{isEditing ? "Update as Draft" : "Submit as Draft"}</Button>
                <Button onClick={() => {
                    handleStatus("SAVED")
                    onSubmit()
                }} type="button">{isEditing ? "Update" : "Submit"}</Button>
            </div>
        </div>
    )
}