import { GlobalForm } from "@/components/common/form/GlobalForm"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"
import { FormRadio } from "@/components/common/forms/FormRadio"
import { Info } from "lucide-react"
import { useFormContext } from "react-hook-form"
import InBond from "./InBond"

export default function AdditionalServices() {
    const { watch } = useFormContext()

    return (
        <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-4">
            <h2 className="text-base font-semibold text-slate-800">Additional Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3 ">
                    <FormCheckbox
                        name={"services.limitedAccess"}
                        label="Limited Access"
                        defaultValue={false}
                        icon={<Info size={16} />}
                    />
                    {watch("services.limitedAccess") &&
                        <div className="my-4">
                            <FormRadio

                                className="grid grid-cols-2 gap-4"
                                name="limitedAccess.location"
                                label="Location"
                                options={[
                                    {
                                        value: "constructionSite",
                                        label: "Construction Site",
                                    },
                                    {
                                        value: "individualStorageUnit",
                                        label: "Individual (Mini) Storage Unit",
                                    },
                                    {
                                        value: "fairAmusementPark",
                                        label: "Fair/Amusement Park",
                                    },
                                    {
                                        value: "placeOfWorship",
                                        label: "Place of Worship",
                                    },
                                    {
                                        value: "farmCountryClubEstate",
                                        label: "Farm/Country Club/Estate",
                                    },
                                    {
                                        value: "securedLocationsDelivery",
                                        label: "Secured Locations Delivery - prisons, military bases, airport",
                                    },
                                    {
                                        value: "schoolUniversity",
                                        label: "School/University",
                                    },
                                    {
                                        value: "plazaMallDeliveries",
                                        label: "Plaza/Mall deliveries or stores with only parking lot/Street access",
                                    },
                                    {
                                        value: "groceryRetailLocations",
                                        label: "Grocery/Retail Locations (ex: Costco or Walmart)",
                                    },
                                    {
                                        value: "other",
                                        label: "Other",
                                    },
                                ]}
                            />
                        </div>
                    }
                </div>

                <FormCheckbox
                    name="services.appointmentDelivery"
                    label="Appointment Delivery"
                    defaultValue={false}
                    icon={<Info size={16} />}
                />
                <FormCheckbox
                    name="services.thresholdDelivery"
                    label="Threshold Delivery"
                    defaultValue={false}
                    icon={<Info size={16} />}
                />
                <FormCheckbox
                    name="services.thresholdPickup"
                    label="Threshold Pickup"
                    defaultValue={false}
                    icon={<Info size={16} />}
                />
                <div className="sm:col-span-3">
                    <FormCheckbox
                        name="services.inBond"
                        label="In Bond"
                        defaultValue={false}
                        icon={<Info size={16} />}
                    />
                    {watch("services.inBond") &&
                        <div className="my-4">
                            <InBond />
                        </div>
                    }
                </div>
                <FormCheckbox
                    name="services.protectFromFreeze"
                    label="Protect from Freeze"
                    defaultValue={false}
                    icon={<Info size={16} />}
                />
                <FormCheckbox
                    name="services.tradeShowDelivery"
                    label="Trade Show Delivery"
                    defaultValue={false}
                    icon={<Info size={16} />}
                />
                <FormCheckbox
                    name="services.amazonFbaDelivery"
                    label="Amazon/FBA Delivery"
                    defaultValue={false}
                    icon={<Info size={16} />}
                />
                <FormCheckbox
                    name="services.refrigeratedServices"
                    label="Refrigerated Services"
                    defaultValue={false}
                    icon={<Info size={16} />}
                />
            </div>
        </div>
    )
}