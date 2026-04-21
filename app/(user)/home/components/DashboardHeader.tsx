import Link from "next/link"
import { ChartColumnBig, PlayCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth.context"

export default function DashboardHeader() {
    const { user } = useAuth()
    const name = user?.user?.firstName + " " + user?.user?.lastName
    const renderSelectedButton = () => {
        const defaultButton = user?.user?.settings?.home_quick_button
        switch (defaultButton) {
            case "create-quote":
                return (
                    <Link href="/quote">
                        <Plus className="size-4" />
                        Create New Quote
                    </Link>
                )
            case "create-shipment":
                return (
                    <Link href="/shipment">
                        <Plus className="size-4" />
                        Create Shipment
                    </Link>
                )
            case "quotes-dashboard":
                return (
                    <Link href="/quotes">
                        <ChartColumnBig />
                        Quotes Dashboard
                    </Link>
                )
            case "pickups-dashboard":
                return (
                    <Link href="/pickups">
                        <ChartColumnBig />
                        Pickups Dashboard
                    </Link>
                )
            case "tracking-dashboard":
                return (
                    <Link href="/track">
                        <ChartColumnBig />
                        Tracking Dashboard
                    </Link>
                )
            case "invoices-dashboard":
                return (
                    <Link href="/invoices">
                        <ChartColumnBig />
                        Invoices Dashboard
                    </Link>
                )

            default:
                return (
                    <Link href="/shipment">
                        <Plus className="size-4" />
                        Create New Quote
                    </Link>
                )
        }
    }
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl text-[#1E293B] dark:text-white tracking-tighter">Welcome, {name}</h1>
                <Link href="#" className="flex items-center gap-1.5 text-sm text-[#0072BC] hover:underline font-medium mt-1">
                    <PlayCircle className="size-4" />
                    Click here for a quick tour
                </Link>
            </div>
            <Button asChild>
                {renderSelectedButton()}
            </Button>
        </div>
    )
}
