"use client"

import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { Button } from "@/components/ui/button"
import { Info, Settings } from "lucide-react"
import DefaultShippingAddress from "./DefaultShippingAddress"
import PalletShippingPreferences from "./PalletShippingPreferences"

const shippingPreferencesSchema = z.object({
    unitOfMeasurement: z.enum(["METRIC", "IMPERIAL"]),
    defaultPackagingType: z.enum(["PALLET", "PACKAGE", "COURIER_PAK", "FTL"]),
    billingReferenceCodeName: z.string().optional(),
    isBillingReferenceMandatory: z.boolean(),
    useDefaultAddress: z.boolean(),
    companyName: z.string().min(1, "Company Name is required"),
    address1: z.string().min(1, "Address 1 is required"),
    address2: z.string().optional(),
    unit: z.string().optional(),
    postalCode: z.string().min(1, "Postal Code is required"),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province is required"),
    country: z.string().min(1, "Country is required"),
    validateAddress: z.boolean(),
    locationType: z.string().min(1, "Location Type is required"),
    contactName: z.string().min(1, "Contact Name is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    ext: z.string().optional(),
    emailAddress: z.string().optional(),
    sendEmailsForUpdates: z.boolean(),
    instructions: z.string().optional(),
    readyTimeHour: z.string().min(1, "Required"),
    readyTimeMinute: z.string().min(1, "Required"),
    readyTimeAmpm: z.string().min(1, "Required"),
    closeTimeHour: z.string().min(1, "Required"),
    closeTimeMinute: z.string().min(1, "Required"),
    closeTimeAmpm: z.string().min(1, "Required"),

    palletLocationType: z.string().optional(),
    palletLimitedAccess: z.boolean(),
    palletAppointmentDelivery: z.boolean(),
    palletThresholdDelivery: z.boolean(),
    palletThresholdPickup: z.boolean(),
    palletInBond: z.boolean(),
    palletProtectFromFreeze: z.boolean(),
    palletTradeShowDelivery: z.boolean(),
    palletAmazonFbaDelivery: z.boolean(),
    palletRefrigeratedServices: z.boolean(),

    palletProvideBrokerDetails: z.boolean(),
    palletBrokerName: z.string().optional(),
    palletBrokerAccount: z.string().optional(),
    palletBrokerEmail: z.string().optional(),
    palletBrokerPhone: z.string().optional(),
    palletBrokerExt: z.string().optional(),
    palletBrokerFax: z.string().optional(),
    palletBrokerCusma: z.string().optional(),
    palletBrokerFda: z.string().optional(),
})

type ShippingPreferencesFormValues = z.infer<typeof shippingPreferencesSchema>

export default function ShippingPreferences() {
    const form = useForm<ShippingPreferencesFormValues>({
        resolver: zodResolver(shippingPreferencesSchema),
        defaultValues: {
            unitOfMeasurement: "IMPERIAL",
            defaultPackagingType: "PALLET",
            billingReferenceCodeName: "",
            isBillingReferenceMandatory: true,
            useDefaultAddress: false,
            companyName: "ABS Machining Inc.",
            address1: "1495 Sedlescomb Drive",
            address2: "",
            unit: "",
            postalCode: "L4X 1M4",
            city: "Mississauga",
            province: "Ontario",
            country: "Canada",
            validateAddress: true,
            locationType: "Business - Tailgate Not Required",
            contactName: "Caroline Kastner",
            phoneNumber: "905-625-5941",
            ext: "301",
            emailAddress: "moazzam@ulsfreight.ca",
            sendEmailsForUpdates: true,
            instructions: "PO A1015295 Pick up for ULS - ABS",
            readyTimeHour: "09",
            readyTimeMinute: "00",
            readyTimeAmpm: "AM",
            closeTimeHour: "04",
            closeTimeMinute: "00",
            closeTimeAmpm: "PM",

            palletLocationType: "Select",
            palletLimitedAccess: false,
            palletAppointmentDelivery: false,
            palletThresholdDelivery: false,
            palletThresholdPickup: false,
            palletInBond: false,
            palletProtectFromFreeze: false,
            palletTradeShowDelivery: false,
            palletAmazonFbaDelivery: false,
            palletRefrigeratedServices: false,

            palletProvideBrokerDetails: false,
            palletBrokerName: "",
            palletBrokerAccount: "",
            palletBrokerEmail: "",
            palletBrokerPhone: "",
            palletBrokerExt: "",
            palletBrokerFax: "",
            palletBrokerCusma: "",
            palletBrokerFda: "",
        }
    })

    const onSubmit = (data: ShippingPreferencesFormValues) => {
        // console.log("Submitted Shipping Preferences", data)
    }

    return (
        <div className="max-w-4xl space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <span className="bg-slate-800 text-white p-1 rounded-md">
                        <Settings size={16} />
                    </span>
                    General Shipping Preferences
                </h2>
            </div>

            <p className="text-sm text-foreground">
                To make your shipping experience more efficient, please select your <span className="font-semibold">default shipping preferences</span>.
            </p>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* General Preferences */}
                    <div className="space-y-6">
                        <h3 className="text-primary font-medium text-base border-b pb-2">General Preferences</h3>

                        <GlobalForm
                            formWrapperClassName="space-y-6"
                            fields={[
                                {
                                    name: "unitOfMeasurement",
                                    label: "Unit of Measurement",
                                    type: "radio",
                                    options: [
                                        { label: "Metric (cm & kg)", value: "metric" },
                                        { label: "Imperial (in & lbs)", value: "imperial" },
                                    ]
                                },
                                {
                                    name: "defaultPackagingType",
                                    label: "Default Packaging Type",
                                    type: "radio",
                                    className: "flex-wrap",
                                    options: [
                                        { label: "Pallet", value: "pallet" },
                                        { label: "Package", value: "package" },
                                        { label: "Courier Pak", value: "courier_pak" },
                                        { label: "Envelope", value: "envelope" },
                                        { label: "FTL (Full Truck Load)", value: "ftl" },
                                        { label: "White Glove", value: "white_glove" },
                                    ]
                                }
                            ]}
                        />
                    </div>

                    {/* Custom Billing Reference Code */}
                    <div className="space-y-4">
                        <div className="border-b pb-2">
                            <h3 className="font-medium text-base flex items-center gap-1 text-foreground">
                                Create Custom Billing Reference Code <Info size={14} className="text-slate-500" />
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">Please note that there is a maximum of three reference codes</p>
                        </div>

                        <GlobalForm
                            formWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
                            fields={[
                                {
                                    name: "billingReferenceCodeName",
                                    label: "Name Of Billing Reference Code",
                                    type: "text",
                                },
                                {
                                    name: "isBillingReferenceMandatory",
                                    label: "Is this Billing Reference Code mandatory?",
                                    type: "radio",
                                    valueType: "boolean",
                                    options: [
                                        { label: "Mandatory", value: "true" },
                                        { label: "Optional", value: "false" },
                                    ]
                                }
                            ]}
                        />
                        <Button type="submit" className="bg-[#599bc6] hover:bg-[#4682a9] text-white">
                            Save New Code
                        </Button>
                    </div>

                    <DefaultShippingAddress />

                    <PalletShippingPreferences />

                </form>
            </FormProvider>
        </div>
    )
}
