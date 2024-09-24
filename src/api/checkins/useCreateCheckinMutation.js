import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../_shared/useCustomMutation.js";

const createCheckinFn = async (payload) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const { type } = payload;
    const response = await apiClient.post(`/checkins/${type}`, payload.data);
    return response.data;
};

const deleteFn = async ({ id, type }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/checkins/${type}/${id}`);
};

const editFn = async ({ id, updatedData, type }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.patch(`checkins/${type}/${id}`, updatedData);
    return response.data;
};

const useEditCheckin = () => {
    return useCustomMutation(editFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Checkin was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the check-in. Please try again!",
            severity: "error"
        },
    });
};

const useDeleteCheckin = () => {
    return useCustomMutation(deleteFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the check-in. Please try again!",
            severity: "error"
        },
    });
};

const useCreateCheckin = () => {
    return useCustomMutation(createCheckinFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Check-in done!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while adding the check-in. Please try again!",
            severity: "error"
        },
    });
};

export { useCreateCheckin, useDeleteCheckin, useEditCheckin };

