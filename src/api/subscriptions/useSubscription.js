import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation";
import queryKeys from "./useQueryKeys.js";

const subscriptionFn = async (id) => {
    const response = await apiClient.get(`/subscription/${id}`);
    return response.data;
};

const useSubscription = () => {
    return useCustomMutation(subscriptionFn, queryKeys.DETAIL);
};

export default useSubscription;
