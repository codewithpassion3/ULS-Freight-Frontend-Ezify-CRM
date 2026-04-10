import DynamicQuote from "@/components/shared/DynamicQuote/DynamicQuote";
import DynamicShipment from "../CreateShipment";

export default function CreateShipment() {
    return (
        <DynamicQuote
            quoteType="STANDARD"
            initialShipmentType="PALLET"
        />
    )
}