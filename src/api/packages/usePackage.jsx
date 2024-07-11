import { useParams } from "react-router-dom";
import checkinQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const usePackage = () => {
    const { id } = useParams();
    return useCustomFetch(checkinQueryKeys.detail(Number(id)), `packages/${id}`);
};

export default usePackage;