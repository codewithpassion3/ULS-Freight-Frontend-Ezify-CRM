export type ContactType = {
    id?: string,
    companyName: string
    contactId?: string | null
    contactName: string
    phoneNumber: string
    email?: string | null
    defaultInstructions?: string | null
    palletShippingReadyTime: string
    palletShippingCloseTime: string
    address: {
        address1: string
        address2?: string | null
        unit?: string | null
        postalCode: string
        country: string
        city: string
        state: string
    }
    locationTypeId: number
    signatureId: number
    isResidential: boolean | undefined
}
export type LocationType = {
    id: number,
    locationType: string;
    name: string;
}
export type Signature = {
    id: number;
    name: string;
    type: string;
}