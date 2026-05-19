export type Currency = "USD" | "CAD" | "EUR";

export interface ShipmentSurchargesResponse {
    shipmentId: number;
    surcharges: Surcharge[];
}

export interface Surcharge {
    name: string;
    amount: number;
    description: string;
    currency: Currency;
}