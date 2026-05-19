import { COUNTRIES, PROVINCES } from "@/shared-data/geo.data";
import { Signature } from "@/app/(user)/settings/(address-book)/types/addContact.types";
import { FormFieldUnion } from "@/components/common/form/fields/fields.types";
import { InfoIcon } from "lucide-react";

type GetFormFieldsParams = {
    addressLocked: boolean;
    isShipment: boolean;
    shipmentType: string;
    filteredProvinces: any[];
    locationTypeLoading: boolean;
    locationTypeIsPending: boolean;
    locationTypeData: any;
    showAdditionalNotes: boolean;
    type: "FROM" | "TO";
    signatures: Signature[];
    isLoadingSignatures: boolean;
};

export const getFormFields = ({
    addressLocked,
    isShipment,
    shipmentType,
    filteredProvinces,
    locationTypeLoading,
    locationTypeIsPending,
    locationTypeData,
    showAdditionalNotes,
    type,
    signatures,
    isLoadingSignatures,
}: GetFormFieldsParams): FormFieldUnion[] => {
    console.log("ADDRESS TYPE:", type)
    console.log("ADDRESS LOCKED:", addressLocked)
    return [
        {
            name: "companyName",
            label: "Company Name",
            type: "text",
            placeholder: "Company Name",
            disabled: addressLocked,
            show: isShipment,
            wrapperClassName: "col-span-2 sm:col-span-1",
        },
        {
            name: "contactId",
            label: "Contact ID",
            type: "text",
            placeholder: "Contact ID",
            disabled: addressLocked,
            show: isShipment,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            name: "address.address1",
            label: "Address",
            type: "text",
            placeholder: "Address",
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            name: "address.address2",
            label: "Address 2 (optional)",
            type: "text",
            // placeholder: "Address",
            disabled: addressLocked,
            show: isShipment,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            name: "address.unit",
            label: "Unit/Floor #",
            type: "text",
            // placeholder: "Address",
            disabled: addressLocked,
            show: isShipment,
            wrapperClassName: "col-span-2 sm:col-span-1",


        },
        {
            name: "address.postalCode",
            label: "Postal/ZIP Code *",
            type: "text",
            placeholder: "A1A 1A1",
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            name: "address.city",
            label: "City",
            type: "text",
            placeholder: "City Name",
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            name: "address.state",
            label: "Province/State",
            type: "select",
            options: filteredProvinces?.length ? filteredProvinces : PROVINCES,
            placeholder: "State/Province",
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            name: "address.country",
            label: "Country",
            placeholder: "Country",
            type: "select",
            options: COUNTRIES,
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            // name: !addressLocked ? "address.locationTypeId" : "locationTypeId",
            name: "address.locationTypeId",
            label: "Location Type*",
            type: "select",
            placeholder: "Location Type",
            options: locationTypeLoading || locationTypeIsPending ? [] : locationTypeData?.palletShippingLocationTypes?.map((item: any) => ({
                value: item.id,
                label: item.name
            })),
            disabled: addressLocked,
            show: shipmentType === "PALLET" || shipmentType === "PACKAGE",
            valueType: "number",
            wrapperClassName: !isShipment ? "col-span-2" : "col-span-2 sm:col-span-1",
        },
        // additional notes
        {
            name: "additionalNotes",
            label: "Additional Notes (Optional)",
            type: "text",
            placeholder: "Additional Notes",
            show: showAdditionalNotes,
            wrapperClassName: "col-span-full",
        },

        {
            name: "isResidential",
            label: "Residential Address",
            type: "checkbox",
            placeholder: "Location Type",
            icon: <InfoIcon size={16} />,
            disabled: addressLocked,
            show: shipmentType === "PACKAGE" || shipmentType === "COURIER_PAK",
            wrapperClassName: "col-span-2",
            addressType: type,
        },
        // include straps for FTL
        {
            name: "includeStraps",
            label: "Include Straps",
            type: "checkbox",
            placeholder: "Include Straps",
            icon: <InfoIcon size={16} />,
            // disabled: addressLocked,
            show: shipmentType === "STANDARD_FTL" && type === "FROM",
            wrapperClassName: "col-span-2",
        },
        // apointment delivery for ftl for type TO
        {
            name: "appointmentDelivery",
            label: "Appointment Delivery",
            type: "checkbox",
            placeholder: "Appointment Delivery",
            icon: <InfoIcon size={16} />,
            // disabled: addressLocked,
            show: shipmentType === "STANDARD_FTL" && type === "TO",
            wrapperClassName: "col-span-2",
        },
        // contact information
        {
            name: "contactName",
            label: "Contact Name",
            type: "text",
            placeholder: "Contact Name",
            disabled: addressLocked,
            show: isShipment,
            wrapperClassName: "col-span-2 sm:col-span-1",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Email",
            show: isShipment,
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",

        },
        {
            name: "phoneNumber",
            label: "Phone",
            type: "phone",
            placeholder: "Phone",
            show: isShipment,
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",
        },
        {
            name: "defaultInstructions",
            label: "Default Instructions",
            type: "text",
            placeholder: "Default Instructions",
            show: isShipment,
            disabled: addressLocked,
            wrapperClassName: "col-span-2",
        },
        // ready time
        {
            name: "palletShippingReadyTime",
            label: "Ready Time",
            type: "time",
            placeholder: "Ready Time",
            show: isShipment && shipmentType === "PALLET" || isShipment && shipmentType === "STANDARD_FTL",
            disabled: addressLocked,
            hourName: "readyTimeHour",
            minuteName: "readyTimeMinute",
            ampmName: "readyTimeAmPm",
            wrapperClassName: "col-span-2 sm:col-span-1",
        },
        {
            name: "palletShippingCloseTime",
            label: "Close Time",
            type: "time",
            placeholder: "Close Time",
            hourName: "closeTimeHour",
            minuteName: "closeTimeMinute",
            ampmName: "closeTimeAmPm",
            show: isShipment && shipmentType === "PALLET" || isShipment && shipmentType === "STANDARD_FTL",
            disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",
        },
        // save contact to address book
        {
            name: "saveToAddressBook",
            label: "Save Contact to Address Book",
            type: "checkbox",
            placeholder: "Save Contact to Address Book",
            show: isShipment,
            // disabled: addressLocked,
            icon: <InfoIcon size={16} />,
            wrapperClassName: "col-span-2",
        },
        // save as new default
        {
            name: "saveAsNewDefault",
            label: "Save as New Default",
            type: "checkbox",
            placeholder: "Save as New Default",
            show: isShipment && type === "FROM",
            // disabled: addressLocked,
            icon: <InfoIcon size={16} />,
            wrapperClassName: "col-span-2",
        },

        // ship date
        {
            name: "shipDate",
            label: "Ship Date",
            type: "date",
            placeholder: "Ship Date",
            show: isShipment && type === "FROM",
            futureDatesOnly: true,
            // isEditing: isEditing,
            // disabled: addressLocked,
            wrapperClassName: "col-span-2 sm:col-span-1",
        },
        {
            name: "signatureId",
            label: "Signature*",
            type: "radio",
            placeholder: "Signature",
            options: signatures?.map((signature: Signature) => ({
                value: signature.id.toString(),
                label: signature.name
            })),
            show: !isLoadingSignatures && type === "TO" && shipmentType === "COURIER_PAK",
            wrapperClassName: "flex flex-col gap-2 col-span-2 sm:col-span-1",
            valueType: "number",
            disabled: addressLocked,
        }


    ];
}