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


// get single quote
export const getSingleQuote = async (id: string) => {
    const response = await apiClient.get(`/quotes/${id}`);
    return response.data;
};

export const getAllQuotes = async () => {
    const response = await apiClient.get(`/quotes`);
    return response.data;
};
export const getFavoriteQuotes = async () => {
    const response = await apiClient.get(`/quotes/favorites`);
    return response.data;
};
export const getSavedQuotes = async () => {
    const response = await apiClient.get(`/quotes/saved`);
    return response.data;
};
export const getSpotQuotes = async () => {
    const response = await apiClient.get(`/quotes/spot`);
    return response.data;
};