import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation";
import queryKeys from "./useQueryKeys.js";

const createUserFn = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.post("/user", data);
    return response.data;
};

const useCreateUser = (showAlert, enablePagination) => {
    return useCustomMutation(createUserFn, enablePagination ?
        queryKeys.PAGINATED : queryKeys.DETAIL,
    showAlert && {
        success: {
            title: "Success!",
            content: "Nice! User was successfully created!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while creating the user. Please try again!",
            severity: "error"
        },
    });
};

export default useCreateUser;