import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign, FileQuestionMark, Info, LogOut, Menu, User, UserRound } from "lucide-react"
import { navItems } from "@/lib/navigation"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import { UserProfileSkeleton } from "./UserProfileSkeleton"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLogoutMutation } from "@/hooks/useLogout"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { AccountBalanceModal } from "./AccountBalanceModal"

export default function UserProfile() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const { data: user, isLoading, error } = useUser()
    const logoutMutation = useLogoutMutation({
        onSuccess: () => toast.success("User logged out successfully"),
        onError: (error: AxiosError<ApiError>) => toast.error(error?.response?.data?.message),
    })
    const handleLogout = () => {
        logoutMutation.mutate()
    }
    const handleNavigate = (path: string) => {
        router.push(path)
        setOpen(false)
    }
    return (
        <>
            {isLoading ?
                <UserProfileSkeleton /> :
                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium">
                            Welcome, {user?.user?.firstName} {user?.user?.lastName}
                        </p>
                        <p className="text-xs dark:text-white text-blue-600">
                            Available Credit: $1,080.62
                        </p>
                    </div>

                    {/* USER MENU */}
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={`${BASE_URL}${user?.user?.profilePic}`} />
                                <AvatarFallback>{user?.user?.firstName?.charAt(0)}{user?.user?.lastName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-full" align="end">
                            {/* account balance */}
                            <DropdownMenuItem className="cursor-pointer">
                                <div className="flex items-center gap-2" onClick={() => setModalOpen(true)}>
                                    <DollarSign />
                                    Account Balance
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate("/settings")}>
                                <UserRound />
                                Settings
                            </DropdownMenuItem>

                            <DropdownMenuItem className="cursor-pointer">
                                <CreditCard />
                                <Link href="/billing">
                                    Billing
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="cursor-pointer">
                                <Info />
                                <Link href="/faqs">
                                    FAQs and resources
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="hover:bg-transparent!">
                                <Button variant="outline" className="w-full flex gap-2" size="lg" onClick={handleLogout}>
                                    <LogOut />
                                    Logout
                                </Button>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AccountBalanceModal open={modalOpen} onOpenChange={setModalOpen} />

                    {/* MOBILE MENU */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                            >
                                <Menu size={22} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-[280px]">
                            <SheetHeader className="sr-only">
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6">

                                <Accordion type="single" collapsible>

                                    {navItems.map((item) => (
                                        <div key={item.title}>

                                            {!item.items ? (
                                                <Link
                                                    href={item.href!}
                                                    className="block p-4 text-sm font-medium"
                                                >
                                                    {item.title}
                                                </Link>
                                            ) : (
                                                <AccordionItem value={item.title}>

                                                    <AccordionTrigger className="px-4">
                                                        {item.title}
                                                    </AccordionTrigger>

                                                    <AccordionContent>

                                                        <div className="flex flex-col gap-2 pl-2">

                                                            {item.items.map((sub) => (
                                                                <Link
                                                                    key={sub.title}
                                                                    href={sub.href}
                                                                    className="text-sm px-4 text-muted-foreground hover:text-black"
                                                                >
                                                                    {sub.title}
                                                                </Link>
                                                            ))}

                                                        </div>

                                                    </AccordionContent>

                                                </AccordionItem>
                                            )}

                                        </div>
                                    ))}

                                </Accordion>

                            </div>

                        </SheetContent>
                    </Sheet>

                </div>}
        </>
    )
}