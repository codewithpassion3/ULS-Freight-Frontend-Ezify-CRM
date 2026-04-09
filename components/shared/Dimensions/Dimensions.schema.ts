import * as z from "zod"

// ─── Unit schemas ──────────────────────────────────────────────────────────────

export const palletUnitSchema = z.object({
  quantity:               z.number("Required").min(1),
  length:                 z.number("Required").min(1, "Must be > 0"),
  width:                  z.number("Required").min(1, "Must be > 0"),
  height:                 z.number("Required").min(1, "Must be > 0"),
  weight:                 z.number("Required").min(1, "Must be > 0"),
  freightClass:           z.string().optional(),
  nmfc:                   z.string().optional(),
  palletUnitType:         z.string().min(1, "Pallet type is required"),
  unitsOnPallet:          z.number().optional(),
  stackable:              z.boolean().optional(),
  description:            z.string(),
  specialHandlingRequired:z.boolean().optional(),
})

export const packageUnitSchema = z.object({
  quantity:               z.number("Required").min(1),
  length:                 z.number("Required").min(1, "Must be > 0"),
  width:                  z.number("Required").min(1, "Must be > 0"),
  height:                 z.number("Required").min(1, "Must be > 0"),
  weight:                 z.number("Required").min(1, "Must be > 0"),
  description:            z.string().optional(),
  specialHandlingRequired:z.boolean().default(false),
})

export const courierUnitSchema = z.object({
  weight:     z.number("Required").min(1, "Must be > 0"),
  description:z.string().min(1, "Description is required"),
})

export const ftlUnitSchema = z.object({
  count:      z.number().optional(),
  weight:     z.number("Required").min(1, "Must be > 0"),
  description:z.string().min(1, "Description is required"),
})

// ─── LineItem schemas (one per tab) ───────────────────────────────────────────

export const palletLineItemSchema = z.object({
  type:                   z.literal("PALLET"),
  description:            z.string(),
  measurementUnit:        z.enum(["METRIC", "IMPERIAL"]),
  dangerousGoods:         z.boolean().optional(),
  stackable:              z.boolean().optional(),
  specialHandlingRequired:z.boolean().optional(),
  quantity:               z.number().optional(),
  units:                  z.array(palletUnitSchema).min(1, "Add at least one pallet"),
})

export const packageLineItemSchema = z.object({
  type:          z.literal("PACKAGE"),
  description:   z.string(),
  measurementUnit:z.enum(["METRIC", "IMPERIAL"]),
  dangerousGoods:z.boolean().optional(),
  units:         z.array(packageUnitSchema).min(1, "Add at least one package"),
})

export const courierLineItemSchema = z.object({
  type:          z.literal("COURIER_PACK"),
  measurementUnit:z.enum(["METRIC", "IMPERIAL"]),
  units:         z.array(courierUnitSchema).min(1, "Add at least one item"),
})

export const ftlLineItemSchema = z.object({
  type:          z.literal("STANDARD_FTL"),
  measurementUnit:z.enum(["METRIC", "IMPERIAL"]),
  units:         z.array(ftlUnitSchema).min(1, "Add at least one item"),
})

// ─── Discriminated union — the single source of truth ─────────────────────────

export const lineItemSchema = z.discriminatedUnion("type", [
  palletLineItemSchema,
  packageLineItemSchema,
  courierLineItemSchema,
  ftlLineItemSchema,
])

// ─── Master dimensions schema ──────────────────────────────────────────────────

export const dimensionsSchema = z.object({
  shipmentType: z.enum(["PALLET", "PACKAGE", "COURIER_PAK", "STANDARD_FTL"]),
  lineItem:     lineItemSchema,
})

// ─── Inferred types (never write types manually again) ────────────────────────

export type PalletUnit        = z.infer<typeof palletUnitSchema>
export type PackageUnit       = z.infer<typeof packageUnitSchema>
export type CourierUnit       = z.infer<typeof courierUnitSchema>
export type FTLUnit           = z.infer<typeof ftlUnitSchema>
export type LineItem          = z.infer<typeof lineItemSchema>
export type DimensionsValues  = z.infer<typeof dimensionsSchema>