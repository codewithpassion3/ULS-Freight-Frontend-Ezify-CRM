import apiClient from "../client";

export const registerUser = async (payload: any) => {
    const response = await apiClient.post("/auth/signup", payload);
    return response.data;
};
export const getUser = async () => {
    const response = await apiClient.get("/users/me")
    return response.data
};
export const loginUser = async (payload: any) => {
    const response = await apiClient.post("/auth/signin", payload)
    return response.data
}