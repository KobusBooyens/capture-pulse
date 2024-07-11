import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation.js";
import clientQueryKeys from "./useQueryKeys.js";

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/clients/${id}`);
};

const useDeleteClient = () => {
    return useCustomMutation(deleteFn, clientQueryKeys.all, {
        success: "Record has been deleted",
        error: "Failed to delete record"
    });
};

export default useDeleteClient;
