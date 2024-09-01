import { apiClient } from "../api-client.js";
import useCustomMutation from "../shared/useCustomMutation.js";
import clientQueryKeys from "./useQueryKeys.js";

const deleteFn = async ({ id }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await apiClient.delete(`/clients/${id}`);
};

const useDeleteClient = () => {
    return useCustomMutation(deleteFn, clientQueryKeys.PAGINATED, {
        success: {
            title: "Success!",
            content: "Record has been deleted!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while deleting the client. Please try again!",
            severity: "error"
        },
    });
};

export default useDeleteClient;
