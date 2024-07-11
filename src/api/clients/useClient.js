import { useParams } from "react-router-dom";
import clientQueryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const useClient = () => {
    const { id } = useParams();
    return useCustomFetch(clientQueryKeys.detail(id), `clients/${id}`);
};

export default useClient;
