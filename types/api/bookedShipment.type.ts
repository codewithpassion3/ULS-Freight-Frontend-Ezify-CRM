export interface ApiResponse {
    data: BookedShipment[];
    meta: Meta;
}

export interface BookedShipment {
    id: number;
    quoteId: string;
    name: string | null;
    quoteType: "STANDARD" | string;
    shipmentType: "PALLET" | string;
    status: "CONVERTED_TO_SHIPMENT" | string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    additionalNotes: string | null;

    lineItems: LineItems;

    spotDetails: any | null;
    insurance: any | null;
    signature: any | null;
    standardFTLService: any | null;
    palletServices: any | null;
    spotFtlServices: any | null;
    spotLtlServices: any | null;

    company: number;
    shipment: Shipment;
    addresses: AddressItem[];
}

/* ---------------- LINE ITEMS ---------------- */

export interface LineItems {
    id: number;
    type: string;
    measurementUnit: string;
    dangerousGoods: any | null;
    stackable: boolean;
    quantity: number;
    units: Unit[];
}

export interface Unit {
    id: number;
    type: string | null;
    measurementUnit: string | null;
    name: string | null;

    weight: number;
    length: number;
    width: number;
    height: number;

    freightClass: string;
    nmfc: string | null;
    description: string;

    unitsOnPallet: number | null;
    specialHandlingRequired: boolean | null;
    palletUnitType: string;

    createdBy: number;
    company: number;
}

/* ---------------- SHIPMENT ---------------- */

export interface Shipment {
    id: number;
    shipDate: string;
    createdAt: string;
    updatedAt: string;

    tailgateRequiredInToAddress: boolean;
    tailgateRequiredInFromAddress: boolean;

    serviceType: string | null;
    totalCharge: number;
    carrier: string | null;
    currency: string | null;

    carrierQuoteId: string | null;
    trackingNumber: string | null;
    bolNumber: string | null;
    serviceName: string | null;

    totalBaseCharge: number | null;
    totalFreightDiscounts: number | null;
    totalSurcharges: number | null;
    totalNetCharge: number | null;
    totalTax: number | null;

    currentStatus: string | null;
    lastEventAt: string | null;

    shippingLabels: any | null;

    company: number;
    billingReferences: any[];
    trackingEvents: any[];
}

/* ---------------- ADDRESSES ---------------- */

export interface AddressItem {
    id: number;
    type: "FROM" | "TO" | string;

    addressBookEntry: AddressBookEntry;

    address: any | null;
    locationType: any | null;
    isResidential: boolean | null;
    additionalNotes: string | null;
}

export interface AddressBookEntry {
    id: number;
    companyName: string;
    contactId: number | null;
    contactName: string;
    phoneNumber: string;
    email: string;

    defaultInstructions: string | null;

    palletShippingReadyTime: string;
    palletShippingCloseTime: string;

    isResidential: boolean;

    createdAt: string;
    updatedAt: string;

    isTemporary: boolean;

    createdBy: number;
    updatedBy: number | null;

    signature: number;
    locationType: number;
    address: number;
    company: number;
}

/* ---------------- META ---------------- */

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;

    sort: {
        createdAt: "ASC" | "DESC" | string;
    };
}