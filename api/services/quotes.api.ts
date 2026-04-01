// create quote

import apiClient from "../client";

export const createQuote = async (payload: any) => {
    const response = await apiClient.post("/quotes", payload);
    return response.data;
};

export const updateQuote = async (payload: any) => {
    const response = await apiClient.patch(`/quotes/${payload.quote.id}`, payload);
    return response.data;
};

// get all quotes
export const getAllQuotes = async ({ search }: { search: string }) => {
    const response = await apiClient.get(`/quotes?search=${search}`);
    return response.data;
};
// get single quote
export const getSingleQuote = async (id: string) => {
    const response = await apiClient.get(`/quotes/${id}`);
    return response.data;
};

export const getFavoriteQuotes = async ({ search }: { search: string }) => {
    const response = await apiClient.get(`/quotes/favorites?search=${search}`);
    return response.data;
};
export const getSavedQuotes = async ({ search }: { search: string }) => {
    const response = await apiClient.get(`/quotes/saved?search=${search}`);
    return response.data;
};
export const getSpotQuotes = async ({ search }: { search: string }) => {
    const response = await apiClient.get(`/quotes/spot?search=${search}`);
    return response.data;
};


// get single quote

// // update quote
// export const updateQuote = async (id: string, data: any) => {
//     const response = await apiClient.patch(`/quotes/${id}`, data);
//     return response.data;
// };

// delete quote
export const deleteQuote = async (id: string) => {
    const response = await apiClient.delete(`/quotes/${id}`);
    return response.data;
};
