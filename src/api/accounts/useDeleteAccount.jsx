import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/accounts/${id}`);
};

const useDeleteAccount = () => {
    return useCustomMutation(deleteFn, queryKeys.all, {
        success: "Record has been deleted",
        error: "Failed to delete record"
    });
};

export default useDeleteAccount;