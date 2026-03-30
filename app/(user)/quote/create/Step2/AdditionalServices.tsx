import { GlobalForm } from "@/components/common/form/GlobalForm"

export default function AdditionalServices() {
    const additionServicesCheckboxes = [
        {
            name: "limitedAccess",
            label: "Limited Access",
            type: "checkbox",
        },
        {
            name: "appointmentDelivery",
            label: "Appointment Delivery",
            type: "checkbox",
        },
        {
            name: "thresholdDelivery",
            label: "Threshold Delivery",
            type: "checkbox",
        },
        {
            name: "thresholdPickup",
            label: "Threshold Pickup",
            type: "checkbox",
        },
        {
            name: "inBond",
            label: "In Bond",
            type: "checkbox",
        },
        {
            name: "protectFromFreeze",
            label: "Protect from Freeze",
            type: "checkbox",
        },
        {
            name: "tradeShowDelivery",
            label: "Trade Show Delivery",
            type: "checkbox",
        },
        {
            name: "amazonFbaDelivery",
            label: "Amazon/FBA Delivery",
            type: "checkbox",
        },
        {
            name: "refrigeratedServices",
            label: "Refrigerated Services",
            type: "checkbox",
        },
    ]
    return (
        <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-4">
            <h2 className="text-base font-semibold text-slate-800">Additional Services</h2>
            <GlobalForm
                formWrapperClassName="flex flex-wrap gap-2"
                fields={[
                    {
                        name: "limitedAccess",
                        label: "Limited Access",
                        type: "checkbox",
                    },
                    // if limited access options
                    // {
                    //     name: "limitedAccess.location.constructionSite",
                    //     label: "Construction Site",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.individualStorageUnit",
                    //     label: "Individual (Mini) Storage Unit",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.fairAmusementPark",
                    //     label: "Fair/Amusement Park",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.placeOfWorship",
                    //     label: "Place of Worship",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.farmCountryClubEstate",
                    //     label: "Farm/Country Club/Estate",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.securedLocationsDelivery",
                    //     label: "Secured Locations Delivery - prisons, military bases, airport",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.schoolUniversity",
                    //     label: "School/University",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.plazaMallDeliveries",
                    //     label: "Plaza/Mall deliveries or stores with only parking lot/Street access",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.groceryRetailLocations",
                    //     label: "Grocery/Retail Locations (ex: Costco or Walmart)",
                    //     type: "checkbox",
                    // },
                    // {
                    //     name: "limitedAccess.location.other",
                    //     label: "Other",
                    //     type: "checkbox",
                    // },

                    {
                        name: "appointmentDelivery",
                        label: "Appointment Delivery",
                        type: "checkbox",
                    },
                    {
                        name: "thresholdDelivery",
                        label: "Threshold Delivery",
                        type: "checkbox",
                    },
                    {
                        name: "thresholdPickup",
                        label: "Threshold Pickup",
                        type: "checkbox",
                    },
                    {
                        name: "inBond",
                        label: "In Bond",
                        type: "checkbox",
                    },
                    {
                        name: "protectFromFreeze",
                        label: "Protect from Freeze",
                        type: "checkbox",
                    },
                    {
                        name: "tradeShowDelivery",
                        label: "Trade Show Delivery",
                        type: "checkbox",
                    },
                    {
                        name: "amazonFbaDelivery",
                        label: "Amazon/FBA Delivery",
                        type: "checkbox",
                    },
                    {
                        name: "refrigeratedServices",
                        label: "Refrigerated Services",
                        type: "checkbox",
                    },

                ]}
            />
        </div>
    )
}