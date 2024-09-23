import { useParams } from "react-router-dom";
import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";
import packagesQueryKeys from "./useQueryKeys.js";

const usePackage = () => {
    const { id } = useParams();
    return useCustomFetch(queryKeys.detail(Number(id)), `package/${id}`);
};

const usePackages = () => {
    return useCustomFetch(packagesQueryKeys.all, "/packages");
};

export { usePackage, usePackages };