import { Info, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ShipmentBreakdownCard() {
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
            <div className="flex justify-between"><span className="text-muted-foreground">Carrier:</span> <span className="font-medium text-foreground">Day & Ross</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Service Name:</span> <span className="font-medium text-foreground">Domestic Standard</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Est. Transit Time:</span> <span className="font-medium text-foreground">1 Day</span></div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-muted-foreground">Base Charge:</span> <span className="font-medium">$83.96</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fuel Charge:</span> <span className="font-medium">$26.63</span></div>
            <div className="flex justify-between mt-1 pt-1"><span className="text-muted-foreground">Total Price:</span> <span className="font-bold text-base">$110.59 CAD</span></div>
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
                    <TableCell className="font-medium">Ready For Shipping</TableCell>
                    <TableCell>11:42 AM, Apr 29, 2026</TableCell>
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
