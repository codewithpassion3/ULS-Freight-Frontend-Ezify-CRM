import { z } from "zod"

export const quoteSchema = z.object({
  shipmentType: z.enum(["LTL-Partial Truckload", "Full Truck Load", "Time Critical"], {
    message: "Please select a shipment type",
  }),
  shippingFrom: z.object({
    multiplePickupLocations: z.boolean().default(false),
    address1: z.string().optional(),
    postalCode: z.string().min(1, "Postal/ZIP Code is required"),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province/State is required"),
    country: z.string().min(1, "Country is required"),
    locationType: z.string().min(1, "Location Type is required"),
    additionalNotes: z.string().optional(),
  }),
  shippingTo: z.object({
    multipleDeliveryLocations: z.boolean().default(false),
    address1: z.string().optional(),
    postalCode: z.string().min(1, "Postal/ZIP Code is required"),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province/State is required"),
    country: z.string().min(1, "Country is required"),
    locationType: z.string().min(1, "Location Type is required"),
    additionalNotes: z.string().optional(),
  }),
  equipment: z.object({
    type: z.enum(["Dry Van", "Refrigerated Services", "Flatbed", "Ventilated Trailer"], {
      message: "Please select an equipment type",
    }),
    refrigeratedType: z.enum(["Fresh", "Frozen"]).optional(),
    inBond: z.boolean().default(false),
    protectFromFreeze: z.boolean().default(false),
    limitedAccess: z.boolean().default(false),
    dangerousGoods: z.boolean().default(false),
    allPalletsStackable: z.boolean().default(false),
    somePalletsStackable: z.boolean().default(false),
  }),
  dimensionsAndWeight: z.object({
    quantity: z.string().default("1"),
    unitSystem: z.enum(["Metric", "Imperial"]).default("Imperial"),
    pallets: z.array(
      z.object({
        length: z.string().min(1, "Length required"),
        width: z.string().min(1, "Width required"),
        height: z.string().min(1, "Height required"),
        weight: z.string().min(1, "Weight required"),
        freightClass: z.string().optional(),
        nmfc: z.string().optional(),
        type: z.string().default("Pallet"),
        unitsOnPallet: z.string().optional(),
      })
    ).min(1, "At least one pallet is required"),
    description: z.string().optional(),
    dangerousGoods: z.boolean().default(false),
    stackable: z.boolean().default(false),
  }),
  additionalServicesForPallets: z.object({
    limitedAccess: z.boolean().default(false),
    appointmentDelivery: z.boolean().default(false),
    thresholdDelivery: z.boolean().default(false),
    thresholdPickup: z.boolean().default(false),
    inBond: z.boolean().default(false),
    protectFromFreeze: z.boolean().default(false),
    tradeShowDelivery: z.boolean().default(false),
    amazonFBADelivery: z.boolean().default(false),
    refrigeratedServices: z.boolean().default(false),
  }).optional(),
  additionalInsurance: z.object({
    totalCostValue: z.coerce.number().min(0).default(0),
    currency: z.enum(["CAD", "USD"]).default("CAD"),
  }).optional(),
  contactInformation: z.object({
    contactName: z.string().min(1, "Contact Name is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    ext: z.string().optional(),
    shipDate: z.union([z.date(), z.string().min(1, "Ship Date is required")]),
    emailAddress: z.string().email("Invalid email").min(1, "Email is required"),
    spotQuoteName: z.string().optional(),
  }),
})

export type QuoteSchemaTypes = z.infer<typeof quoteSchema>
