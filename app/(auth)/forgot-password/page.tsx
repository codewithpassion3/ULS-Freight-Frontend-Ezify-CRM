"use client";
import Image from "next/image";
import Link from "next/link";

import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import FormField from "@/components/common/FormField";

import { forgotPasswordSchema, ForgotPasswordValues } from "@/lib/validations/forgot-password-schema";
import { forgotPassword } from "@/api/services/auth.api";

export default function ForgotPasswordPage() {

    const forgotMutation = useMutation({
        mutationFn: (data: ForgotPasswordValues) => forgotPassword(data),
        onSuccess: () => {
            toast("Email Sent", {
                description: "Password reset link has been sent to your email.",
            });
        },
        onError: () => {
            toast("Request Failed", {
                description: "Please try again.",
            });
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (data: ForgotPasswordValues) => {
        forgotMutation.mutate(data);
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
                                register={register}
                                error={errors.email}
                            />

                            <Button type="submit" className="w-full">
                                Send Reset Link
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
                    <div className="mt-4 text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Create an account
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}