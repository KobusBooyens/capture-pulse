import useQueryKeys from "./useQueryKeys.js";
import { useParams } from "react-router-dom";
import useCustomFetch from "../_shared/useCustomFetch.js";

const useNotification = () => {
    const { id } = useParams();

    return useCustomFetch(useQueryKeys.detail(id), `notifications/${id}`);
};

export default useNotification;
