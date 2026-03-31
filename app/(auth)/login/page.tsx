"use client"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormValues } from "@/lib/validations/auth/login-schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginUser, getUser } from "@/api/services/auth.api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import FormField from "@/components/common/forms/FormField"
import { Button } from "@/components/ui/button"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { useEffect, useState } from "react"
import { Loader } from "@/components/common/Loader"
import Link from "next/link"
import { AuthLayout } from "../AuthLayout"
import { FormCheckbox } from "@/components/common/forms/FormCheckbox"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(true)

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
    onSuccess: async (data) => {
      toast("Login Successful", { description: "Welcome back! You are now logged in." })
      try {
        await queryClient.fetchQuery({ queryKey: ["user"], queryFn: getUser })
      } catch { }
      setTimeout(() => router.replace("/"), 300)
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message)
    },
  })

  useEffect(() => {

    setTimeout(() => setIsLoading(false), 300)
  }
    , [])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false }
  })
  const { register, handleSubmit, formState: { errors } } = form

  const onSubmit = (data: LoginFormValues) => loginMutation.mutate(data)

  if (isLoading) return <Loader className="min-h-screen" />

  return (
    <AuthLayout
      title="To access your ULS FREIGHT account, sign in below."
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
          <FormField
            name="password"
            label="Password*"
            placeholder="Enter your password"
            type="password"
          />
          <div className="flex items-center gap-2">
            <Checkbox
              className="cursor-pointer"
              {...register("remember")}
            />
            <Label>
              Remember me
            </Label>
          </div>
          <div className="my-6 flex items-center justify-end">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" variant="default" className="w-full">
            Start Shipping!
          </Button>
        </form>
      </FormProvider>
    </AuthLayout>
  )
}