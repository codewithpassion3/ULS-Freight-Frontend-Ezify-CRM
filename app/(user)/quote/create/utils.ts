import { quoteStandardCourierPackSchema, quoteStandardFTLSchema, quoteStandardPackageSchema, quoteStandardPalletSchema } from "@/lib/validations/quote/standard-quote-schema"
import { ShipmentOptions } from "../../../../components/shared/DynamicQuote/DynamicQuote"
import z from "zod"

export function determineSchema<Q extends keyof ShipmentOptions>(quoteType: Q, shipmentType?: ShipmentOptions[Q]) {
    if (quoteType === "STANDARD") {
        switch (shipmentType) {
            case "PALLET":
                return quoteStandardPalletSchema
            case "PACKAGE":
                return quoteStandardPackageSchema
            case "COURIER_PAK":
                return quoteStandardCourierPackSchema
            case "STANDARD_FTL":
                return quoteStandardFTLSchema
        }
    }
    return z.any()
}

export function formatPayload(payload: any) {
    const formattedAddresses = payload.addresses?.map((address: any) => {
        if (address.addressBookId) {
            return {
                addressBookId: address.addressBookId,
                type: address.type
            }
        }
        return address
    })
    return {
        ...payload,
        "addresses": formattedAddresses,
    }
}