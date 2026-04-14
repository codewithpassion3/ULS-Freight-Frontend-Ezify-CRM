import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    changePasswordSchema,
    ChangePasswordFormValues
} from "@/lib/validations/user/change-password.schema"
import FormField from "@/components/common/form/fields/FormField"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/api/services/auth.api"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { ApiError } from "next/dist/server/api-utils"
import { AxiosError } from "axios"
import { useLogoutMutation } from "@/hooks/useLogout"
import { useEffect } from "react"
// import { useLogoutMutation } from "@/components/common/user/UserProfile"

export default function ChangePassword() {
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            newConfirmPassword: ""
        }
    })
    // console.log(errors)
    const logoutMutation = useLogoutMutation({
        onSuccess: () => toast.success("User logged out successfully"),
        onError: (error: AxiosError<ApiError>) => toast.error(error?.response?.data?.message),
    })
    const handleLogout = () => {
        logoutMutation.mutate()
    }
    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            toast.success("Password changed successfully")
            handleLogout()
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message)
        }
    })

    const onSubmit = (data: ChangePasswordFormValues) => {
        mutate(data)
    }

    return (
        <div>
            <h3 className="font-medium mb-4 text-base">Change Password</h3>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            field={{
                                name: "currentPassword",
                                label: "Current Password*",
                                type: "password",
                            }}
                        />
                        <FormField
                            field={{
                                name: "newPassword",
                                label: "New Password*",
                                type: "password",
                            }}
                        />

                        <FormField
                            field={{
                                name: "newConfirmPassword",
                                label: "Confirm New Password*",
                                type: "password",
                            }}
                        />

                    </div>
                    <div className="flex gap-4 mt-6">
                        <Button className="w-full sm:w-40" disabled={isPending || !form.formState.isValid} type="submit">
                            {isPending ? <Loader className="animate-spin" /> : "Update Password"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}