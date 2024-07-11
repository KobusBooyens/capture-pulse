import { apiClient } from "../api-client.js";
import queryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const createFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/accounts", data);
    return response.data;
};

const useCreateAccount = () => {
    return useCustomMutation(createFn, queryKeys.all, {
        success: "Record was successfully added",
        error: "An error occurred while creating record"
    });
};

export default useCreateAccount;

