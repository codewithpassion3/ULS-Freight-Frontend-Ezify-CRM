import DynamicQuote from "@/components/shared/DynamicQuote/DynamicQuote";

export default function CreateShipment() {
    return (
        <DynamicQuote
            quoteType="STANDARD"
            initialShipmentType="PALLET"
        />
    )
}