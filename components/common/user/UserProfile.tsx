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
import { CreditCard, FileQuestionMark, Menu, User } from "lucide-react"
import { navItems } from "@/lib/navigation"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import { UserProfileSkeleton } from "./UserProfileSkeleton"
import { useMutation } from "@tanstack/react-query"
import { logoutUser } from "@/api/services/auth.api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function UserProfile() {
    const router = useRouter()
    const { data: user, isLoading, error } = useUser()
    const handleLogout = () => {
        useLogoutMutation.mutate()
    }
    const useLogoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("User logged out successfully")
            router.push("/login")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return (
        <>
            {isLoading ?
                <UserProfileSkeleton /> :
                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium">
                            Welcome, {user?.user?.firstName} {user?.user?.lastName}
                        </p>
                        <p className="text-xs text-blue-600">
                            Available Credit: $136.37
                        </p>
                    </div>

                    {/* USER MENU */}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="/avatar.png" />
                                <AvatarFallback>{user?.user?.firstName?.charAt(0)}{user?.user?.lastName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <User />
                                <Link href="/profile">
                                    Profile
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <CreditCard />
                                <Link href="/billing">
                                    Billing
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <FileQuestionMark />
                                <Link href="/faqs">
                                    FAQs and resources
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Button onClick={handleLogout}>
                                    Logout
                                </Button>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

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