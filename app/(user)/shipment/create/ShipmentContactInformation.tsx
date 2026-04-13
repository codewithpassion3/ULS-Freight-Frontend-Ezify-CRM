import { GlobalForm } from "@/components/common/form/GlobalForm";
import ContactInformation from "@/components/shared/ContactInformation/ContactInformation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const contactInformationSchema = z.object({
    contactName: z.string().min(1, "Contact Name is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    shipDate: z.string().min(1, "Ship Date is required"),
    emailAddress: z.string().min(1, "Email Address is required"),
    spotQuoteName: z.string().optional(),
})

export default function ShipmentContactInformation() {
    const form = useForm({
        resolver: zodResolver(contactInformationSchema),
    })
    return (
        <FormProvider {...form}>
            <form action="">
                <GlobalForm
                    formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    fields={[
                        {
                            name: "contactName",
                            label: "Contact Name *",
                            type: "text",
                            placeholder: "Contact Name",

                        },
                        {
                            name: "phoneNumber",
                            label: "Phone Number*",
                            type: "phone",
                            placeholder: "Phone Number",
                        },
                        {
                            name: "shipDate",
                            label: "Ship Date*",
                            type: "date",
                            placeholder: "Ship Date",
                        },
                        {
                            name: "emailAddress",
                            label: "Email Address*",
                            type: "email",
                            placeholder: "Email Address",
                        },
                        {
                            name: "spotQuoteName",
                            label: "Spot Quote Name (optional)",
                            type: "text",
                            placeholder: "Spot Quote Name",
                        },
                    ]}
                />
            </form>
        </FormProvider>
    )
}