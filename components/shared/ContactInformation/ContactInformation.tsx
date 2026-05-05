import { forwardRef, useImperativeHandle } from "react";
import { GlobalForm } from "@/components/common/form/GlobalForm";
import { useForm } from "react-hook-form";

const ContactInformation = forwardRef((props, ref) => {
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
        <form {...form.register("spotContact")}>
            <GlobalForm

                formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
        </form>
    )
})

export default ContactInformation;