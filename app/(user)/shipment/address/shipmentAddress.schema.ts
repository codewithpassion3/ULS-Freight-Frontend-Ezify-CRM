import { z } from "zod"

export const shippingAddressSchema = z.object({
    companyName: z.string().nonempty("Company/Name is required"),
    contactId: z.string().optional(),
    phone: z.string().nonempty("Phone Number is required"),
    email: z.email("Invalid email").optional(),
    defaultInstructions: z.string().optional(),
    address: z.object({
        address1: z.string().nonempty("Address 1 is required"),
        address2: z.string().optional(),
        unit: z.string().optional(),
        postalCode: z.string().nonempty("Postal/ZIP Code is required"),
        city: z.string().nonempty("City is required"),
        state: z.string().nonempty("Province/State is required"),
        country: z.string().nonempty("Country is required"),
    }),
    contactName: z.string().nonempty("Contact Name is required"),

    // Pallet Shipping preferences
    readyTimeHour: z.string().min(0).max(12),
    readyTimeMinute: z.string().min(0).max(59),
    readyTimeAmPm: z.enum(["AM", "PM"]),
    closeTimeHour: z.string().min(0).max(12),
    closeTimeMinute: z.string().min(0).max(59),
    closeTimeAmPm: z.enum(["AM", "PM"]),

    // Courier Shipping preferences
    locationTypeId: z.number(),
    signatureId: z.number(),
    isResidential: z.boolean().optional(),
})

export type ShipmentAddressFormProps = {
    defaultValues?: ShippingAddressSchemaType
    onSubmit?: (data: ShippingAddressSchemaType) => void
    isLoading?: boolean
    open?: boolean
    setOpen?: (open: boolean) => void
    setIsValid?: (isValid: boolean) => void
}

export type ShippingAddressSchemaType = z.infer<typeof shippingAddressSchema>