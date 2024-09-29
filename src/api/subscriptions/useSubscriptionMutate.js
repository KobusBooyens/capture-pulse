import { apiClient } from "../api-client.js";
import useCustomMutation from "../_shared/useCustomMutation.js";
import queryKeys from "./useQueryKeys.js";

/**Functions**/
const verifySubscriptionFn = async (id) => {
    const response = await apiClient.get(`/subscription/verify/${id}`);
    return response.data;
};

const updateSubscriptionFn = async (data) => {

    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await apiClient.patch("/subscription", data);
    return response.data;
};

/**Mutations**/
const useVerifySubscription = () => {
    return useCustomMutation(verifySubscriptionFn, queryKeys.DETAIL);
};

const useUpdateSubscription = () => {
    return useCustomMutation(updateSubscriptionFn, queryKeys.DETAIL, {
        success: {
            title: "Success!",
            content: "Nice! Subscription was successfully updated!",
            severity: "success"
        },
        error: {
            title: "Failed!",
            content: "Oh no! An error occurred while updating the subscription. Please try again!",
            severity: "error"
        },
    });
};

export { useVerifySubscription, useUpdateSubscription };
