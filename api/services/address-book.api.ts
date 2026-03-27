import { ContactType } from "@/app/(user)/settings/(address-book)/types/addContact.types";
import apiClient from "../client";


export const getAllAddressBookContacts = async ({ search }: { search: string }) => {
    const response = await apiClient.get("/address-book", { params: { search } });
    return response.data;
};

export const createContact = async (payload: ContactType) => {
    const response = await apiClient.post("/address-book", payload);
    return response.data;
};

export const getSingleContact = async (id: string) => {
    const response = await apiClient.get(`/address-book/${id}`);
    return response.data;
};

export const updateContact = async (id: string, data: ContactType) => {
    const response = await apiClient.patch(`/address-book/${id}`, data);
    return response.data;
};

export const deleteContact = async (id: string) => {
    const response = await apiClient.delete(`/address-book/${id}`);
    return response.data;
};

export const markContactAsRecent = async (id: string) => {
    const response = await apiClient.post(`/address-book/${id}/recent`);
    return response.data;
};

export const getRecentContacts = async ({ search }: { search: string }) => {
    const response = await apiClient.get("/address-book/recent", { params: { search } });
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

