import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const createFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/accounts", data);
    return response.data;
};

const useCreateAccount = () => {
    return useCustomMutation(createFn, queryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Nice! Payment has been recorded!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while adding the payment. Please try again!",
            severity: "error"
        },
    });
};

export default useCreateAccount;

