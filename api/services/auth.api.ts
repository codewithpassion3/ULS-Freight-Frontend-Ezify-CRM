import { LoginPayload } from "@/types/auth/login.types";
import apiClient from "../client";
import { ForgotPasswordValues } from "@/lib/validations/forgot-password-schema";
import { ResetPasswordValues } from "@/lib/validations/reset-password-schema";

export const registerUser = async (payload: any) => {
    const response = await apiClient.post("/auth/signup", payload);
    return response.data;
};
export const getUser = async () => {
    const response = await apiClient.get("/users/me")
    return response.data
};
export const loginUser = async (payload: LoginPayload) => {
    const response = await apiClient.post("/auth/signin", payload)
    return response.data
}
export const forgotPassword = async (data: ForgotPasswordValues) => {
    const response = await apiClient.post("/auth/forgot-password", data)
    return response.data
}
export const resetPassword = async (data: ResetPasswordValues) => {
    const response = await apiClient.post("/auth/reset-password", data)
    return response.data
}
