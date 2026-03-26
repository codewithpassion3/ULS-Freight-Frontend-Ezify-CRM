"use client"

import Image from "next/image"
import Link from "next/link"
import { LanguageToggle } from "@/components/language-toggle"
import { ModeToggle } from "@/components/mode-toggle"

interface AuthLayoutProps {
    children: React.ReactNode
    title?: string
    subtitle?: string
    leftImage?: string
    logoSrc?: string
    footerText?: React.ReactNode
}

export const AuthLayout = ({
    children,
    title,
    subtitle,
    leftImage = "/login-bg.png",
    logoSrc = "/logo.png",
    footerText,
}: AuthLayoutProps) => {
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            {/* Left Column - Image */}
            <div className="hidden lg:relative lg:flex lg:flex-col justify-center items-center">
                <Image
                    src={leftImage}
                    alt={title + " background" || "Auth Page Image"}
                    fill
                    sizes="auto"
                    className="h-auto w-auto object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Right Column - Content */}
            <div className="flex items-center justify-center p-6 sm:p-12 h-screen overflow-y-auto bg-background">
                <div className="mx-auto w-full max-w-[400px] flex flex-col justify-between min-h-full py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-16">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Image
                                loading="eager"
                                src={logoSrc}
                                alt="Logo"
                                height={200}
                                width={200}
                                className="w-auto h-auto"
                            />
                        </Link>
                        <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <ModeToggle />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {title && <h2 className="text-lg font-semibold text-foreground mb-2">{title}</h2>}
                        {subtitle && <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>}
                        {children}
                    </div>

                    {/* Footer */}
                    {footerText && <div className="mt-16 text-sm text-muted-foreground text-center">{footerText}</div>}
                </div>
            </div>
        </div>
    )
}