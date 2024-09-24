import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation";
import queryKeys from "./useQueryKeys.js";

const createUserFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/user", data);
    return response.data;
};

const updateFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(updatedData);
    const response = await apiClient.patch(`user/${id}`, updatedData);
    return response.data;
};

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/user/${id}`);
};

const useUserMutation = (showAlert, enablePagination) => {
    return useCustomMutation(createUserFn, enablePagination ?
        queryKeys.PAGINATED : queryKeys.DETAIL,
    showAlert && {
        success: {
            title: "Success!",
            content: "Nice! User was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the user. Please try again!",
            severity: "error"
        },
    });
};

const useUpdateUser = () => {
    return useCustomMutation(updateFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! User was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the user. Please try again!",
            severity: "error"
        },
    });
};

const useDeleteUser = () => {
    return useCustomMutation(deleteFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "User has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the user. Please try again!",
            severity: "error"
        },
    });
};

export { useUserMutation, useUpdateUser, useDeleteUser };
