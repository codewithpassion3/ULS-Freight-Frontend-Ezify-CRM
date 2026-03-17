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
    .superRefine((data, ctx) => {
        const USER_ROLE_ID = 2 // example: roleId for "user"

        if (data.roleId === USER_ROLE_ID) {
            if (!data.permissionIds || data.permissionIds.length === 0) {
                ctx.addIssue({
                    path: ["permissionIds"],
                    code: z.ZodIssueCode.custom,
                    message: "At least one permission must be selected for user role"
                })
            }
        }
    })

export type AddUserFormValues = z.infer<typeof addUserSchema>