import { quoteStandardCourierPackSchema, quoteStandardFTLSchema, quoteStandardPackageSchema, quoteStandardPalletSchema } from "@/lib/validations/quote/standard-quote-schema"
import { ShipmentOptions } from "./CreateQuote"
import z from "zod"

export function determineSchema<Q extends keyof ShipmentOptions>(quoteType: Q, shipmentType?: ShipmentOptions[Q]) {
    if (quoteType === "STANDARD") {
        switch (shipmentType) {
            case "Pallet":
                return quoteStandardPalletSchema
            case "Package":
                return quoteStandardPackageSchema
            case "Courier Pack":
                return quoteStandardCourierPackSchema
            case "FTL":
                return quoteStandardFTLSchema
        }
    }
    return z.any()
}