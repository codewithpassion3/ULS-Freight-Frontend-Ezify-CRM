import { CheckCircle2, RotateCcw, FileText, Image as ImageIcon, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShipmentHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-semibold mb-1">Shipment Overview</h1>
        <div className="flex items-center text-primary text-sm font-medium hover:underline cursor-pointer mb-4">
          <RotateCcw className="w-4 h-4 mr-1" />
          Click here for a quick tour
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">Transaction #:</span> 43151644
            <FileText className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-primary" />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">BOL #:</span> DR1391642
            <FileText className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-primary" />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">Tracking/PRO #:</span> A10403665
            <FileText className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-primary" />
          </div>
        </div>

        <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3 cursor-pointer hover:underline">
          <FileText className="w-4 h-4" />
          Shipping Label
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 self-stretch md:self-auto justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold text-primary">
          <CheckCircle2 className="w-6 h-6 fill-primary text-white" />
          Ready for Shipping
        </div>
        <Button variant="outline" className="text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Cancel Shipment
        </Button>
      </div>
    </div>
  );
}
