import { Info, Barcode, Truck, MapPin, Copy, PackagePlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export function StatusUpdatesWidget({ quote }: { quote?: any }) {
  if (!quote) return null;
  const iconMapper = (status: string) => {
    switch (status) {
      // show a connecting line after icon only for not last item
      // update if there are more events to come
      // const hasMoreEvents = quote.shipment?.trackingEvents?.some((event: any) => event.id !== status.id);
      // if (hasMoreEvents) {
      //   return <PackagePlus className="w-4 h-4 after:content-[''] after:absolute after:w-0.5 after:h-full after:bg-gray-200 after:top-full after:left-1/2 after:-translate-x-1/2" />;
      // }
      case "SHIPMENT_CREATED":
        return <PackagePlus className="w-8 h-8 bg-green-100 text-green-500 rounded-full p-1.5" />;
      case "PICKUP":
        return <Barcode className="w-8 h-8 bg-gray-100 text-gray-500 rounded-full p-1.5" />;
      case "OUT_FOR_DELIVERY":
        return <MapPin className="w-8 h-8 bg-yellow-100 text-yellow-500 rounded-full p-1.5" />;
      case "DELIVERED":
        return <MapPin className="w-8 h-8  bg-green-100 text-green-500 rounded-full p-1.5" />;
      case "IN_TRANSIT":
        return <MapPin className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full p-1.5" />;
      case "ARRIVED_AT_FACILITY":
        return <MapPin className="w-8 h-8 bg-yellow-100 text-yellow-500 rounded-full p-1.5" />
      default:
        return <MapPin className="w-8 h-8 bg-gray-100 text-gray-500 rounded-full p-1.5" />;
    }
  }
  return (
    <Card className="rounded-sm shadow-sm pt-0 mb-4 border-slate-200">
      <CardHeader className="bg-slate-50 p-4 flex flex-row items-center justify-between border-b">
        <CardTitle className="text-xl  flex items-center gap-2">
          <Info className="w-6 h-6" />
          Status Updates
        </CardTitle>
        <div className="flex items-center gap-1 text-primary cursor-pointer hover:underline">
          Copy Link
          <Copy className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex flex-col relative">
          {quote.shipment?.trackingEvents?.map((update: any, index: number) => (
            <div key={update.id} className="relative flex items-center mb-8 gap-4 w-full">
              <div className="whitespace-nowrap">{update.occurredAt ? format(new Date(update.occurredAt), 'MMM dd, yyyy') : 'N/A'}</div>
              <div className="relative">
                {iconMapper(update.status)}
                {index !== quote.shipment?.trackingEvents?.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-full bg-gray-200"></div>
                )}
              </div>
              <p className="capitalize">
                {update.status.replaceAll("_", " ").toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
