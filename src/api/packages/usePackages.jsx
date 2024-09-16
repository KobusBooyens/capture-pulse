import packagesQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../_shared/useCustomFetch.js";

const usePackages = () => {
    return useCustomFetch(packagesQueryKeys.all, "/packages");
};

export default usePackages;
