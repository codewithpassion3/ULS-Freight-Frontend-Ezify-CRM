import { forwardRef, useImperativeHandle } from "react";
import { GlobalForm } from "@/components/common/form/GlobalForm";
import { FormProvider, useForm } from "react-hook-form";

const ContactInformation = forwardRef(({ quoteType }: { quoteType: "SPOT" | "STANDARD" }, ref) => {
    const form = useForm({
        defaultValues: {
            spotContact: {
                contactName: "",
                phoneNumber: "",
                shipDate: "",
                emailAddress: "",
                spotQuoteName: "",
            },
        },
    })

    useImperativeHandle(ref, () => ({
        getValues: form.getValues,
        trigger: form.trigger
    }))

    return (
        <FormProvider {...form}>
            <form>
                <GlobalForm
                    formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    fields={[
                        {
                            name: "spotContact.contactName",
                            label: "Contact Name *",
                            type: "text",
                            placeholder: "Contact Name",

                        },
                        {
                            name: "spotContact.phoneNumber",
                            label: "Phone Number*",
                            type: "phone",
                            placeholder: "Phone Number",
                        },
                        {
                            name: "spotContact.shipDate",
                            label: "Ship Date*",
                            type: "date",
                            placeholder: "Ship Date",
                        },
                        {
                            name: "spotContact.email",
                            label: "Email Address*",
                            type: "email",
                            placeholder: "Email Address",
                        },
                        {
                            name: "spotContact.spotQuoteName",
                            label: "Spot Quote Name (optional)",
                            type: "text",
                            placeholder: "Spot Quote Name",
                        },
                    ]}
                />
            </form>
        </FormProvider>
    )
})

export default ContactInformation;