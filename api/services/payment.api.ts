import apiClient from "../client";

export const createIntent = async (customerId: string) => {
    const response = await apiClient.post("/payments/setup-intent", { customerId });
    return response.data;
};

export const getCards = async () => {
    const response = await apiClient.get("/payments/saved-cards");
    return response.data;
};

export const topupWallet = async (payload: any) => {
    const response = await apiClient.post("/payments/charge", payload);
    return response.data;
};