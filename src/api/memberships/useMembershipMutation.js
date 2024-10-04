import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import queryKeys from "../clients/useQueryKeys.js";

const createFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/membership", data);
    return response.data;
};

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/membership/${id}`);
};

const updateFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log({ id, updatedData });
    const response = await apiClient.patch(`membership/${id ?? undefined}`, updatedData);
    return response.data;
};

const useEditMembership = () => {
    return useCustomMutation(updateFn, queryKeys.DETAIL, {
        success: {
            title: "Success!",
            content: "Nice! Membership was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the membership. Please try again!",
            severity: "error"
        },
    });
};

const useDeleteMembership = () => {
    return useCustomMutation(deleteFn, queryKeys.DETAIL, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the membership. Please try again!",
            severity: "error"
        },
    });
};

const useCreateMembership = () => {
    return useCustomMutation(createFn, queryKeys.DETAIL, {
        success: {
            title: "Success!",
            content: "Nice! Membership was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the membership. Please try again!",
            severity: "error"
        },
    });
};

export { useEditMembership, useDeleteMembership, useCreateMembership };