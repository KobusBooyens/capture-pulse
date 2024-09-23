import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import queryKeys from "./useQueryKeys.js";

/**Functions**/
const createCheckinFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/package", data);
    return response.data;
};

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/package/${id}`);
};

const updateFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.put(`package/${id}`, updatedData);
    return response.data;
};

/**Mutations**/
const useCreatePackage = () => {
    return useCustomMutation(createCheckinFn, queryKeys.all, {
        success: {
            title: "Success!",
            content: "Nice! Package was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the package. Please try again!",
            severity: "error"
        },
    });
};

const useDeletePackage = () => {
    return useCustomMutation(deleteFn, queryKeys.all, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the package. Please try again!",
            severity: "error"
        },
    });
};

const useUpdatePackage = () => {
    return useCustomMutation(updateFn, queryKeys.all, {
        success: {
            title: "Success!",
            content: "Nice! Package was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the package. Please try again!",
            severity: "error"
        },
    });
};

export { useCreatePackage, useDeletePackage, useUpdatePackage };