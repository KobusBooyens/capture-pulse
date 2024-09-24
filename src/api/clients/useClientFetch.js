import { useParams } from "react-router-dom";
import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../_shared/useCustomFetch.js";

const useClient = () => {
    const { id } = useParams();
    return useCustomFetch(queryKeys.DETAIL, `clients/${id}`);
};

export { useClient } ;
