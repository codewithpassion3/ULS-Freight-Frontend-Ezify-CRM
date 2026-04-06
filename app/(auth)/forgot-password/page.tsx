"use client"

import { useState, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import FormField from "@/components/common/forms/FormField"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/common/Loader"
import { AuthLayout } from "../AuthLayout"
import { forgotPasswordSchema, ForgotPasswordValues } from "@/lib/validations/auth/forgot-password-schema"
import { forgotPassword } from "@/api/services/auth.api"
import { useOTPFlow } from "@/context/otp.context"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import Image from "next/image"
import { LanguageToggle } from "@/components/language-toggle"
import { ModeToggle } from "@/components/mode-toggle"

export default function ForgotPasswordPage() {
    const { setFlow } = useOTPFlow()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { setTimeout(() => setIsLoading(false), 300) }, [])

    const forgotMutation = useMutation({
        mutationFn: (data: ForgotPasswordValues) => forgotPassword(data),
        onSuccess: () => {
            toast("Email Sent", { description: "An OTP has been sent to your email." })
            router.push("/otp-verification")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast("Request Failed", { description: error?.response?.data?.message })
        },
    })

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" }
    })
    const { register, handleSubmit, formState: { errors } } = form

    const onSubmit = (data: ForgotPasswordValues) => {
        setFlow(data.email, "password_reset")
        forgotMutation.mutate(data)
    }

    if (isLoading) return <Loader className="min-h-screen" />

    return (
        <AuthLayout
            title="Forgot your password?"
            subtitle="Enter your email and we will send you a password reset link."
            leftImage="/login-bg.png"
            footerText={
                <>
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                        Create an account
                    </Link>
                </>
            }
        >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        name="email"
                        label="Email*"
                        placeholder="Enter your email"
                    />
                    <Button disabled={forgotMutation.isPending || Object.keys(errors).length > 0} type="submit" className="w-full">
                        Send Reset OTP
                    </Button>
                </form>
            </FormProvider>

            <div className="mt-6 text-sm text-center">
                <Link href="/login" className="text-primary hover:underline font-medium">
                    Back to Login
                </Link>
            </div>

            {/* Right Form */}
            <div className="flex items-center justify-center p-6 sm:p-12 h-screen overflow-y-auto bg-background">
                <div className="mx-auto w-full max-w-[400px] flex flex-col justify-between min-h-full py-8">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-16">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Image src="/logo.png" alt="ULS Freight" width={200} height={200} />
                        </Link>

                        <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <ModeToggle />
                        </div>
                    </div>

                    {/* Form */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-foreground">
                                Forgot your password?
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Enter your email and we will send you a password reset link.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            <FormField
                                name="email"
                                label="Email*"
                                placeholder="Enter your email"
                            />

                            <Button type="submit" className="w-full">
                                Send Reset OTP
                            </Button>

                        </form>

                        <div className="mt-6 text-sm text-center">
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Back to Login
                            </Link>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Create an account
                        </Link>
                    </div>

                </div>
            </div>
        </AuthLayout>
    );
}