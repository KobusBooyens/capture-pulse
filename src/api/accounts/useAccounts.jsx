import queryKeys from "./useQueryKeys.js";
import useCustomFetch from "../shared/useCustomFetch.js";
import { useParams } from "react-router-dom";

const useAccounts = () => {
    const { id } = useParams();

    return useCustomFetch(queryKeys.detail(id), "/accounts");
};

export default useAccounts;
