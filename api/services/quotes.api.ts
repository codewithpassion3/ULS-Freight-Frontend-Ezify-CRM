// create quote

import { ShipmentTypes } from "@/components/shared/DynamicQuote/DynamicQuote";
import apiClient from "../client";

export const createQuote = async (payload: any) => {
    const response = await apiClient.post("/quotes", payload);
    return response.data;
};

export const updateQuote = async (id: string, payload: any) => {
    const response = await apiClient.patch(`/quotes/${id}`, payload);
    return response.data;
};
// delete quote
export const deleteQuote = async (id: string) => {
    const response = await apiClient.delete(`/quotes/${id}`);
    return response.data;
};
// get all quotes

export const getAllQuotes = async ({ search, shipmentType }: { search: string, shipmentType: ShipmentTypes[] }) => {
    const response = await apiClient.get(`/quotes?search=${search}&shipmentType=${shipmentType.join(", ")}`);
    return response.data;
};

// get single quote
export const getSingleQuote = async (id: string) => {
    const response = await apiClient.get(`/quotes/${id}`);
    return response.data;
};

export const getFavoriteQuotes = async ({ search, shipmentType }: { search: string, shipmentType: ShipmentTypes[] }) => {
    const response = await apiClient.get(`/quotes/favorites?search=${search}&shipmentType=${shipmentType}`);
    return response.data;
};
export const getSavedQuotes = async ({ search, shipmentType }: { search: string, shipmentType: ShipmentTypes[] }) => {
    const response = await apiClient.get(`/quotes/saved?search=${search}&shipmentType=${shipmentType}`);
    return response.data;
};
export const getSpotQuotes = async ({ search, shipmentType }: { search: string, shipmentType: ShipmentTypes[] }) => {
    const response = await apiClient.get(`/quotes/spot?search=${search}&shipmentType=${shipmentType}`);
    return response.data;
};