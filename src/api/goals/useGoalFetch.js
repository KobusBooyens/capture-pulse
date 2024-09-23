import { useParams } from "react-router-dom";
import useCustomFetch from "../_shared/useCustomFetch.js";
import queryKeys from "./useQueryKeys.js";

const usePackage = () => {
    const { id } = useParams();
    return useCustomFetch(queryKeys.detail(Number(id)), `goal/${id}`);
};

const usePackages = () => {
    return useCustomFetch(queryKeys.all, "/goals");
};

export { usePackage, usePackages };