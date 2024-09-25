import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import queryKeys from "./useQueryKeys.js";

const createFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/taskReminder", data);
    return response.data;
};

const updateFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(updatedData);
    const response = await apiClient.patch(`taskReminder/${id}`, updatedData);
    return response.data;
};

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/taskReminder/${id}`);
};

const useTaskReminderCreate = (showAlert, enablePagination) => {
    return useCustomMutation(createFn, enablePagination ?
        queryKeys.PAGINATED : queryKeys.DETAIL,
    showAlert && {
        success: {
            title: "Success!",
            content: "Nice! Task Reminder was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the task reminder. Please try again!",
            severity: "error"
        },
    });
};

const useUpdateTaskReminder = () => {
    return useCustomMutation(updateFn, queryKeys.DETAIL, {
        success: {
            title: "Success!",
            content: "Nice! Task Reminder was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the task reminder. Please try again!",
            severity: "error"
        },
    });
};

const useDeleteTaskReminder = () => {
    return useCustomMutation(deleteFn, queryKeys.DETAIL, {
        success: {
            title: "Success!",
            content: "Task Reminder has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the task reminder. Please try again!",
            severity: "error"
        },
    });
};

export { useTaskReminderCreate, useUpdateTaskReminder, useDeleteTaskReminder };