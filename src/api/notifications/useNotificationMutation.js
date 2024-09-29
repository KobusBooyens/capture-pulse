import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import useQueryKeys from "./useQueryKeys.js";

const updateFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await apiClient.patch(`notifications/${id}`, updatedData);
    return response.data;
};

const createFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/clients", data);
    return response.data;
};

const useCreateNotification = () => {
    return useCustomMutation(createFn, useQueryKeys.all, {
        success: {
            title: "Success!",
            content: "Nice! Notification was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the notification. Please try again!",
            severity: "error"
        },
    });
};

const useUpdateNotification = () => {
    return useCustomMutation(updateFn, useQueryKeys.all, {
        success: {
            title: "Success!",
            content: "Nice! Notification was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the notification. Please try again!",
            severity: "error"
        },
    });
};

export { useUpdateNotification, useCreateNotification };