import { z } from "zod"

// export const contactSchema = z.object({
//     companyName: z.string("Company/Name is required"),
//     contactId: z.string().optional(),
//     phoneNumber: z.string("Phone Number is required"),
//     email: z.email("Invalid email"),
//     defaultInstructions: z.string().optional(),
//     address: z.object({
//         address1: z.string().min(1, "Address 1 is required"),
//         address2: z.string().optional(),
//         unit: z.string().optional(),
//         postalCode: z.string().min(1, "Postal/ZIP Code is required"),
//         city: z.string().min(1, "City is required"),
//         state: z.string().min(1, "Province/State is required"),
//         country: z.string().min(1, "Country is required"),
//     }),
//     contactName: z.string().min(1, "Contact Name is required"),

//     // Pallet Shipping preferences
//     // readyTimeHour: z.number().min(0, "Ready Time is required").max(12),
//     // readyTimeMinute: z.number().min(0, "Ready Time is required").max(59),
//     // readyTimeAmPm: z.enum(["AM", "PM"]),
//     // closeTimeHour: z.number().min(0, "Close Time is required").max(12),
//     // closeTimeMinute: z.number().min(0, "Close Time is required").max(59),
//     // closeTimeAmPm: z.enum(["AM", "PM"]),

//     readyTimeHour: z.string().min(0, "Ready Time is required").max(12),
//     readyTimeMinute: z.string().min(0, "Ready Time is required").max(59),
//     readyTimeAmPm: z.enum(["AM", "PM"]),
//     closeTimeHour: z.string().min(0, "Close Time is required").max(12),
//     closeTimeMinute: z.string().min(0, "Close Time is required").max(59),
//     closeTimeAmPm: z.enum(["AM", "PM"]),

//     // Courier Shipping preferences
//     locationTypeId: z.number("Location Type is required"),
//     signatureId: z.number("Signature ID is required"),
//     isResidential: z.boolean().optional(),
// })




export const contactSchema = z.object({
    companyName: z.string().min(1, "Company/Name is required"),
    contactId: z.string().optional(),

    phoneNumber: z.string().min(1, "Phone Number is required"),
    email: z.string().email("Invalid email"),

    defaultInstructions: z.string().optional(),

    address: z.object({
        address1: z.string().min(1, "Address 1 is required"),
        address2: z.string().optional(),
        unit: z.string().optional(),
        postalCode: z.string().min(1, "Postal/ZIP Code is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "Province/State is required"),
        country: z.string().min(1, "Country is required"),
    }),

    contactName: z.string().min(1, "Contact Name is required"),

    readyTimeHour: z.string().refine(v => {
        const n = Number(v)
        return n >= 1 && n <= 12
    }, "Invalid hour"),

    readyTimeMinute: z.string().refine(v => {
        const n = Number(v)
        return n >= 0 && n <= 59
    }, "Invalid minutes"),

    readyTimeAmPm: z.enum(["AM", "PM"]),

    closeTimeHour: z.string().refine(v => {
        const n = Number(v)
        return n >= 1 && n <= 12
    }, "Invalid hour"),

    closeTimeMinute: z.string().refine(v => {
        const n = Number(v)
        return n >= 0 && n <= 59
    }, "Invalid minutes"),

    closeTimeAmPm: z.enum(["AM", "PM"]),

    locationTypeId: z.number(),
    signatureId: z.number(),

    isResidential: z.boolean().optional(),
})
export const addressSchema = contactSchema.extend({
    address: contactSchema.shape.address.extend({
        type: z.enum(["TO", "FROM"]),
    }),
});

export type ContactFormProps = {
    defaultValues?: ContactFormValues
    onSubmit?: (data: ContactFormValues) => void
    isLoading?: boolean
    open?: boolean
    setOpen?: (open: boolean) => void
    setIsValid?: (isValid: boolean) => void
}
export type ContactFormValues = z.infer<typeof contactSchema>
export type AddressFormValues = z.infer<typeof addressSchema>