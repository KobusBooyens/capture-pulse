import packagesQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const usePackages = () => {
    return useCustomFetch(packagesQueryKeys.all, "/packages");
};

export default usePackages;
