import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation.js";
import clientQueryKeys from "./useQueryKeys.js";

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.patch(`clients/${id}`, updatedData);
    return response.data;
};

const useEditClient = () => {
    return useCustomMutation(editFn, clientQueryKeys.all, {
        success: "Record was successfully updated",
        error: "An error occurred while updating record"
    });
};

export default useEditClient;
