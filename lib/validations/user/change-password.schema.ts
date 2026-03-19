import { z } from "zod"

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, "Current password is required"),
        newPassword: z
            .string()
            .regex(/[a-z]/, "Password must include at least one lowercase letter")
            .regex(/[A-Z]/, "Password must include at least one uppercase letter")
            .regex(/[0-9]/, "Password must include at least one number")
            .regex(/[^A-Za-z0-9]/, "Password must include at least one special character")
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