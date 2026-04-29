import { ShipmentHeader } from "./components/ShipmentHeader";
import { ShipmentDetailsCard } from "./components/ShipmentDetailsCard";
import { ShipmentBreakdownCard } from "./components/ShipmentBreakdownCard";
import { PackagingDetailsCard } from "./components/PackagingDetailsCard";
import { StatusUpdatesWidget } from "./components/StatusUpdatesWidget";
import { ShipmentDocumentsWidget } from "./components/ShipmentDocumentsWidget";

export default function SingleShipmentTrackingPage({ params }: { params: { id: string } }) {
  // Using static mock data directly inside the components for now to match the provided UI layout
  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 bg-slate-50/50 min-h-screen">
      <ShipmentHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-8 flex flex-col">
          <ShipmentDetailsCard />
          <ShipmentBreakdownCard />
          <PackagingDetailsCard />
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col">
          <StatusUpdatesWidget />
          <ShipmentDocumentsWidget />
        </div>
      </div>
    </div>
  );
}
