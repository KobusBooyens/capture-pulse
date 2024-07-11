import checkinQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const usePackages = () => {
    return useCustomFetch(checkinQueryKeys.all, "/packages");
};

export default usePackages;
