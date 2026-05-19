import axios from "axios";
import apiClient from "../client";

export const createShipment = async (payload: any) => {
    console.log(payload)
    const response = await apiClient.post("/shipments", payload);
    return response.data;
};
export const updateShipment = async (id: string, payload: any) => {
    const response = await apiClient.patch(`/shipments/${id}`, payload);
    return response.data;
};
export const bookShipment = async (payload: any) => {
    const response = await apiClient.post("/shipment-carriers/shipments", payload);
    return response.data;
};

export const getAddressByPostalCode = async (postalCode: string) => {
    if (!postalCode || postalCode.length < 3) {
        throw new Error("Invalid postal code");
    }
    const response = await apiClient.get(`/postal-codes/${postalCode}`);
    console.log(response.data)
    return response.data;
};

// shipment rates
export const getShipmentRates = async (payload: any) => {
    const response = await apiClient.post("/shipment-carriers/rates", payload);
    return response.data;
};
