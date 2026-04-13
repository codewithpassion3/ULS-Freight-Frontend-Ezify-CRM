"use client"
import FormField from "@/components/common/form/fields/FormField"
import FormRadio from "@/components/common/form/fields/FormRadio"
import { FormPhone } from "@/components/common/forms/FormPhone"
// import { FormRadio } from "@/components/common/form/fields/FormRadio"
import { useFormContext } from "react-hook-form"


export default function InBond() {
    const { watch, setValue } = useFormContext()

    const bondType = watch("bondType")
    const contactType = watch("services.inBond.contactType")

    return (
        <div className="border border-blue-100 bg-[#f8fbfe] rounded-md p-6 space-y-6">

            {/* Title */}
            <h3 className="font-semibold text-lg">In-Bond Details</h3>

            {/* Bond Type */}
            <div className="flex items-center gap-6">
                <FormRadio
                    field={{
                        name: "services.inBond.transport.type",
                        label: "(T&E) Transportation & Export Bond",
                        options: [
                            { label: "(T&E) Transportation & Export Bond", value: "te" },
                            { label: "(IT) Immediate Transportation Bond", value: "it" },
                        ],
                    }}
                />
            </div>

            {/* Warehouse + Address */}
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    field={{
                        name: "services.inBond.warehouseCarrier",
                        label: "Warehouse or Carrier who will cancel US Bond",
                        placeholder: "",
                        inputClassName: "bg-white",
                    }}
                />

                <FormField
                    field={{
                        name: "services.inBond.address",
                        label: "Address",
                        placeholder: "123 Address",
                        inputClassName: "bg-white",
                    }}
                />
            </div>

            {/* Contact Selection */}
            <div className="space-y-2 w-1/2">
                <p className="text-sm font-medium">
                    Please provide one of the contact options below:
                </p>

                <FormRadio
                    field={{
                        name: "services.inBond.contactType",
                        options: [
                            { label: "Email", value: "email" },
                            { label: "Fax Number", value: "fax" },
                            { label: "Phone", value: "phone" },
                        ],
                        className:"mb-4"
                    }}
                />

                {/* Email Field */}
                {contactType === "email" && (
                    <FormField
                        field={{
                            name: "services.inBond.contact.email",
                            label: "Email",
                            placeholder: "Please Enter your email",
                            inputClassName: "bg-white",
                        }}
                    />
                )}
                {contactType === "fax" && (
                    <FormField
                        field={{
                            name: "services.inBond.contact.fax",
                            label: "Fax Number",
                            placeholder: "Please Enter your fax number",
                            inputClassName: "bg-white",
                        }}
                    />
                )}
                {contactType === "phone" && (
                    <FormPhone
                        name="services.inBond.contact.phone"
                        label="Phone Number"
                        placeholder="Please Enter your phone number"
                    />
                )}
            </div>


        </div>
    )
}