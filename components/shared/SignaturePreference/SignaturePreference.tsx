import { FormRadio } from "@/components/common/forms/FormRadio"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Loader } from "@/components/common/Loader"
import { useFormContext } from "react-hook-form"
import { ChevronUp, ClipboardPen } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
export default function SignaturePreference() {
    const { setValue } = useFormContext<any>();
    const quoteId = useSearchParams().get("id");
    const { data: cachedSingleQuote, isLoading, isPending } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => quoteId ? getSingleQuote(quoteId) : null,
        enabled: !!quoteId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    useEffect(() => {
        if (cachedSingleQuote) {
            const signature = cachedSingleQuote.quote.signature;
            if (signature) {
                setValue("signature", signature);
            }
        }
    }, [cachedSingleQuote, setValue]);
    if (quoteId) {
        if (isLoading || isPending) {
            return <Loader />
        }
    }
    return (
        <Accordion type="single" collapsible className="px-6 shadow-lg border border-border rounded-md bg-white dark:bg-card">
            <AccordionItem value="signaturePreference">
                <AccordionTrigger className="group  hover:no-underline items-center cursor-pointer [&>svg]:hidden!">
                    <h2 className="font-semibold flex items-center gap-2 text-lg text-slate-800">
                        <ClipboardPen />
                        Signature Preference
                        <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </h2>
                </AccordionTrigger>
                <AccordionContent className="h-max">
                    <FormRadio
                        className="mt-4"
                        name="signature"
                        valueType="number"
                        defaultValue="1"
                        options={[
                            { value: 1, label: "No Signature Required" },
                            { value: 2, label: "Signature Required" },
                            { value: 3, label: "Adult Signature Required" },
                        ]}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}