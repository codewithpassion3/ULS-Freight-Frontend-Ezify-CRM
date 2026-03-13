import { OtpFormValues, VerifyOtpFormValues } from "@/lib/validations/auth/otp-verification-schema";
import apiClient from "../client";
// Email verification
export const sendEmailVerificationOTP = async (data: OtpFormValues) => {
    const response = await apiClient.post("/otp/generate", data)
    return response.data
}
export const verifyEmailOTP = async (data: VerifyOtpFormValues) => {
    const response = await apiClient.post("/otp/verify", data)
    return response.data
}
