import { GlobalForm } from "@/components/common/form/GlobalForm";
import FormField from "@/components/common/forms/FormField";
import { Button } from "@/components/ui/button";
import { quoteSchema } from "@/lib/validations/quote/quote-schema";
import { Phone, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { QuoteSchemaTypes } from "@/lib/validations/quote/quote-schema";
export default function ContactInformation({ onNext, clearContact }: { onNext: () => void, clearContact: () => void }) {
    const form = useFormContext<QuoteSchemaTypes>();
    const { formState: { isValid } } = form;
    return (
        <div className="border border-border rounded-md p-6 bg-white space-y-6">
            <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2">
                    <Phone />
                    <h3>
                        Contact Information
                    </h3>
                </div>
                <Button variant="outline" type="button" onClick={clearContact}>
                    <X />
                    Clear
                </Button>
            </div>

            <p className="text-sm text-slate-700 font-medium">Who may Freightcom contact in regards to this quote?</p>

            <GlobalForm
                schema={quoteSchema.shape.contactInformation}
                fields={[
                    {
                        name: "contactInformation.contactName",
                        label: "Contact Name 2*",
                        type: "text",
                        placeholder: "Contact Name",
                        wrapperClassName: "md:col-span-4",
                    },
                    {
                        name: "contactInformation.phoneNumber",
                        label: "Phone Number*",
                        type: "text",
                        placeholder: "Phone Number",
                        wrapperClassName: "md:col-span-3",
                    },
                    {
                        name: "contactInformation.ext",
                        label: "Ext.",
                        type: "text",
                        placeholder: "Ext.",
                        wrapperClassName: "md:col-span-1",
                    },
                    {
                        name: "contactInformation.shipDate",
                        label: "Ship Date*",
                        type: "date",
                        placeholder: "Ship Date",
                        wrapperClassName: "md:col-span-4",
                    },
                    {
                        name: "contactInformation.emailAddress",
                        label: "Email Address*",
                        type: "email",
                        placeholder: "Email Address",
                        wrapperClassName: "md:col-span-4",
                    },
                    {
                        name: "contactInformation.spotQuoteName",
                        label: "Spot Quote Name (optional)",
                        type: "text",
                        placeholder: "Spot Quote Name",
                        wrapperClassName: "md:col-span-4",
                    },
                ]}
            />
            <div className="flex justify-end pt-4">
                <Button disabled={!isValid} onClick={onNext} type="button" className="bg-[#0070c0] hover:bg-[#005999] px-8 text-base font-semibold">Next Step</Button>
            </div>
        </div>
    )
}