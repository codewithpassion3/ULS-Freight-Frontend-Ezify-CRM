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
import { useUser } from "@/hooks/useUser"
import { useAuth } from "@/context/auth.context"
import { useEffect, useState } from "react"
import { User } from "@/app/(user)/settings/(user-preference)/UserTable"
import { Loader } from "./Loader"
import NotificationsWidget from "@/app/(user)/home/NotificationsWidget"


export default function Header() {
    const { user } = useAuth();
    const pathname = usePathname()
    return (
        <header className="w-full  fixed bg-white/10 backdrop-blur-md border-b border-b-black/20 dark:border-b-white/20 z-10">
            <div className="flex h-20 container mx-auto items-center justify-between">
                {/* LEFT */}
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={100}
                            height={100}
                        />
                    </Link>

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
                                                ? " font-medium text-black dark:text-white"
                                                : "hover:bg-gray-50 dark:hover:text-black!"
                                                }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <DropdownMenu>

                                            {user.user.role.name.includes("admin") ?
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="link" className="hover:no-underline text-black dark:text-white">
                                                        {item.title}
                                                        <ChevronDown className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                :
                                                <DropdownMenuTrigger asChild>
                                                    {
                                                        item.title === "Ship" ? user?.permissions?.includes("shipping") ? <button className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:text-black">
                                                            {item.title}
                                                            <ChevronDown className="size-4" />
                                                        </button> : "" :
                                                            item.title === "Invoices" ? user?.permissions?.includes("billing") ? <button className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:text-black">
                                                                {item.title}
                                                                <ChevronDown className="size-4" />
                                                            </button> : "" :
                                                                item.title === "Claims" ? user?.permissions?.includes("claims") ? <button className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:text-black">
                                                                    {item.title}
                                                                    <ChevronDown className="size-4" />
                                                                </button> : "" :
                                                                    <button className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:text-black">
                                                                        {item.title}
                                                                        <ChevronDown className="size-4" />
                                                                    </button>
                                                    }

                                                </DropdownMenuTrigger>

                                            }

                                            <DropdownMenuContent align="start" className="w-48">
                                                {item.items.map((sub) => (
                                                    <DropdownMenuItem key={sub.title} asChild>
                                                        <Link href={sub.href} className="cursor-pointer">{sub.title}</Link>
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
                {/* <p>User Role : {currentUser.role.id}</p> */}
                {/* RIGHT SIDE */}
                <div className="flex items-center gap-8">
                    <div className="flex gap-4">
                        <LanguageToggle />
                        <NotificationsWidget/>
                        <ModeToggle />
                    </div>
                    <UserProfile />
                </div>
            </div>
        </header>
    )
}