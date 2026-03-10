import { z } from "zod"

export const registerStep1Schema = z
    .object({
        firstName: z.string().min(1, "First name required"),
        lastName: z.string().min(1, "Last name required"),
        businessName: z.string().min(1, "Business name required"),
        industry: z.string().optional(),
        email: z.email("Invalid email address"),
        signUpCode: z.string().optional(),
        phone: z.string().min(1, "Phone number required"),
        ext: z.string().optional(),
        broker: z.enum(["yes", "no"]),
        shippingTypes: z
            .array(z.enum(["Pallet", "Package", "PTL/FTL"]))
            .min(1, "Select at least one shipping type"),
        palletShipments: z.enum(["1-5", "6-10", "11-20", "21-50", "> 50"]).optional(),
        packageShipments: z.enum(["< 25", "26-50", "50-100", "101-300", "> 300"]).optional(),
        // ecommercePlatforms: z.array(z.string()).optional()
    })
    .superRefine((data, ctx) => {
        if (data.shippingTypes.includes("Pallet") && !data.palletShipments) {
            ctx.addIssue({
                code: "custom",
                message: "Select pallet shipment amount",
                path: ["palletShipments"]
            })
        }

        if (data.shippingTypes.includes("Package") && !data.packageShipments) {
            ctx.addIssue({
                code: "custom",
                message: "Select package shipment amount",
                path: ["packageShipments"]
            })
        }

        // if (data.shippingTypes.includes("eCommerce") && !data.ecommercePlatforms?.length) {
        //     ctx.addIssue({
        //         code: "custom",
        //         message: "Select at least one platform",
        //         path: ["ecommercePlatforms"]
        //     })
        // }
    })

export type RegisterStep1Values = z.infer<typeof registerStep1Schema>