import { Info, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ShipmentDetailsCard() {
  return (
    <Card className="mb-6 rounded-sm shadow-sm">
      <CardHeader className="bg-slate-50 border-b py-3 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Info className="w-4 h-4" />
          Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm text-foreground">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-muted-foreground block mb-0.5">Shipment Date:</span>
            <span className="font-medium">Apr 29, 2026</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-0.5">Booked by:</span>
            <span className="font-medium">William Nash</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="text-primary text-lg">➥</span> Shipping From
            </h3>
            <div className="border-t pt-3">
              <p>Armatherm Canada Thermal Bridging Solutions</p>
              <p>7270 Torbram Rd units 22,</p>
              <p>Mississauga, ON, L4T 3Y8, CA</p>
            </div>
            <div className="flex items-center gap-1 text-primary font-medium">
              <Check className="w-4 h-4" />
              Business - Tailgate Not Required
            </div>
            <div>
              <p>Tyson Scott</p>
              <p>905-612-0051</p>
              <p>william@ulsfreight.ca</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="text-primary text-lg">➥</span> Shipping To
            </h3>
            <div className="border-t pt-3">
              <p>Tardif Metal</p>
              <p>15971, boulevard de la Colline</p>
              <p>Quebec, QC, G3G 3A7, CA</p>
            </div>
            <div className="flex items-center gap-1 text-primary font-medium">
              <Check className="w-4 h-4" />
              Business - Tailgate Not Required
            </div>
            <div>
              <p>Mario Marini</p>
              <p>418-849-6919</p>
              <p>william@ulsfreight.ca</p>
            </div>
          </div>
        </div>

        <div>
          <span className="text-muted-foreground block mb-1">Instructions:</span>
          <p>ref #800463 with this shipment and list in the description 4 boxes of structural insulation.</p>
        </div>
      </CardContent>
    </Card>
  );
}
