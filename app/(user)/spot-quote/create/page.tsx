import DynamicQuote from "@/components/shared/DynamicQuote/DynamicQuote"
export default function CreateSpotQuotePage() {
    return (
        <DynamicQuote quoteType="SPOT" initialShipmentType="PALLET" />
    )
}
