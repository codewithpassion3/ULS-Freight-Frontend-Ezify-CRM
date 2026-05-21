"use client"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { Button } from "@/components/ui/button"
export default function DefaultShippingAddress() {
    return (
        <div className="space-y-6 pt-6 border-t">
            <h3 className="text-primary font-medium text-base">"Shipping From" Default Address</h3>

            <GlobalForm
                formWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
                fields={[
                    {
                        name: "useDefaultAddress",
                        label: "Use same Default Address for every new shipment",
                        type: "checkbox",
                        wrapperClassName: "col-span-2"
                    },
                    {
                        name: "companyName",
                        label: "Company/Name*",
                        type: "text",
                    },
                    {
                        name: "address1",
                        label: "Address 1*",
                        type: "text",
                    },
                    {
                        name: "address2",
                        label: "Address 2 (optional)",
                        type: "text",
                    },
                    {
                        name: "unit",
                        label: "Unit/Floor #",
                        type: "text",
                    },
                ]}
            />

            <p className="text-sm text-muted-foreground mt-2 mb-4">P.O Box Addresses are not accepted</p>

            <GlobalForm
                formWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
                fields={[
                    {
                        name: "postalCode",
                        label: "Postal Code*",
                        type: "text",
                    },
                    {
                        name: "city",
                        label: "City*",
                        type: "text",
                    },
                    {
                        name: "province",
                        label: "Province*",
                        type: "select",
                        options: [
                            { label: "Ontario", value: "Ontario" },
                            { label: "Quebec", value: "Quebec" },
                        ]
                    },
                    {
                        name: "country",
                        label: "Country*",
                        type: "select",
                        options: [
                            { label: "Canada", value: "Canada" },
                            { label: "United States", value: "United States" },
                        ]
                    },
                ]}
            />
            <Button variant="secondary">Validate Address</Button>

            <GlobalForm
                formWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
                fields={[
                    {
                        name: "locationType",
                        label: "Location Type* What is this?",
                        type: "select",
                        options: [
                            { label: "Business - Tailgate Not Required", value: "Business - Tailgate Not Required" },
                            { label: "Business - Tailgate Required", value: "Business - Tailgate Required" },
                        ]
                    },
                    {
                        name: "contactName",
                        label: "Contact Name*",
                        type: "text",
                    },
                    {
                        name: "phoneNumber",
                        label: "Phone Number*",
                        type: "phone",
                    },
                    {
                        name: "emailAddress",
                        label: "Email Address (optional) ℹ",
                        type: "text",
                    },
                    {
                        name: "sendEmailsForUpdates",
                        label: "Send emails for shipment status updates",
                        type: "checkbox",
                    },
                    {
                        name: "instructions",
                        label: "Instructions (optional)",
                        type: "text",
                    },
                    {
                        name: "readyTime",
                        label: "Ready Time*",
                        type: "time",
                        hourName: "readyTimeHour",
                        minuteName: "readyTimeMinute",
                        ampmName: "readyTimeAmpm",
                    },
                    {
                        name: "closeTime",
                        label: "Close Time*",
                        type: "time",
                        hourName: "closeTimeHour",
                        minuteName: "closeTimeMinute",
                        ampmName: "closeTimeAmpm",
                    }
                ]}
            />
            <div className="pt-4">
                <Button type="button" className="bg-primary hover:bg-[#005999] text-white">
                    Save Default Address
                </Button>
            </div>
        </div>
    )
}
