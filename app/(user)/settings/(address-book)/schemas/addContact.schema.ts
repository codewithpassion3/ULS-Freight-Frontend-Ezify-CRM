import { z } from "zod"

export const contactSchema = z.object({
    companyName: z.string().nonempty("Company/Name is required"),
    contactId: z.string().optional(),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    email: z.email("Invalid email").optional(),
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

    // Pallet Shipping preferences
    readyTimeHour: z.string().min(0, "Ready Time is required").max(12),
    readyTimeMinute: z.string().min(0, "Ready Time is required").max(59),
    readyTimeAmPm: z.enum(["AM", "PM"]),
    closeTimeHour: z.string().min(0, "Close Time is required").max(12),
    closeTimeMinute: z.string().min(0, "Close Time is required").max(59),
    closeTimeAmPm: z.enum(["AM", "PM"]),

    // Courier Shipping preferences
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