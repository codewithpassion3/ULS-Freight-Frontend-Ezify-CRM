"use client"

import { GlobalForm } from "@/components/common/form/GlobalForm"
import { Button } from "@/components/ui/button"
import { Info, Settings } from "lucide-react"

export default function PalletShippingPreferences() {
    return (
        <div className="space-y-6 pt-6 border-t">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <Settings size={18} />
                Pallet Shipping Preferences
            </h3>

            <div className="space-y-4 border-b pb-6">
                <h4 className="text-primary font-medium text-base">Pallet Shipping Preferences</h4>
                <p className="text-sm text-foreground">Set Default "Shipping To" Location Type</p>

                <GlobalForm
                    formWrapperClassName="w-full md:w-[300px]"
                    fields={[
                        {
                            name: "palletLocationType",
                            label: "Location Type What is this?",
                            type: "select",
                            options: [
                                { label: "Select", value: "Select" },
                                { label: "Business - Tailgate Not Required", value: "Business - Tailgate Not Required" },
                                { label: "Business - Tailgate Required", value: "Business - Tailgate Required" },
                            ]
                        }
                    ]}
                />
            </div>

            <div className="space-y-4 border-b pb-6">
                <h4 className="text-sm text-foreground">Additional Services for Pallets</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Info size={14} className="text-primary" />
                    By checking off these additional services, they will be added for every new pallet shipment
                </p>

                <GlobalForm
                    formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 gap-y-2 mt-4"
                    fields={[
                        { name: "palletLimitedAccess", label: "Limited Access ℹ", type: "checkbox" },
                        { name: "palletAppointmentDelivery", label: "Appointment Delivery ℹ", type: "checkbox" },
                        { name: "palletThresholdDelivery", label: "Threshold Delivery ℹ", type: "checkbox" },
                        { name: "palletThresholdPickup", label: "Threshold Pickup ℹ", type: "checkbox" },
                        { name: "palletInBond", label: "In-Bond ℹ", type: "checkbox" },
                        { name: "palletProtectFromFreeze", label: "Protect from Freeze ℹ", type: "checkbox" },
                        { name: "palletTradeShowDelivery", label: "Trade Show Delivery ℹ", type: "checkbox" },
                        { name: "palletAmazonFbaDelivery", label: "Amazon/FBA Delivery ℹ", type: "checkbox" },
                        { name: "palletRefrigeratedServices", label: "Refrigerated Services ℹ", type: "checkbox" },
                    ]}
                />

                <div className="pt-2">
                    <Button type="button" className="bg-primary hover:bg-[#005999] text-white">
                        Save Additional Services for Pallets
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-primary font-medium text-base">Set Pallet Custom Broker Default</h4>

                <div className="py-2">
                    <GlobalForm
                        fields={[
                            {
                                name: "palletProvideBrokerDetails",
                                label: "Provide own Broker Details",
                                type: "checkbox",
                            }
                        ]}
                    />
                </div>

                <GlobalForm
                    formWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
                    fields={[
                        {
                            name: "palletBrokerName",
                            label: "Broker Name",
                            type: "text",
                        },
                        {
                            name: "palletBrokerAccount",
                            label: "Account # (Optional)",
                            type: "text",
                        },
                    ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mt-4">
                    <GlobalForm
                        formWrapperClassName="w-full"
                        fields={[
                            {
                                name: "palletBrokerEmail",
                                label: "Email Address",
                                type: "text",
                            },
                        ]}
                    />
                    <div className="flex gap-4 w-full">
                        <GlobalForm
                            formWrapperClassName="flex-1"
                            fields={[
                                {
                                    name: "palletBrokerPhone",
                                    label: "Phone Number",
                                    type: "text",
                                },
                            ]}
                        />
                        <GlobalForm
                            formWrapperClassName="w-24"
                            fields={[
                                {
                                    name: "palletBrokerExt",
                                    label: "Ext.",
                                    type: "text",
                                },
                            ]}
                        />
                    </div>
                </div>

                <GlobalForm
                    formWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                    fields={[
                        {
                            name: "palletBrokerFax",
                            label: "Fax Number",
                            type: "text",
                        },
                        {
                            name: "palletBrokerCusma",
                            label: "CUSMA/USMCA # (optional) ℹ",
                            type: "text",
                        },
                        {
                            name: "palletBrokerFda",
                            label: "FDA number (optional) ℹ",
                            type: "text",
                        },
                    ]}
                />

                <div className="pt-4">
                    <Button type="button" className="bg-primary hover:bg-[#005999] text-white">
                        Save as Pallet Default
                    </Button>
                </div>
            </div>
        </div>
    )
}
