import { GlobalForm } from "@/components/common/form/GlobalForm";
import FormField from "@/components/common/forms/FormField";
import { Button } from "@/components/ui/button";
import { QuoteSchemaTypes } from "@/lib/validations/quote/standard-quote-schema";
// import { quoteSchema } from "@/lib/validations/quote/spot-quote-schema";
import { Phone, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
// import { QuoteSchemaTypes } from "@/lib/validations/quote/spot-quote-schema";
export default function ContactInformation() {
    const form = useFormContext<QuoteSchemaTypes>();
    const { formState: { isValid }, reset, getValues } = form;
    const handleClearContactInformation = () => {
        reset({
            ...getValues(),
            contactInformation: {
                contactName: "",
                phoneNumber: "",
                shipDate: "",
                emailAddress: "",
                spotQuoteName: ""
            }
        })
    }
    return (
        <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-6">
            <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2">
                    <Phone />
                    <h2 className="text-lg font-semibold">
                        Contact Information
                    </h2>
                </div>
                <Button variant="outline" type="button" onClick={handleClearContactInformation}>
                    <X />
                    Clear
                </Button>
            </div>

            <p className="text-sm text-slate-700 dark:text-white font-medium">Who may Freightcom contact in regards to this quote?</p>

            <GlobalForm
                formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
                // schema={quoteSchema.shape.contactInformation}
                fields={[
                    {
                        name: "contactInformation.contactName",
                        label: "Contact Name *",
                        type: "text",
                        placeholder: "Contact Name",

                    },
                    {
                        name: "contactInformation.phoneNumber",
                        label: "Phone Number*",
                        type: "phone",
                        placeholder: "Phone Number",
                    },
                    {
                        name: "contactInformation.shipDate",
                        label: "Ship Date*",
                        type: "date",
                        placeholder: "Ship Date",
                    },
                    {
                        name: "contactInformation.emailAddress",
                        label: "Email Address*",
                        type: "email",
                        placeholder: "Email Address",
                    },
                    {
                        name: "contactInformation.spotQuoteName",
                        label: "Spot Quote Name (optional)",
                        type: "text",
                        placeholder: "Spot Quote Name",
                    },
                ]}
            />

        </div>
    )
}