"use client";
import Image from "next/image"
import Link from "next/link"
import { Eye, Package2, RefreshCcw } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormValues } from "@/lib/validations/auth/login-schema"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/api/services/auth.api"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import FormField from "@/components/common/FormField"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export default function LoginPage() {
  const router = useRouter()
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
    onSuccess: (data) => {
      console.log("Login successful:", data)
      toast("Login Successful", {
        description: "Welcome back! You are now logged in.",
      })
      router.push("/")
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message)
    }
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  })

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data)
  }
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Left Column - Image Background */}
      <div className="hidden lg:relative lg:flex lg:flex-col justify-center items-center">
        <Image
          src="/login-bg.png"
          alt="Shipping Simplfied"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* <h1 className="relative z-10 text-4xl font-bold text-white tracking-tight">
          Shipping Simplified
        </h1> */}
      </div>

      {/* Right Column - Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 h-screen overflow-y-auto bg-background">
        <div className="mx-auto w-full max-w-[400px] flex flex-col justify-between min-h-full py-8">

          {/* Header Area */}
          <div className="flex items-center justify-between mb-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Image loading="eager" src="/logo.png" alt="ULS Freight" width={200} height={200} />
            </Link>
            {/* <div className="flex items-center gap-2">
              <LanguageToggle />
              <ModeToggle />
            </div> */}
          </div>

          {/* Form Area */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                To access your ULS FREIGHT account, sign in below.
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="email"
                label="Email*"
                placeholder="Enter your email"
                register={register}
                error={errors.email}
              />
              <FormField
                name="password"
                label="Password*"
                placeholder="Enter your password"
                register={register}
                error={errors.password}
              />
              <div className="my-6 flex items-center justify-end">
                {/* <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-medium leading-none cursor-pointer">
                    Remember me
                  </Label>
                </div> */}
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* reCAPTCHA Mockup */}
              {/* <div className="opacity-50 border border-border rounded bg-card p-3 flex grow items-center justify-between w-[300px] mt-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 border-2 border-muted-foreground rounded bg-background"></div>
                <span className="text-sm font-medium text-foreground">I'm not a robot</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCcw className="h-6 w-6 text-primary mb-1" />
                <span className="text-[10px] text-muted-foreground text-center">reCAPTCHA<br />Privacy - Terms</span>
              </div>
            </div> */}

              <Button type="submit" variant="default" className="w-full">
                Start Shipping!
              </Button>
            </form>

          </div>

          {/* Footer Area */}
          <div className="mt-16 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div >
  )
}
