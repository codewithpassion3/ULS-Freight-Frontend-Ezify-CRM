import { Package, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PackagingDetailsCard() {
  return (
    <Card className="rounded-sm shadow-sm mb-6">
      <CardHeader className="bg-slate-50 border-b py-3 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Package className="w-4 h-4" />
          Packaging Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-muted-foreground">Packaging Type:</span> <span className="font-medium text-foreground">Pallet</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total # of units on pallets:</span> <span className="font-medium text-foreground">1 unit</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Units:</span> <span className="font-medium text-foreground">1 Pallet</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Dangerous Goods:</span> <span className="font-medium text-foreground">None</span></div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dimensional Weight:</span>
              <span className="font-medium text-foreground flex items-center gap-1">83.33 lbs <Info className="w-3.5 h-3.5 text-primary" /></span>
            </div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Shipment Weight:</span> <span className="font-medium text-foreground">165 lbs</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Stackable:</span> <span className="font-medium text-foreground">No</span></div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-foreground h-8 w-10">#</TableHead>
              <TableHead className="font-semibold text-foreground h-8 text-center">Length (in)</TableHead>
              <TableHead className="font-semibold text-foreground h-8 text-center">Width (in)</TableHead>
              <TableHead className="font-semibold text-foreground h-8 text-center">Height (in)</TableHead>
              <TableHead className="font-semibold text-foreground h-8 text-center">Weight (lbs)</TableHead>
              <TableHead className="font-semibold text-foreground h-8">Type</TableHead>
              <TableHead className="font-semibold text-foreground h-8 text-right"># units on pallet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b-0">
              <TableCell>1</TableCell>
              <TableCell className="text-center">40</TableCell>
              <TableCell className="text-center">30</TableCell>
              <TableCell className="text-center">12</TableCell>
              <TableCell className="text-center">165</TableCell>
              <TableCell>Pallet</TableCell>
              <TableCell className="text-right">1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7} className="pt-0 text-muted-foreground font-medium border-t-0 pl-10">
                Description: Pallet
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
