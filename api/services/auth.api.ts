import apiClient from "../client";

export const registerUser = async (payload: any) => {
    const response = await apiClient.post("/auth/signup", payload);
    return response.data;
};