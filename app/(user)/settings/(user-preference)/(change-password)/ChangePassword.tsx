import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    changePasswordSchema,
    ChangePasswordFormValues
} from "@/lib/validations/user/change-password.schema"
import FormField from "@/components/common/FormField"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/api/services/auth.api"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { ApiError } from "next/dist/server/api-utils"
import { AxiosError } from "axios"

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            newConfirmPassword: ""
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            toast.success("Password changed successfully")
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
            <h3 className="font-medium mb-4">Change Password</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        name="currentPassword"
                        label="Current Password*"
                        register={register}
                        type="password"
                        error={errors.currentPassword}
                    />
                    <FormField
                        name="newPassword"
                        label="New Password*"
                        type="password"
                        error={errors.newPassword}
                        register={register}
                    />

                    <FormField
                        name="newConfirmPassword"
                        label="Confirm New Password*"
                        type="password"
                        error={errors.newConfirmPassword}
                        register={register}
                    />
                </div>
                <div className="flex gap-4 mt-6">
                    <Button className="w-full sm:w-40" disabled={isPending || !isValid} type="submit">
                        {isPending ? <Loader className="animate-spin" /> : "Update Password"}
                    </Button>
                </div>
            </form>
        </div>
    )
}