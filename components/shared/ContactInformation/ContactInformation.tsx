import { GlobalForm } from "@/components/common/form/GlobalForm";
export default function ContactInformation() {
    return (
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
    )
}