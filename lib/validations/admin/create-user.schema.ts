import { z } from "zod"

export const addUserSchema = z.object({
    email: z
        .email("Invalid email address"),

    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
    phoneNumber: z
        .string()
        .min(10, "Phone number is required"),

    roleId: z
        .number()
        .min(1, "Role is required"),
    permissionIds: z.array(z.number()).optional()
})

export type AddUserFormValues = z.infer<typeof addUserSchema>