import apiClient from "../client";

export const getAllTrackings = async () => {
    const response = await apiClient.get("/trackings");
    return response.data;
};