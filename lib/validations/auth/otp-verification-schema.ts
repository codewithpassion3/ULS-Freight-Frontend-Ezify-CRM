import { z } from "zod"

export const otpSchema = z.object({
    email: z.email("Invalid email"),
    purpose: z.string()
})

export const verifyOtpSchema = z.object({
    code: z.string().min(6, "OTP must be 6 digits"),
    email: z.email("Invalid email"),
    purpose: z.string()
})

export type OtpFormValues = z.infer<typeof otpSchema>
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>