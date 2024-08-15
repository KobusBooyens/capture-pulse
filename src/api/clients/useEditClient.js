import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation.js";
import clientQueryKeys from "./useQueryKeys.js";

const editFn = async ({ id, updatedData }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(updatedData);
    const response = await apiClient.patch(`clients/${id}`, updatedData);
    return response.data;
};

const useEditClient = () => {
    return useCustomMutation(editFn, clientQueryKeys.all, {
        success: {
            title: "Success!",
            content: "Nice! Client was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the client. Please try again!",
            severity: "error"
        },
    });
};

export default useEditClient;
