"use client"

import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { Loader } from "@/components/common/Loader"
import { useEffect } from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && data) {
            router.push("/")
        }
    }, [data, isLoading, router])

    if (isLoading || data) return <Loader />

    return <>{children}</>
}