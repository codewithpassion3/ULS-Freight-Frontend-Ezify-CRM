import { Info, Check, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export function ShipmentDetailsCard({ quote }: { quote?: any }) {
  if (!quote) return null;

  const fromAddress = quote.addresses?.find((a: any) => a.type === "FROM");
  const toAddress = quote.addresses?.find((a: any) => a.type === "TO");

  // console.log("fromAddress", fromAddress)
  // console.log("toAddress", toAddress)
  return (

    <Card className="mb-6 pt-0 rounded-sm shadow-sm">
      <CardHeader className="bg-slate-50 dark:bg-gray-900 border-b py-3 px-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Info className="w-6 h-6" />
          Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm text-foreground">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-muted-foreground block mb-0.5">Shipment Date:</span>
            <span className="font-medium">{quote.shipment?.shipDate ? format(new Date(quote.shipment.shipDate), 'MMM dd, yyyy') : 'N/A'}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Booked by:</span>
            {/* <span className="font-medium">{quote.createdBy}</span> */}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <ArrowDownLeft /> Shipping From
            </h3>
            <div className="border-t pt-3">
              <p>{fromAddress?.companyName}</p>
              <p>{fromAddress?.address?.address1}</p>
              <p>{fromAddress?.address?.city}, {fromAddress?.address?.state}, {fromAddress?.address?.postalCode}, {fromAddress?.address?.country}</p>
            </div>
            <div className="flex items-center gap-1 text-primary font-medium">
              <Check className="w-4 h-4" />
              {fromAddress?.isResidential ? "Residential" : "Business"} - Tailgate {quote.shipment?.tailgateRequiredInFromAddress ? "Required" : "Not Required"}
            </div>
            <div>
              <p>{fromAddress?.contactName}</p>
              <p>{fromAddress?.phoneNumber}</p>
              <p>{fromAddress?.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <ArrowUpRight /> Shipping To
            </h3>
            <div className="border-t pt-3">
              <p>{toAddress?.companyName}</p>
              <p>{toAddress?.address?.address1}</p>
              <p>{toAddress?.address?.city}, {toAddress?.address?.state}, {toAddress?.address?.postalCode}, {toAddress?.address?.country}</p>
            </div>
            <div className="flex items-center gap-1 text-primary font-medium">
              <Check className="w-4 h-4" />
              {toAddress?.isResidential ? "Residential" : "Business"} - Tailgate {quote.shipment?.tailgateRequiredInToAddress ? "Required" : "Not Required"}
            </div>
            <div>
              <p>{toAddress?.contactName}</p>
              <p>{toAddress?.phoneNumber}</p>
              <p>{toAddress?.email}</p>
            </div>
          </div>
        </div>

        <div>
          <span className="text-muted-foreground block mb-1">Instructions:</span>
          <p>{fromAddress?.defaultInstructions || toAddress?.defaultInstructions || "None"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
