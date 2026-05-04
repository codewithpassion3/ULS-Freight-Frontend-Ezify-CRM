export const QuoteType = {
    STANDARD: 'STANDARD',
    SPOT: 'SPOT',
} as const;
export type QuoteType = (typeof QuoteType)[keyof typeof QuoteType];

export const PickupType = {
    DROPOFF_AT_FEDEX_LOCATION: 'DROPOFF_AT_FEDEX_LOCATION',
    CONTACT_FEDEX_TO_SCHEDULE: 'CONTACT_FEDEX_TO_SCHEDULE',
    USE_SCHEDULED_PICKUP: 'USE_SCHEDULED_PICKUP',
} as const;
export type PickupType = (typeof PickupType)[keyof typeof PickupType];

export const ServiceType = {
    FEDEX_EXPRESS_SAVER: 'FEDEX_EXPRESS_SAVER',
    FEDEX_GROUND: 'FEDEX_GROUND',
    FEDEX_2_DAY: 'FEDEX_2_DAY',
    STANDARD_OVERNIGHT: 'STANDARD_OVERNIGHT',
} as const;
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];

export const RateRequestType = {
    LIST: 'LIST',
    ACCOUNT: 'ACCOUNT',
    PREFERRED: 'PREFERRED',
} as const;
export type RateRequestType = (typeof RateRequestType)[keyof typeof RateRequestType];

export const WeightUnit = {
    LB: 'LB',
    KG: 'KG',
} as const;
export type WeightUnit = (typeof WeightUnit)[keyof typeof WeightUnit];

export const DimensionsUnit = {
    IN: 'IN',
    CM: 'CM',
} as const;
export type DimensionsUnit = (typeof DimensionsUnit)[keyof typeof DimensionsUnit];

export const Packaging = {
    BOX: 'BOX',
    FEDEX_ENVELOPE: 'FEDEX_ENVELOPE',
    FEDEX_PAK: 'FEDEX_PAK',
    FEDEX_TUBE: 'FEDEX_TUBE',
    YOUR_PACKAGING: 'YOUR_PACKAGING',
} as const;
export type Packaging = (typeof Packaging)[keyof typeof Packaging];

export interface Location {
    postalCode: string;
    countryCode: string;
}

export interface Address {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;
}

export interface FedExConfig {
    from: Location;
    to: Location;
}

export interface TSTConfig {
    from: Address;
    to: Address;
}

export interface Package {
    weightUnit: WeightUnit;
    weight: number;
    dimensionsUnit: DimensionsUnit;
    length: number;
    width: number;
    height: number;
    handlingUnits: number;
    packaging: Packaging;
}

export interface ShipmentRatesDto {
    quoteType: QuoteType;
    fedex: FedExConfig;
    tst: TSTConfig;
    pickupType: PickupType;
    rateRequestType: RateRequestType[];
    serviceType: ServiceType;
    packages: Package[];
}

export interface CarrierResult {
    carrier: string;
    quotes: any;
    error: string | null;
}

export interface StreamComplete {
    done: true;
}

export type StreamEvent = CarrierResult | StreamComplete;