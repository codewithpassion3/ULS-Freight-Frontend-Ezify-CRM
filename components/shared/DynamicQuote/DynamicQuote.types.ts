export type ShipmentTypes =
  | "PALLET"
  | "PACKAGE"
  | "COURIER_PAK"
  | "STANDARD_FTL"
  | "SPOT_LTL"
  | "SPOT_FTL"
  | "TIME_CRITICAL";
export type QuoteTypes = "SPOT" | "STANDARD";
export type ShipmentOptions = {
  SPOT: "SPOT_LTL" | "SPOT_FTL" | "TIME_CRITICAL";
  STANDARD: "PALLET" | "PACKAGE" | "COURIER_PAK" | "STANDARD_FTL";
};
