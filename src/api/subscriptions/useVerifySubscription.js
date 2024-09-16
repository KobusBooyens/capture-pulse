import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import queryKeys from "./useQueryKeys.js";

const verifySubscriptionFn = async (id) => {
    const response = await apiClient.get(`/subscription/${id}`);
    return response.data;
};

const useVerifySubscription = () => {
    return useCustomMutation(verifySubscriptionFn, queryKeys.DETAIL);
};

export default useVerifySubscription;
