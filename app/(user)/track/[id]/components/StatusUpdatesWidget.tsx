import { Info, Barcode, Truck, MapPin, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatusUpdatesWidget() {
  return (
    <Card className="rounded-sm shadow-sm mb-4 border-slate-200">
      <CardHeader className="bg-slate-50 py-3 px-4 flex flex-row items-center justify-between border-b">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Info className="w-4 h-4 fill-slate-800 text-white" />
          Status Updates
        </CardTitle>
        <div className="flex items-center gap-1 text-primary text-xs font-semibold cursor-pointer hover:underline">
          Copy Link
          <Copy className="w-3 h-3" />
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="relative border-l-2 border-slate-200 ml-[84px] py-2 space-y-8">

          {/* Label Created */}
          <div className="relative flex items-center mb-8">
            <div className="absolute -left-[92px] text-xs font-semibold whitespace-nowrap">Apr 29, 2026</div>
            <div className="absolute -left-[11px] bg-white p-0.5 rounded-full z-10">
              <MapPin className="w-4 h-4 fill-green-500 text-white" />
            </div>
            <div className="ml-6 flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Barcode className="w-4 h-4" />
                Label Created
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="relative flex items-center">
            <div className="absolute -left-[92px] text-xs font-semibold whitespace-nowrap text-muted-foreground">Apr 30, 2026</div>
            <div className="absolute -left-[11px] bg-white p-0.5 rounded-full z-10">
              <MapPin className="w-4 h-4 fill-blue-600 text-white" />
            </div>
            <div className="ml-6 flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Truck className="w-4 h-4" />
                Estimated Delivery <Info className="w-3.5 h-3.5 text-blue-800 fill-blue-100" />
              </div>
              <a href="#" className="text-primary text-xs font-medium hover:underline mt-0.5 ml-6">
                View Carrier Tracking
              </a>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
