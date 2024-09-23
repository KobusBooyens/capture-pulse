import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const useGetSubscription = () => {
    return useCustomFetch(queryKeys.DETAIL, "subscription");
};

export { useGetSubscription };