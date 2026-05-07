import { z } from "zod"

export const addressSchema = z.object({
    type: z.enum(["TO", "FROM"]),
    address1: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    country: z.string().min(1, "Country is required"),
    addressBookId: z.number().optional()
})


export const addressesSchema = z.array(addressSchema).length(2)
export type AddressesSchemaTypes = z.infer<typeof addressesSchema>



export const ftlAddressSchema = z.object({
    addresses: addressesSchema,
    locationType: z.string().min(1, "Location type required"),
})
export const contactInformation = z.object({
    contactName: z.string().min(1, "Contact name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    shipDate: z.string().min(1, "Ship date is required"),
    emailAddress: z.email("Invalid email address"),
    spotQuoteName: z.string().min(1, "Spot quote name is required"),
})
export const spotLTLSchema = z.object({
    addresses: addressesSchema,
    shipmentType: z.literal("SPOT_LTL")
})
export const spotFTLSchema = z.object({
    addresses: addressesSchema,
    shipmentType: z.literal("SPOT_FTL")
})
export const spotTimeCriticalSchema = z.object({
    addresses: addressesSchema,
    shipmentType: z.literal("TIME_CRITICAL")
})
export const spotShipmentSchema = z.discriminatedUnion("shipmentType", [
    spotLTLSchema,
    spotFTLSchema,
    spotTimeCriticalSchema
])
export const standardPalletSchema = z.object({
    addresses: addressesSchema,
    shipmentType: z.literal("PALLET"),
    lineItems:
        z.object({
            type: z.string().default("Pallet"),
            description: z.string().optional(),
            units: z.array(z.object({
                quantity: z.number().min(1, "Quantity required"),
                length: z.number().min(1, "Length required"),
                width: z.number().min(1, "Width required"),
                height: z.number().min(1, "Height required"),
                weight: z.number().min(1, "Weight required"),
                freightClass: z.string(),
                unitsOnPallet: z.number(),
                nmfc: z.string(),
            })),
        }),
    services: z.object({
        "limitedAccess": z.boolean().default(false),
        "appointmentDelivery": z.boolean().default(false),
        "thresholdDelivery": z.boolean().default(false),
        "thresholdPickup": z.boolean().default(false),
    })
})
export const standardPackageSchema = z.object({
    addresses: addressesSchema,
    shipmentType: z.literal("PACKAGE"),
    lineItems: z.object({
        type: z.string().default("Package"),
        description: z.string().optional(),
        mesurementUnit: z.string(),
        dangerousGoods: z.boolean().default(false),
        units: z.array(z.object({
            quantity: z.number().min(1, "Quantity required"),
            length: z.number().min(1, "Length required"),
            width: z.number().min(1, "Width required"),
            height: z.number().min(1, "Height required"),
            weight: z.number().min(1, "Weight required"),
            freightClass: z.string(),
            nmfc: z.string(),
            unitsOnPallet: z.number(),
            stackable: z.boolean().default(false),
            description: z.string().optional(),
            specialHandlingRequired: z.boolean().default(false),
        })),
    }),
    signature: z.number(),
    services: z.object({
        "limitedAccess": z.boolean().default(false),
        "appointmentDelivery": z.boolean().default(false),
        "thresholdDelivery": z.boolean().default(false),
        "thresholdPickup": z.boolean().default(false),
    })
})
export const standardCourierPackSchema = z.object({
    addresses: addressesSchema,
    shipmentType: z.literal("COURIER_PAK"),
    knownShipper: z.boolean().default(false),
    lineItem: z.object({
        type: z.string().default("Courier Pack"),
        description: z.string().optional(),
        measurementUnit: z.string(),
        units: z.array(z.object({
            quantity: z.number().min(1, "Quantity required"),
            weight: z.number().min(1, "Weight required"),
            description: z.string().optional(),
        })),
    }),
    signature: z.number(),
    insurance: z.object({
        amount: z.number().min(0).default(0),
        currency: z.enum(["CAD", "USD"]).default("CAD"),
    }).optional(),
})
export const standardFTLSchema = z.object({
    addresses: ftlAddressSchema,
    shipmentType: z.literal("STANDARD_FTL"),
    knownShipper: z.boolean().default(false),
    includeStraps: z.boolean().default(false),
    appointmentDelivery: z.boolean().default(false),
    insurance: z.object({
        amount: z.number().min(0).default(0),
        currency: z.enum(["CAD", "USD"]).default("CAD"),
    }).optional(),
    services: z.object({
        looseFreight: z.boolean().default(false),
        pallets: z.boolean().default(false),
    })
})

export const standardShipmentSchema = z.discriminatedUnion("shipmentType", [
    standardPalletSchema,
    standardPackageSchema,
    standardCourierPackSchema,
    standardFTLSchema,
])

export const spotQuoteSchema = z.object({
    quoteType: z.literal("SPOT"),
    contact: contactInformation,
}).extend({
    shipment: spotShipmentSchema,
})

// Standard quote schema
export const standardQuoteSchema = z.object({
    quoteType: z.literal("STANDARD"),
    contact: contactInformation,
}).extend({
    shipment: standardShipmentSchema,
})

// Top-level union
export const quoteUnionSchema = z.discriminatedUnion("quoteType", [
    spotQuoteSchema,
    standardQuoteSchema,
])

export type QuoteUnionSchemaTypes = z.infer<typeof quoteUnionSchema>


