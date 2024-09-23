import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import queryKeys from "./useQueryKeys.js";

/**Functions**/
const createFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/goal", data);
    return response.data;
};

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/goal/${id}`);
};

/**Mutations**/
const useCreateGoal = () => {
    return useCustomMutation(createFn, queryKeys.all, {
        success: {
            title: "Success!",
            content: "Nice! Goal was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the goal. Please try again!",
            severity: "error"
        },
    });
};

const useDeleteGoal = () => {
    return useCustomMutation(deleteFn, queryKeys.all, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the goal. Please try again!",
            severity: "error"
        },
    });
};

export { useCreateGoal, useDeleteGoal };