import { useParams } from "react-router-dom";
import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const useClient = () => {
    const { id } = useParams();
    return useCustomFetch(queryKeys.DETAIL, `clients/${id}`);
};

export default useClient;
