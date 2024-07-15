import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation";
import clientQueryKeys from "./useQueryKeys.js";

const createClientFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/clients", data);
    return response.data;
};

const useCreateClient = () => {
    return useCustomMutation(createClientFn, clientQueryKeys.all, {
        success: {
            title: "Success!",
            content: "Nice! Client was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the client. Please try again!",
            severity: "error"
        },
    });
};

export default useCreateClient;
