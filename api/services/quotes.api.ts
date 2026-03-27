// create quote

import apiClient from "../client";

export const createQuote = async (payload: any) => {
    const response = await apiClient.post("/quotes", payload);
    return response.data;
};

// get all quotes
export const getAllQuotes = async () => {
    const response = await apiClient.get("/quotes");
    return response.data;
};

// get single quote
export const getSingleQuote = async (id: string) => {
    const response = await apiClient.get(`/quotes/${id}`);
    return response.data;
};

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
