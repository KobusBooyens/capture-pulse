import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../_shared/useCustomFetch.js";
import { apiClient, buildUrlParams } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";

const useClients = ({ page, pageSize, searchText, sortColumn, sortDirection }) => {
    const url = `/clients?${buildUrlParams(page, pageSize, searchText, sortColumn, sortDirection)}`;

    return useCustomFetch([...queryKeys.PAGINATED, url], url);
};

const createClientFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/clients", data);
    return response.data;
};

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/clients/${id}`);
};

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(updatedData);
    const response = await apiClient.patch(`clients/${id}`, updatedData);
    return response.data;
};

const useEditClient = () => {
    return useCustomMutation(editFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Client was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the client. Please try again!",
            severity: "error"
        },
    });
};

const useDeleteClient = () => {
    return useCustomMutation(deleteFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the client. Please try again!",
            severity: "error"
        },
    });
};

const useCreateClient = () => {
    return useCustomMutation(createClientFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Client was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the client. Please try again!",
            severity: "error"
        },
    });
};

export { useClients, useCreateClient, useDeleteClient, useEditClient } ;