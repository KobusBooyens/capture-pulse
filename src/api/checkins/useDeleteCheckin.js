import { apiClient } from "../api-client.js";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const deleteFn = async ({ id, type }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/checkins/${type}/${id}`);
};

const useDeleteCheckin = () => {
    return useCustomMutation(deleteFn, checkinQueryKeys.all, {
        success: "Record has been deleted",
        error: "Failed to delete record"
    });
};

export default useDeleteCheckin;