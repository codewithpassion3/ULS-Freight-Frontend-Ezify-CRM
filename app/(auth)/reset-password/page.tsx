"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import FormField from "@/components/common/FormField";

import {
    resetPasswordSchema,
    ResetPasswordValues,
} from "@/lib/validations/auth/reset-password-schema";

import { resetPassword } from "@/api/services/auth.api";
import { useUser } from "@/hooks/useUser";
// import { Loader } from "lucide-react";
import { useOTPFlow } from "@/context/otp.context";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/common/Loader";

export default function ResetPasswordPage() {
    const router = useRouter()
    const { token, email } = useOTPFlow()
    console.log(email)
    const { data: user, isLoading } = useUser()

    const resetMutation = useMutation({
        mutationFn: (data: ResetPasswordValues) =>
            resetPassword({ ...data }),

        onSuccess: () => {

            toast("Password Reset Successful", {
                description: "You can now login with your new password.",
            });
            router.push("/login")
        },

        onError: () => {
            toast("Reset Failed", {
                description: "Reset link may be expired.",
            });
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: user?.user?.email,
            password: "",
            confirmPassword: "",
            resetToken: token || ""
        },
    });

    const onSubmit = (data: ResetPasswordValues) => {
        resetMutation.mutate(data);
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">

            {/* Left Image */}
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

            {/* Right Form */}
            {isLoading ?
                <Loader />
                :
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

                        {/* Form Area */}
                        <div className="flex-1">

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-foreground">
                                    Reset your password
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Enter a new password for your account.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                                <FormField
                                    name="password"
                                    label="New Password*"
                                    placeholder="Enter new password"
                                    register={register}
                                    error={errors.password}
                                />

                                <FormField
                                    name="confirmPassword"
                                    label="Confirm Password*"
                                    placeholder="Confirm your password"
                                    register={register}
                                    error={errors.confirmPassword}
                                />

                                <Button type="submit" className="w-full">
                                    Reset Password
                                </Button>

                            </form>

                            <div className="mt-6 text-sm text-center">
                                <Link
                                    href="/login"
                                    className="text-primary hover:underline font-medium"
                                >
                                    Back to Login
                                </Link>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="mt-16 text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Create an account
                            </Link>
                        </div>

                    </div>

                </div>}
        </div>
    );
}