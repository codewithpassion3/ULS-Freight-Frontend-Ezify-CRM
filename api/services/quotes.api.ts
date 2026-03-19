import apiClient from "../client";
import { ContactType } from "@/app/(user)/settings/(address-book)/AddContactModal";

export const createContact = async (payload: ContactType) => {
    const response = await apiClient.post("/address-book", payload);
    return response.data;
};

export const getAllPalletShippingLocationTypes = async () => {
    const response = await apiClient.get("/pallet-shipping-location-types");
    return response.data;
};

export const getAllSignatures = async () => {
    const response = await apiClient.get("/signatures");
    return response.data;
};

