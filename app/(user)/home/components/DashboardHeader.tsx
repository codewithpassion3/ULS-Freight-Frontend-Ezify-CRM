import Link from "next/link"
import { PlayCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth.context"

export default function DashboardHeader() {
    const { user } = useAuth()
    const name = user?.user?.firstName + " " + user?.user?.lastName
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
                <Link href="/shipment">
                    <Plus className="size-4" />
                    Create New Quote
                </Link>
            </Button>
        </div>
    )
}
