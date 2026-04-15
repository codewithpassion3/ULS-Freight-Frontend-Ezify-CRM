"use client";
import DashboardHeader from "./home/components/DashboardHeader";
import NotificationsSummary from "./home/components/NotificationsSummary";
import TrackingUpdatesWidget from "./home/components/TrackingUpdatesWidget";
import InvoicingUpdatesWidget from "./home/components/InvoicingUpdatesWidget";
import TrackShipmentsWidget from "./home/components/TrackShipmentsWidget";
import PickupSummaryWidget from "./home/components/PickupSummaryWidget";
import PromoBannerWidget from "./home/components/PromoBannerWidget";
import SSETest from "./Notification";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-background py-8">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Column (Left) */}
                    <div className="flex-1 min-w-0">
                        <DashboardHeader />
                        <NotificationsSummary />
                        <TrackingUpdatesWidget />
                        <InvoicingUpdatesWidget />
                    </div>
                    {/* Sidebar (Right) */}
                    <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
                        <TrackShipmentsWidget />
                        <PickupSummaryWidget />
                        <PromoBannerWidget />
                    </div>
                </div>
            </div>
            {/* Hidden/Background Services */}
            <SSETest />
        </div>
    );
}
