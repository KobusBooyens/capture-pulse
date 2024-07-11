import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.put(`accounts/${id}`, updatedData);
    return response.data;
};

const useEditAccount = () => {
    return useCustomMutation(editFn, queryKeys.all, {
        success: "Checkin was successfully updated",
        error: "An error occurred while updating the record"
    });
};

export default useEditAccount;
