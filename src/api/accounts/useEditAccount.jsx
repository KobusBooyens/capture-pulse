import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.put(`accounts/${id}`, updatedData);
    return response.data;
};

const useEditAccount = () => {
    return useCustomMutation(editFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Payment was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the payment. Please try again!",
            severity: "error"
        },
    });
};

export default useEditAccount;
