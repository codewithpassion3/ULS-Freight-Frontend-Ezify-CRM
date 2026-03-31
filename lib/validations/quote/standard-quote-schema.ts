import { z } from "zod"

export const quoteSchema = z.object({
    quoteType: z.enum(["Spot Quote", "Standard Quote"], {
        message: "Please select a quote type",
    }),
    addresses: z.array(z.object({
        "type": z.enum(["TO", "FROM"]),
        "address1": z.string().min(1, "Address is required"),
        "city": z.string().min(1, "City is required"),
        "state": z.string().min(1, "State is required"),
        "postalCode": z.string().min(1, "Postal Code is required"),
        "country": z.string().min(1, "Country is required"),
    }))

})
export const quoteStandardSchema = quoteSchema.extend({
    shipmentType: z.enum(["Pallet", "Package", "Courier Pack", "Envelope", "FTL", "White Glove"], {
        message: "Please select a shipment type",
    }),
})
export const quoteStandardPalletSchema = quoteStandardSchema.extend({
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
export const quoteStandardPackageSchema = quoteStandardSchema.extend({
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
export const quoteStandardCourierPackSchema = quoteStandardSchema.extend({
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
export const quoteStandardFTLSchema = quoteStandardSchema.extend({
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

export type QuoteStandardPalletSchema = z.infer<typeof quoteStandardPalletSchema>
export type QuoteStandardPackageSchema = z.infer<typeof quoteStandardPackageSchema>
export type QuoteStandardCourierPackSchema = z.infer<typeof quoteStandardCourierPackSchema>
export type QuoteStandardFTLSchema = z.infer<typeof quoteStandardFTLSchema>

