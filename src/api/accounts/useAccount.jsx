import { useParams } from "react-router-dom";
import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";

const useAccount = () => {
    const { id } = useParams();
    return useCustomFetch(queryKeys.detail(Number(id)), `accounts/${id}`);
};

export default useAccount;