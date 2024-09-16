import userQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../_shared/useCustomFetch.js";

const useNotifications = () => {
    console.log("useNotifications");
    return useCustomFetch(userQueryKeys.all, "/notifications");
};

export default useNotifications;