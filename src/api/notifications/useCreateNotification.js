import {apiClient} from "../api-client.js";
import useQueryKeys from "./useQueryKeys.js";
import useCustomMutation from "../shared/useCustomMutation.js";

const createFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/clients", data);
    return response.data;
};

const useCreateNotification = () => {
    return useCustomMutation(createFn, useQueryKeys.all, {
        success: "Record was successfully created",
        error: "An error occurred while creating record"
    });
};

export default useCreateNotification;
