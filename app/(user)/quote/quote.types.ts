// export type ShipmentType = "LTL-Partial Truckload" | "Full Truck Load" | "Time Critical"

import z, { ZodType } from "zod"

export type QuoteShipmentType = "Pallet" | "Package" | "Courier Pack" | "Envelope" | "FTL" | "White Glove"

export type InferSchema<T extends ZodType<any>> = z.infer<T>