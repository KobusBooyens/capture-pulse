import { apiClient } from "../api-client.js";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomMutation from "../_shared/useCustomMutation.js";

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.put(`packages/${id}`, updatedData);
    return response.data;
};

const useEditPackage = () => {
    return useCustomMutation(editFn, checkinQueryKeys.all, {
        success: "Record was successfully updated",
        error: "An error occurred while updating record"
    });
};

export default useEditPackage;
