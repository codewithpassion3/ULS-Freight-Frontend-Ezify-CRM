import { FormRadio } from "@/components/common/forms/FormRadio"
import { useQuery } from "@tanstack/react-query"
import { getSingleQuote } from "@/api/services/quotes.api"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Loader } from "@/components/common/Loader"
import { useFormContext } from "react-hook-form"
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
        <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-4">
            <FormRadio
                name="signature"
                label="Signature Preference"
                valueType="number"
                defaultValue="1"
                options={[
                    { value: 1, label: "No Signature Required" },
                    { value: 2, label: "Signature Required" },
                    { value: 3, label: "Adult Signature Required" },
                ]}
            />
        </div>
    )
}