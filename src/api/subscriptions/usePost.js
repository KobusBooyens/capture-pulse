import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation";
import queryKeys from "./useQueryKeys.js";

const createPostFn = async (url, data) => {
    const response = await apiClient.post(url, data);
    return response.data;
};

const usePostPost = () => {
    return useCustomMutation(createPostFn, queryKeys.DETAIL);
};

export default usePostPost;
