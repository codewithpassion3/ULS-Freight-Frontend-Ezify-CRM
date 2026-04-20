import { ContactFormValues } from "../schemas/addContact.schema"
import { ContactType } from "../types/addContact.types"

function pad2(value: string) {
    return value.trim().padStart(2, "0")
}

export function formatTime12h(hour: string, minute: string, ampm: "AM" | "PM") {
    // API expects strings like "08:00 AM"
    return `${pad2(hour)}:${pad2(minute)} ${ampm}`
}

function parseTime12h(time: string): [string, string, "AM" | "PM"] {
    const [timePart, ampm] = time.split(" ") as [string, "AM" | "PM"]
    const [hour, minute] = timePart.split(":")
    return [hour, minute, ampm]
}

export const mapFormToPayload = (data: ContactFormValues): ContactType => {
    return {
        companyName: data.companyName,
        contactId: data.contactId || null,
        contactName: data.contactName,
        phoneNumber: data.phone,
        email: data.email || null,
        defaultInstructions: data.defaultInstructions || null,

        palletShippingReadyTime: formatTime12h(
            data.readyTimeHour,
            data.readyTimeMinute,
            data.readyTimeAmPm
        ),

        palletShippingCloseTime: formatTime12h(
            data.closeTimeHour,
            data.closeTimeMinute,
            data.closeTimeAmPm
        ),

        address: {
            address1: data.address.address1,
            address2: data.address.address2 || null,
            unit: data.address.unit || null,
            postalCode: data.address.postalCode,
            country: data.address.country,
            city: data.address.city,
            state: data.address.state,
        },

        locationTypeId: data.locationTypeId,
        signatureId: data.signatureId,
        isResidential: data.isResidential,
    }
}
export const mapPayloadToForm = (contact: ContactType): ContactFormValues => {
    const addr = contact.address;
    const [readyTimeHour, readyTimeMinute, readyTimeAmPm] = parseTime12h(contact.palletShippingReadyTime);
    const [closeTimeHour, closeTimeMinute, closeTimeAmPm] = parseTime12h(contact.palletShippingCloseTime);

    return {
        companyName: contact.companyName,
        contactId: contact.contactId ?? "",
        contactName: contact.contactName,
        phone: contact.phoneNumber,
        email: contact.email ?? "",
        defaultInstructions: contact.defaultInstructions ?? "",

        readyTimeHour,
        readyTimeMinute,
        readyTimeAmPm,
        closeTimeHour,
        closeTimeMinute,
        closeTimeAmPm,

        address: {
            address1: addr.address1,
            address2: addr.address2 ?? "",
            unit: addr.unit ?? "",
            postalCode: addr.postalCode ?? "",
            city: addr.city ?? "",
            state: addr.state ?? "",
            country: addr.country ?? "",
        },

        locationTypeId: contact.locationTypeId ?? null,
        signatureId: contact.signatureId ?? null,
        isResidential: contact.isResidential ?? false,
    };
};
