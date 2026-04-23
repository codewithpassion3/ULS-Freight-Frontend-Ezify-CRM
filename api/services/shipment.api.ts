import axios from "axios";
import apiClient from "../client";

export const createShipment = async (payload: any) => {
    const response = await apiClient.post("/shipments", payload);
    return response.data;
};
export const updateShipment = async (id: string, payload: any) => {
    const response = await apiClient.patch(`/shipments/${id}`, payload);
    return response.data;
};

export const getAddressByPostalCode = async (postalCode: string, countryCode: string) => {
    if (!postalCode || postalCode.length < 3) {
        throw new Error("Invalid postal code");
    }
    try {
        const response = await axios.get(
            `https://api.zippopotam.us/${countryCode}/${postalCode}`
        );

        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch postal code:", error);
        return null; // or throw new Error(...)
    }
};

// shipment rates
export const getShipmentRates = async (payload: any) => {
    const response = await apiClient.post("/shipment-carriers/rates", payload);
    return response.data;
};