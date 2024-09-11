import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/billing/${id}`);
};

const useDeleteBilling = () => {
    return useCustomMutation(deleteFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the payment. Please try again!",
            severity: "error"
        },
    });
};

export default useDeleteBilling;