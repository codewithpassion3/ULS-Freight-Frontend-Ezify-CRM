import { z } from "zod"

export const addUserSchema = z.object({
    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),

    phoneNumber: z
        .string()
        .min(10, "Phone number is required"),

    roleId: z
        .string()
        .min(1, "Role is required"),

    shipping: z.boolean().optional(),
    invoicing: z.boolean().optional(),
    claims: z.boolean().optional()
})

export type AddUserFormValues = z.infer<typeof addUserSchema>