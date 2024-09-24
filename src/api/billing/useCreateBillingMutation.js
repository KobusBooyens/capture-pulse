import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../_shared/useCustomMutation.js";

const createFn = async (payload) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("createFn", payload);
    const response = await apiClient.post("/billing", payload.data);
    return response.data;
};

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/billing/${id}`);
};

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.patch(`billing/${id}`, updatedData);
    return response.data;
};

const useEditBilling = () => {
    return useCustomMutation(editFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Payment was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the payment. Please try again!",
            severity: "error"
        },
    });
};

const useDeleteBilling = () => {
    return useCustomMutation(deleteFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the payment. Please try again!",
            severity: "error"
        },
    });
};

const useCreateBilling = () => {
    return useCustomMutation(createFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Payment has been recorded!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while adding the payment. Please try again!",
            severity: "error"
        },
    });
};

export { useCreateBilling,useDeleteBilling, useEditBilling };

