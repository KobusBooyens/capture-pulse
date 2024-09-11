import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const createFn = async (payload) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("createFn", payload);
    const response = await apiClient.post("/billing", payload.data);
    return response.data;
};

const useCreateBilling = () => {
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

export default useCreateBilling;

