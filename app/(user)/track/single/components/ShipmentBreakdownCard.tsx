import { Info, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export function ShipmentBreakdownCard({ quote }: { quote?: any }) {
  if (!quote) return null;

  return (
    <Card className="mb-6 rounded-sm shadow-sm">
      <CardHeader className="bg-slate-50 border-b py-3 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Info className="w-4 h-4" />
          Shipment Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1 text-muted-foreground">
            <div className="flex justify-between"><span className="text-muted-foreground">Carrier:</span> <span className="font-medium text-foreground">{quote.shipment?.carrier || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Service Name:</span> <span className="font-medium text-foreground">{quote.shipment?.serviceName || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Est. Transit Time:</span> <span className="font-medium text-foreground">N/A</span></div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-muted-foreground">Base Charge:</span> <span className="font-medium">${quote.shipment?.totalBaseCharge || 0}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Surcharges:</span> <span className="font-medium">${quote.shipment?.totalSurcharges || 0}</span></div>
            <div className="flex justify-between mt-1 pt-1"><span className="text-muted-foreground">Total Price:</span> <span className="font-bold text-base">${(quote.shipment?.totalBaseCharge || 0) + (quote.shipment?.totalSurcharges || 0)} {quote.shipment?.currency || 'USD'}</span></div>
          </div>
        </div>

        <Accordion type="single" collapsible defaultValue="tracking" className="w-full border-none">
          <AccordionItem value="tracking" className="border-none">
            <AccordionTrigger className="text-primary font-semibold py-2 hover:no-underline text-sm border-b">
              Detailed Tracking History
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold text-foreground h-8">Status</TableHead>
                    <TableHead className="font-semibold text-foreground h-8">Date</TableHead>
                    <TableHead className="font-semibold text-foreground h-8 text-right">Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{quote.status === "DRAFT" ? "Draft Created" : quote.status}</TableCell>
                    <TableCell>{quote.createdAt ? format(new Date(quote.createdAt), 'hh:mm a, MMM dd, yyyy') : 'N/A'}</TableCell>
                    <TableCell className="text-right">Label Created</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
