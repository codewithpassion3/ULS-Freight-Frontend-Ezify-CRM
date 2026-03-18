"use client";

import Image from "next/image"
import Link from "next/link"

import { LanguageToggle } from "@/components/language-toggle"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { otpSchema, OtpFormValues, VerifyOtpFormValues } from "@/lib/validations/auth/otp-verification-schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { sendEmailVerificationOTP, verifyEmailOTP } from "@/api/services/otp.api";
import { useUser } from "@/hooks/useUser";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useOTPFlow } from "@/context/otp.context";
import { useAuth } from "@/context/auth.context";

export default function OTPVerificationPage() {
    const { email, purpose, setToken } = useOTPFlow()
    const router = useRouter()
    console.log(email, purpose)
    // useEffect(() => {
    //     if (!email || !purpose) {
    //         router.push("/forgot-password")
    //     }
    // }, [email, purpose])
    const verifyMutation = useMutation({
        mutationFn: (data: VerifyOtpFormValues) => verifyEmailOTP(data),
        onSuccess: (data) => {
            if (purpose === "password_reset") {
                console.log(data)
                toast("OTP Verified", {
                    description: "You're redirecting to reset password.",
                })
                setToken?.(data.resetToken)
                router.push("/reset-password")
            }

            if (purpose === "email_verification") {
                toast("Verification Successful", {
                    description: "Your account has been verified.",
                })
                router.push("/login")
            }
        },
        onError: () => {
            toast("Invalid OTP", {
                description: "Please enter the correct code.",
            })
        }
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            code: "",
            email: email ?? "",
            purpose: purpose || "email_verification"
        }
    });

    const onSubmit = (data: VerifyOtpFormValues) => {
        verifyMutation.mutate({
            code: data.code,
            email: email ?? "",
            purpose: purpose || "email_verification"
        })
        console.log(data.code)
    }
    const handleResendOtp = () => {
        sendEmailVerificationOTP({
            email: email ?? "",
            purpose: "email_verification"
        })
        toast("OTP sent successfully", {
            description: "Please check your email for the verification code.",
        })
    }
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">

            {/* Left Column - Image */}
            <div className="hidden lg:relative lg:flex lg:flex-col justify-center items-center">
                <Image
                    src="/login-bg.png"
                    alt="Shipping Simplified"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Right Column */}
            <div className="flex items-center justify-center p-6 sm:p-12 h-screen overflow-y-auto bg-background">

                <div className="mx-auto w-full max-w-[400px] flex flex-col justify-between min-h-full py-8">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-16">

                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <Image
                                src="/logo.png"
                                alt="ULS Freight"
                                width={200}
                                height={200}
                            />
                        </Link>

                        {/* <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <ModeToggle />
                        </div> */}

                    </div>

                    {/* Form */}
                    <div className="flex-1">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold">
                                OTP Verification
                            </h2>

                            <p className="text-sm text-muted-foreground mt-2">
                                Enter the 6-digit code sent to your email to verify your account.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <Label htmlFor="code">Verification Code*</Label>
                            <Controller
                                name="code"
                                control={control}
                                render={({ field }) => (
                                    <InputOTP
                                        maxLength={6}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        containerClassName="w-full"
                                        size={20}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={1} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>



                                    </InputOTP>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Verify Code
                            </Button>

                        </form>

                        <div className="mt-4 text-center text-sm">

                            <span className="text-muted-foreground">
                                Didn't receive the code?
                            </span>

                            <Button
                                disabled={!email}
                                onClick={handleResendOtp}
                                type="button"
                                className="ml-2"
                            >
                                Resend OTP
                            </Button>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-sm text-muted-foreground text-center">
                        Back to{" "}
                        <Link
                            href="/login"
                            className="text-primary hover:underline font-medium"
                        >
                            Sign In
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    )
}