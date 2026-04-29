import { Mail, Download, Heart, RotateCcw, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function ShipmentDocumentsWidget() {
  return (
    <Card className="rounded-sm shadow-sm border-slate-200">
      <CardHeader className="bg-slate-50 py-3 px-4 border-b">
        <CardTitle className="text-sm font-semibold">
          Shipment Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <p className="text-muted-foreground text-xs mb-6">
          Print and attach the shipping label to each pallet.<br />
          Please also ensure to provide one copy to the driver at time of pick up.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="shipping-label" />
              <label
                htmlFor="shipping-label"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Shipping Label
              </label>
            </div>
            <a href="#" className="flex items-center text-primary font-medium text-xs hover:underline">
              View/Download
            </a>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="order-summary" />
              <label
                htmlFor="order-summary"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Order Summary
              </label>
            </div>
            <a href="#" className="flex items-center text-primary font-medium text-xs hover:underline">
              View/Download
            </a>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button variant="outline" className="flex-1 text-slate-700 h-9 rounded-sm font-semibold">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" className="flex-1 text-primary border-blue-200 hover:bg-blue-50 hover:text-blue-700 h-9 rounded-sm font-semibold">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        <div className="space-y-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <Checkbox id="watchlist" className="rounded-sm w-4 h-4 border-slate-300 pointer-events-none" />
              <label htmlFor="watchlist" className="text-sm text-foreground flex items-center cursor-pointer">
                Add shipment to Watchlist <Info className="w-3.5 h-3.5 ml-1 text-slate-400" />
              </label>
            </div>
            <span className="text-xs text-muted-foreground ml-6">0/5 Shipments added to Watchlist</span>
          </div>

          <a href="#" className="flex items-center gap-2 text-foreground hover:underline">
            <Heart className="w-4 h-4 text-slate-400" />
            Favourite This Shipment
          </a>

          <a href="#" className="flex items-center gap-2 text-primary font-semibold hover:underline">
            <RotateCcw className="w-4 h-4" />
            Repeat this Shipment
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
