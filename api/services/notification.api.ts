import apiClient from "../client";

export const getNotifications = async () => {
    const response = await apiClient.get("/notifications");
    return response.data;
};
// dismiss notification api
export const dismissNotification = async (id: number) => {
    const response = await apiClient.delete(`/notifications/?notificationIds=${id}`);
    return response.data;
};
