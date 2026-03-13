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
import { isValid } from "zod/v3"

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            newConfirmPassword: ""
        }
    })

    const onSubmit = (data: ChangePasswordFormValues) => {
        console.log(data)
        useMutation({
            mutationFn: () => changePassword(data),
            onSuccess: () => {
                toast.success("Password changed successfully")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
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
                        name="confirmPassword"
                        label="Confirm New Password*"
                        type="password"
                        error={errors.newConfirmPassword}
                        register={register}
                    />
                </div>
                <div className="flex gap-4 mt-6">
                    <Button disabled={!isValid} type="submit">Update Password</Button>
                </div>
            </form>
        </div>
    )
}