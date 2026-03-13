import { z } from "zod"

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, "Current password is required"),

        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        newConfirmPassword: z
            .string()
            .min(8, "Confirm password is required"),
    })
    .refine((data) => data.newPassword === data.newConfirmPassword, {
        message: "Passwords do not match",
        path: ["newConfirmPassword"],
    })

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>