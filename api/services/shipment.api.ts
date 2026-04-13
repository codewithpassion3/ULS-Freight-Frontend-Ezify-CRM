import apiClient from "../client";

export const createShipment = async (payload: any) => {
    const response = await apiClient.post("/shipments", payload);
    return response.data;
};
export const updateShipment = async (id: string, payload: any) => {
    const response = await apiClient.patch(`/shipments/${id}`, payload);
    return response.data;
};