"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, MoveDown } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/navigation"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import UserProfile from "./user/UserProfile"
// import { DropdownMenu } from "radix-ui"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { LanguageToggle } from "../language-toggle"
import { ModeToggle } from "../mode-toggle"


export default function Header() {
    const pathname = usePathname()

    return (
        <header className="border-b w-full fixed bg-white/10 backdrop-blur-md border border-white/20 z-10">
            <div className="flex h-20 items-center justify-between px-4 lg:px-6">

                {/* LEFT */}
                <div className="flex items-center gap-6">

                    <Image
                        src="/logo-light.jpeg"
                        alt="logo"
                        width={64}
                        height={64}
                    />

                    {/* DESKTOP NAV */}
                    {/*  */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>

                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.title}>

                                    {!item.items ? (
                                        <Link
                                            href={item.href!}
                                            className={`px-3 py-2 text-sm rounded-md ${pathname === item.href
                                                ? "bg-gray-100 font-medium"
                                                : "hover:bg-gray-50 dark:hover:text-black"
                                                }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <DropdownMenu>

                                            <DropdownMenuTrigger asChild>
                                                <button className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:text-black">
                                                    {item.title}
                                                    <ChevronDown className="size-4" />
                                                </button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="start" className="w-48">
                                                {item.items.map((sub) => (
                                                    <DropdownMenuItem key={sub.title} asChild>
                                                        <Link href={sub.href}>{sub.title}</Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>

                                        </DropdownMenu>
                                    )}

                                </NavigationMenuItem>
                            ))}

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-8">
                    <div className="flex gap-2">
                        <LanguageToggle />
                        <ModeToggle />
                    </div>
                    <UserProfile />
                </div>
            </div>
        </header>
    )
}