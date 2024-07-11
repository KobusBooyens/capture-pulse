import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation.js";
import useQueryKeys from "./useQueryKeys.js";

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(updatedData);
    const response = await apiClient.patch(`notifications/${id}`, updatedData);
    return response.data;
};

const useEditNotification = () => {
    return useCustomMutation(editFn, useQueryKeys.all, {
        success: "Record was successfully updated",
        error: "An error occurred while updating record"
    });
};

export default useEditNotification;
